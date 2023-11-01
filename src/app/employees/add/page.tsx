"use client";
import React from 'react';
import {Button, Container, Paper} from "@mui/material";
import {FormContainer} from "react-hook-form-mui";
import * as yup from "yup";
import {date, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import EmployeeForm from "@/components/employees/employeeForm";
import {useCreateEmployeeMutation} from "@/gql/operations";
import {Employee} from "@/gql/graphql";
import "yup-phone-lite";

const defaultEmployeeFormValues: Partial<Omit<Employee, 'department'>> & {
    department: {
        id: string,
    },
    birthDate: Date | null,
} = {
    firstName: '', lastName: '', email: '', phone: '',
    department: {
        id: '',
    },
    birthDate: null
}

let employeeSchema = object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    department: object({
        id: string().required('Department is required'),
    }),
    birthDate: date().required('Birth date is required')
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'Employee must be at least 18 years old'),
    email: string().email('Invalid email').required('Email is required'),
    phone: yup
        .string()
        .phone(["LB", "FR", "US"], "Please enter a valid phone number")
        .required(),
});

const AddEmployeePage = () => {
    const [createEmployee] = useCreateEmployeeMutation()

    return (<Container>
        <h1>Add Employee</h1>
        <Paper sx={{
            padding: 2,
        }}>
            <FormContainer
                onSuccess={async (data) => {
                    try {
                        const {department, ...rest} = data;
                        if (!department) {
                            return alert('Department is required');
                        }
                        const createEmployeeInput = {
                            ...rest,
                            department: department.id,
                        }
                        const res = await createEmployee({
                            variables: {
                                createEmployeeInput
                            }})
                        const employee = res.data?.createEmployee;
                        if (!employee?.success){
                            return alert(employee?.message);
                        }
                    } catch (e: Error | any) {
                        alert(e?.message || e)
                    }
                }}
                onError={(e) => {
                    console.error(e)
                }}
                resolver={yupResolver(employeeSchema)}
                defaultValues={defaultEmployeeFormValues}>
                <EmployeeForm>
                    <Button variant="contained" type="submit">
                        Add Employee
                    </Button>
                </EmployeeForm>
            </FormContainer>
        </Paper>
    </Container>);
};



export default AddEmployeePage;
