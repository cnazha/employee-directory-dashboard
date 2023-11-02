"use client"
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DepartmentsTable from "@/components/departments/departmentsTable";
import {useGetDepartmentsQuery} from "@/gql/operations";

const DepartmentsPage = () => {
    const {data, } = useGetDepartmentsQuery();
    const departments = data?.departments?.items || [];
  return (
    <Container>
      <Box>
        <Typography variant="h5" gutterBottom>
            Departments Page
        </Typography>
          <Box sx={{p:2}}>
              <DepartmentsTable
                  departments={departments} />
          </Box>
      </Box>
    </Container>
  );
}

export default DepartmentsPage;
