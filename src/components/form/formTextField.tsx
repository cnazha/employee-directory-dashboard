import {TextFieldElement, TextFieldElementProps} from "react-hook-form-mui";
import React from "react";

const FormTextField = ({name, label, error, ...props}: { name: string, label: string, error?: { message?: string } } & Partial<TextFieldElementProps>) => {
    return (<TextFieldElement label={label}
                              name={name}
                              error={!!error}
                              helperText={String(error?.message ?? '')}
        {...props}
    />);
}

export default FormTextField;
