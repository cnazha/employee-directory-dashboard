'use client';
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useGetEmployeesQuery} from "@/gql/operations";
import EmployeeCard from "@/components/employees/employeeCard";

const EmployeesPage = () => {
    const {data} = useGetEmployeesQuery({
        fetchPolicy: 'cache-and-network',
    })
    const employees = data?.employees?.items || [];
  return (
    <Container>
      <Box>
        <Typography variant="body1" gutterBottom>
          Employees Page
        </Typography>
          <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
                padding: 2,
          }}>
              {
                  employees.map((employee) => (
                      <EmployeeCard employee={employee} />
                  ))
              }
          </Box>
      </Box>
    </Container>
  );
}

export default EmployeesPage;
