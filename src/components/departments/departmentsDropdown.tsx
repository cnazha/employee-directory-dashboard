import React from "react";
import {useGetDepartmentsQuery} from "@/gql/operations";
import {AutocompleteElement} from "react-hook-form-mui";
import {FormHelperText} from "@mui/material";

type DepartmentsDropDownProps = {
    name: string,
    multiple?: boolean,
    error?: {message?: string}
}
const DepartmentsDropDown = ({name, multiple, error}: DepartmentsDropDownProps) => {
    const {data} = useGetDepartmentsQuery()
    const departments = data?.departments?.items?.map(
        ({name, id}) => ({id, label: name,})
    ) || [];

    return (
        <div>
            <AutocompleteElement
                name={name}
                options={departments}
                label="Department"
                multiple={multiple}
            />
            <FormHelperText error={!!error} />
            </div>
    )
}

export default DepartmentsDropDown;
