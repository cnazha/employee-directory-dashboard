import {GridColDef} from "@mui/x-data-grid";
import {timestampDateFormat} from "@/helpers/dateFormatter";


export const departmentsTableColumnConfig: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex:2,  },
    { field: 'updatedAt', headerName: 'Updated At', flex:1, valueGetter: (params) => timestampDateFormat(params.value)  },
];
