import {TextFieldElement} from "react-hook-form-mui";
import React from "react";

const FormTextField = ({name, label, error, ...props}: { name: string, label: string, error?: { message?: string } }) => {
    return (<TextFieldElement label={label}
                              name={name}
                              error={!!error}
                              helperText={String(error?.message ?? '')}
    />);
}

export default FormTextField;
