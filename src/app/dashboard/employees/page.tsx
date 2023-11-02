'use client';
import * as React from 'react';
import {useCallback, useEffect, useMemo} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useGetEmployeesQuery} from "@/gql/operations";
import {Stack} from "@mui/system";
import {Button, Paper, TextField} from "@mui/material";
import Link from "next/link";
import _ from "lodash";
import EmployeesCardList from "@/components/employees/employeesCardList";
import NoEmployeesFound from "@/components/employees/noEmployeesFound";
import EmployeesSearchingLoader from "@/components/employees/employeesSearchingLoader";
import useSearchStatus from "@/hooks/useSearchStatus";
import * as yup from "yup";
import {date, number, object, string} from "yup";
import "yup-phone-lite";

const EmployeesPage = () => {
    const [search, setSearch] = React.useState('');

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

    const {
        data, refetch, networkStatus,
        error
    } = useGetEmployeesQuery({
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    })

    const employees = useMemo(() => {
        return data?.employees?.items || [];
    }, [data]);

    const totalResults = useMemo(() => {
        return data?.employees?.items?.length || 0;
    }, [data]);

    const {loading, noItemsFound} = useSearchStatus({
        networkStatus,
        totalResults,
    });

    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const debounceNameSearch = _.debounce(async (name) => {
        await refetch({
            filter: {
                name
            }
        });
    }, 300);

    useEffect(() => {
        debounceNameSearch(search);
        return () => {
            debounceNameSearch.cancel();
        };
    }, [search]);


    return (
        <Container>
            <Box>
                <Stack direction="row" spacing={2} justifyContent={'space-between'}>
                    <Typography variant="h5" gutterBottom>
                        Employees Page
                    </Typography>
                    <Link href={'/dashboard/employees/add'}>
                        <Button variant="contained">Add Employee</Button>
                    </Link>
                </Stack>
                <Paper sx={{
                    padding: 2, marginY: 4,
                }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={search}
                        onChange={onNameChange}
                        sx={{
                            marginTop: 2,
                            width: '100%',
                        }}
                    />
                </Paper>
                <EmployeesSearchingLoader visible={loading} />
                <NoEmployeesFound visible={noItemsFound}/>
                <EmployeesCardList employees={employees}/>
            </Box>
        </Container>
    );
}

export default EmployeesPage;
