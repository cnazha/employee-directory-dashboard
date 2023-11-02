import React from 'react';
import useUploadImage, {ImageEntity} from "@/hooks/useUploadImage";
import {Button, FormHelperText} from "@mui/material";
import {useWatch} from "react-hook-form";
import {useFormContext, useFormState} from "react-hook-form-mui";
import {Stack} from "@mui/system";

type ImageUploadProps = {
    entity?: ImageEntity
}

const ImageUpload = ({entity = ImageEntity.PROFILE}:ImageUploadProps) => {
    const {setValue, clearErrors} = useFormContext()
    const {uploading, uploadImage} = useUploadImage()
    const {avatar} = useWatch()
    const handleImageChange = async (e: any) => {
        const data = await uploadImage(e, entity);
        setValue('avatar', data);
        clearErrors('avatar')

    }

    const {errors} = useFormState()

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
                width: 200,
            }}>
                {avatar?.url ? 'Change' : 'Upload'} {entity}
                <input hidden accept="image/*"
                       onChange={handleImageChange}
                       type="file" />
            </Button>

            <FormHelperText error>
                {errors?.['avatar']?.message}
            </FormHelperText>
        </Stack>
    );
};

export default ImageUpload;
