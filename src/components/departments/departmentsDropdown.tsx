import React from "react";
import {useGetDepartmentsQuery} from "@/gql/operations";
import {AutocompleteElement} from "react-hook-form-mui";

const DepartmentsDropDown = ({multiple}: {multiple?: boolean}) => {
    const {data} = useGetDepartmentsQuery()
    const departments = data?.departments?.items?.map(
        ({name, id}) => ({id, label: name,})
    ) || [];

    return (
        <div>
            <AutocompleteElement
                name="basic"
                options={departments}
                label="Department"
                multiple={multiple}
            />
        </div>
    )
}

export default DepartmentsDropDown;
