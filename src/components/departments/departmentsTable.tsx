import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Department} from "@/gql/graphql";
import {departmentsTableColumnConfig} from "@/components/departments/departmentsTable.config";


const DepartmentsTable = ({departments,}: {
    departments: Department[]
}) => {
    return (
        <div>
            <DataGrid
                rows={departments}
                pageSizeOptions={[10]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                      columns={departmentsTableColumnConfig} autoHeight  />
        </div>
    );
};

export default DepartmentsTable;
