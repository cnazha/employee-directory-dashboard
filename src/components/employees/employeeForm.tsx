'use client';
import {Controller, DatePickerElement, useFormContext, useFormState} from "react-hook-form-mui";
import {Stack} from "@mui/system";
import {MuiTelInput} from "mui-tel-input";
import React from "react";
import FormTextField from "@/components/form/formTextField";
import DepartmentsDropDown from "@/components/departments/departmentsDropdown";
import {employeeMaxBirthDate, employeeMinBirthDate} from "@/config/config";
import useUploadImage from "@/hooks/useUploadImage";
import ImageUpload from "@/components/form/imageUpload";

const EmployeeForm = ({children}: {
    children?: React.ReactNode
}) => {
    const {control, setValue} = useFormContext();
    const {errors} = useFormState();
    const {uploading, uploadImage} = useUploadImage();



    return (<Stack spacing={2}>
        <FormTextField label="First name"
                       name={'firstName'}
                       error={errors['firstName']}
        />
        <FormTextField label="Last name" name={'lastName'}
                       error={errors['lastName']}
        />
        <FormTextField label="Job Title" name={'jobTitle'}
                       error={errors['jobTitle']}
        />
        <DepartmentsDropDown name={'department'} error={errors['department']} />
        <FormTextField label="Email"
                       error={errors['email']}
                       name={'email'}/>
        <DatePickerElement name={'birthdate'}
                           label="Birthdate"
                           // @ts-ignore
                            error={errors['birthdate']}
                           maxDate={employeeMaxBirthDate}
                           minDate={employeeMinBirthDate}
                           defaultValue={employeeMinBirthDate}
        />

        <Controller
            name="phone"
            control={control}
            render={({field, fieldState,}) => (<MuiTelInput
                {...field}
                label="Phone"
                defaultCountry={'LB'}
                onlyCountries={["LB", "US", "FR"]}
                helperText={String(fieldState.error?.message ?? '')}
                error={fieldState.invalid}
                disableFormatting
            />)}
        />
        <ImageUpload />
        {children}

    </Stack>);
}

export default EmployeeForm;
