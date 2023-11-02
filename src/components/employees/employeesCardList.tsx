import React from 'react';
import EmployeeCard from "@/components/employees/employeeCard";
import Box from "@mui/material/Box";
import {Employee} from "@/gql/graphql";

const EmployeesCardList = ({employees}: {
    employees: Partial<Employee>[] | []
}) => {
    if (!employees) {
        return <div>loading...</div>
    }
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            padding: 2,
            rowGap: 2,
            columnGap: 2,
        }}>
            {
                employees.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))
            }
        </Box>
    );
};

export default EmployeesCardList;
