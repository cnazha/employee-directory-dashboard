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
import {format} from "date-fns";
import {useRouter} from "next/navigation";

const defaultEmployeeFormValues: Partial<Omit<Employee, 'department'>> & {
    department: {
        id: string,
    },
    birthdate: Date | null,
} = {
    firstName: '', lastName: '', email: '', phone: '',
    // @ts-ignore
    department: null,
    birthdate: null
}

let employeeSchema = object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    department: object({
        id: string().required('Department is required'),
    }),
    birthdate: date().required('Birth date is required'),
    email: string().email('Invalid email').required('Email is required'),
    phone: yup
        .string()
        .phone(["LB", "FR", "US"], "Please enter a valid phone number")
        .required(),
});

const AddEmployeePage = () => {

    const router = useRouter();
    const [createEmployee] = useCreateEmployeeMutation({
        refetchQueries: ['GetEmployees'],
        notifyOnNetworkStatusChange: true,
    })

    return (<Container>
        <h1>Add Employee</h1>
        <Paper sx={{
            padding: 2,
        }}>
            <FormContainer
                onSuccess={async (data) => {
                    // use date-fns to format the date to yyyy-mm-dd
                    console.log(data)
                    const birthdate = format(data.birthdate, 'yyyy-MM-dd')

                    try {
                        const {department, ...rest} = data;
                        if (!department) {
                            return alert('Department is required');
                        }
                        const createEmployeeInput = {
                            ...rest,
                            department: department.id,
                            birthdate
                        }
                        const res = await createEmployee({
                            variables: {
                                createEmployeeInput
                            }})
                        const employee = res.data?.createEmployee;
                        if (!employee?.success){
                            return alert(employee?.message);
                        }
                        router.push('/employees')
                    } catch (e: Error | any) {
                        alert(e?.message || e)
                    }
                }}
                onError={(e) => {
                    console.error(e)
                }}
                // @ts-ignore
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
