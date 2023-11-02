"use client";
import {Button, Container, Paper} from "@mui/material";
import {FormContainer} from "react-hook-form-mui";
import {yupResolver} from "@hookform/resolvers/yup";
import EmployeeForm from "@/components/employees/employeeForm";
import {useCreateEmployeeMutation} from "@/gql/operations";
import {format} from "date-fns";
import {useRouter} from "next/navigation";
import {defaultEmployeeFormValues} from "@/config/form/addEmployee.form";
import {useCallback} from "react";
import * as yup from "yup";
import {date, number, object, string} from "yup";


const AddEmployeePage = () => {

    const router = useRouter();
    const [createEmployee, {
        loading
    }] = useCreateEmployeeMutation({
        refetchQueries: ['GetEmployees'],
        notifyOnNetworkStatusChange: true,
    })

    const handleAddEmployee = useCallback(async (data: Partial<typeof defaultEmployeeFormValues>) => {

        // Check if birthdate is valid
        if (!data.birthdate) {
            return alert('Birthdate is required');
        }

        // Birthdate should be between 18 and 60 years old using date fns
        


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
            router.push('/dashboard/employees')
        } catch (e: Error | any) {
            alert(e?.message || e)
        }
    }, [
        createEmployee,
    ])


    const addEmployeeSchema = object({
        firstName: string().required('First name is required'),
        lastName: string().required('Last name is required'),
        jobTitle: string().required('Job title is required'),
        department: object({
            id: string().required('Department is required'),
        }),
        birthdate: date().required('Birth date is required'),
        email: string().email('Invalid email').required('Email is required'),
        // @ts-ignore
        phone: yup.string()
            .phone(["LB", "FR", "US"], "Please enter a valid phone number")
            .required(),
        avatar: object({
            url: string().required('Image is required'),
            path: string().required('Image is required'),
            width: number().default(300).required('Image is required'),
            height: number().default(300).required('Image is required'),
        }).required('Image is required')
    });

    return (<Container>
        <h1>Add Employee</h1>
        <Paper sx={{
            padding: 2,
        }}>
            <FormContainer
                onSuccess={handleAddEmployee}
                // @ts-ignore
                resolver={yupResolver(addEmployeeSchema)}
                defaultValues={defaultEmployeeFormValues}>
                <EmployeeForm>
                    <Button
                        disabled={loading}
                        variant="contained" type="submit">
                        {loading ? 'Adding' : 'Add'} Employee
                    </Button>
                </EmployeeForm>
            </FormContainer>
        </Paper>
    </Container>);
};



export default AddEmployeePage;
