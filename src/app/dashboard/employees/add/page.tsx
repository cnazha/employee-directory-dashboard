"use client";
import {Button, Container, Paper} from "@mui/material";
import {FormContainer} from "react-hook-form-mui";
import {yupResolver} from "@hookform/resolvers/yup";
import EmployeeForm from "@/components/employees/employeeForm";
import {useCreateEmployeeMutation} from "@/gql/operations";
import {format} from "date-fns";
import {useRouter} from "next/navigation";
import {addEmployeeSchema, defaultEmployeeFormValues} from "@/config/form/addEmployee.form";
import {useCallback} from "react";


const AddEmployeePage = () => {

    const router = useRouter();
    const [createEmployee] = useCreateEmployeeMutation({
        refetchQueries: ['GetEmployees'],
        notifyOnNetworkStatusChange: true,
    })

    const handleAddEmployee = useCallback(async (data: Partial<typeof defaultEmployeeFormValues>) => {
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
                    <Button variant="contained" type="submit">
                        Add Employee
                    </Button>
                </EmployeeForm>
            </FormContainer>
        </Paper>
    </Container>);
};



export default AddEmployeePage;
