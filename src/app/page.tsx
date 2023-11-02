"use client";
import * as React from 'react';
import {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormContainer, TextFieldElement} from "react-hook-form-mui";
import {object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useFirebaseAuthContext} from "@/context/useFirebaseAuth.context";
import {useRouter} from "next/navigation";


const defaultTheme = createTheme();


const LoginSchema = object().shape({
    email: string().required('Email is required').email('Email must be a valid email address'), password: string().required('Password is required'),
});

type LoginData = {
    email: string
    password: string
}

export default function SignIn() {
    const {login, authenticated} = useFirebaseAuthContext();


    const router = useRouter();
    const handleLogin = async (data: LoginData) => {
        try {
            await login(data.email, data.password);
            router.push('/dashboard/employees')
        } catch (e: any) {
            alert(e?.message || 'An error occurred')
        }
    }

    useEffect(() => {
        if (authenticated) {
            router.push('/dashboard/employees')
        }
    }, [authenticated])

    return (<ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <FormContainer
                        defaultValues={{
                            email: 'admin@test.com', password: '',
                        }}
                        // @ts-ignore
                        validationSchema={yupResolver(LoginSchema)}
                        onSuccess={handleLogin}
                    >
                        <Box sx={{mt: 1}}>
                            <TextFieldElement
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            <TextFieldElement
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </FormContainer>
                </Box>
            </Container>
        </ThemeProvider>);
}
