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
import "yup-phone-lite";

const EmployeesPage = () => {
    const [search, setSearch] = React.useState('');

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
                {/* @ts-ignore */}
                <EmployeesCardList employees={employees}/>
            </Box>
        </Container>
    );
}

export default EmployeesPage;
