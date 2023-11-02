import {getDownloadURL, ref, uploadBytes, UploadResult} from "@firebase/storage";
import {useState} from "react";
import {storage} from "@/lib/firebase";
import {v4 as uuidv4} from 'uuid';
import {ImageInput} from "@/gql/graphql";

export enum ImageEntity {
    PROFILE = 'PROFILE',
}

export const DEFAULT_IMAGE = {
    url: '',
    path: '',
    width: 0,
    height: 0,
}

const useUploadImage = () => {
    const [uploading, setUploading] = useState(false);


    const getStoragePath = (entity: ImageEntity) => {
        switch (entity) {
            case ImageEntity.PROFILE:
                return 'profiles';
            default:
                return 'uploads';
        }
    }

    const getStorageRef = (entity: ImageEntity, imageName: string) => ref(storage, `${getStoragePath(entity)}/${imageName}`)
    const generateImageName = (image: File) => {
        const ext = image.type.split('/')[1];
        return `${uuidv4()}.${ext}`;
    }

    const getFirebaseImageData = async (uploaded: UploadResult) => {
        console.log(uploaded, 'uploaded')
        const payload = new Map();
        payload.set('bucket', uploaded.metadata.bucket);
        payload.set('fullPath', uploaded.metadata.fullPath);
        payload.set('path', uploaded.metadata.size);
        payload.set('url', `https://${payload.get('bucket')}/${payload.get('fullPath')}`);
        const data = Object.fromEntries(payload);
        console.log(data, 'data')
        return data;
    }

    const uploadImage = async (e: Event, entity: ImageEntity): Promise<Partial<ImageInput> | null | void> => {
        try {
            setUploading(true)
            const target = e.target as HTMLInputElement;

            const image = target?.files?.[0] as File;
            let width;
            let height;

            console.log(image)
            // @ts-ignore
            if (image == null && image.type.match('image.*')) {
                return null;
            }
            console.log(image, 'match')
            const imageName = generateImageName(image);
            console.log(imageName, 'name')
            const storageRef = getStorageRef(entity, imageName);
            console.log(storageRef, 'storageRef')
            const uploaded = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(ref(storage, uploaded.metadata.fullPath))
            const data = {
                url: downloadURL,
                path: uploaded.metadata.fullPath,
                width,
                height,
            };
            return data;
        }catch (error) {
            console.log(error);
            // @ts-ignore
            return DEFAULT_IMAGE;
        }finally {
            setUploading(false)
        }
    }
    return {
        uploadImage,
        uploading
    }
};

export default useUploadImage;
