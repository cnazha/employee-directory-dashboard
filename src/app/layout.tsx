"use client";
import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {AuthProvider} from "@/context/firebaseAuth.context";
import {AuthConsumer} from "@/context/firebaseAuth.consumer";


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (<html lang="en">
    <body>
    <ThemeRegistry>
        <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <AuthConsumer>
                            {children}
                </AuthConsumer>
            </LocalizationProvider>
        </AuthProvider>
    </ThemeRegistry>
    </body>
    </html>);
}
