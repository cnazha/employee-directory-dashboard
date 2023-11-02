import {Controller, DatePickerElement, useFormContext, useFormState} from "react-hook-form-mui";
import {Stack} from "@mui/system";
import {MuiTelInput} from "mui-tel-input";
import React from "react";
import FormTextField from "@/components/form/formTextField";
import DepartmentsDropDown from "@/components/departments/departmentsDropdown";
import {employeeMaxBirthDate, employeeMinBirthDate} from "@/config/config";

const EmployeeForm = ({children}: {
    children?: React.ReactNode
}) => {
    const {control,} = useFormContext();
    const {errors} = useFormState()

    return (<Stack spacing={2}>
        <FormTextField label="First name"
                       name={'firstName'}
                       error={errors['firstName']}
        />
        <FormTextField label="Last name" name={'lastName'}
                       error={errors['lastName']}
        />
        <DepartmentsDropDown name={'department'} error={errors['department']} />
        <FormTextField label="Email"
                       error={errors['email']}
                       name={'email'}/>
        <DatePickerElement name={'birthdate'}
                           label="Birthdate"
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
        {children}

    </Stack>);
}

export default EmployeeForm;
