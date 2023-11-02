import React from 'react';
import useUploadImage, {ImageEntity} from "@/hooks/useUploadImage";
import {Button} from "@mui/material";
import {useWatch} from "react-hook-form";
import {useFormContext} from "react-hook-form-mui";
import {Stack} from "@mui/system";

type ImageUploadProps = {
    entity?: ImageEntity
}

const ImageUpload = ({entity = ImageEntity.PROFILE}:ImageUploadProps) => {
    const {setValue} = useFormContext()
    const {uploading, uploadImage} = useUploadImage()
    const {avatar} = useWatch()
    const handleImageChange = async (e: any) => {
        const data = await uploadImage(e, entity);
        setValue('avatar', data)
    }

    return (
        <Stack spacing={2}>

            {avatar?.url && <img
                src={avatar.url}
                alt=""
                style={{width: 300, height: 300}}
            />}

            <Button
                disabled={uploading}
                variant="contained" component="label" sx={{
                width: 120,
            }}>
                Select File
                <input hidden accept="image/*"
                       onChange={handleImageChange}
                       type="file" />
            </Button>
        </Stack>
    );
};

export default ImageUpload;
