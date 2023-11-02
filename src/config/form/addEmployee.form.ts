'use client';

// @ts-ignore
import "yup-phone-lite";
import {Employee} from "@/gql/graphql";


export const defaultEmployeeFormValues: Partial<Omit<Employee, 'department'>> & {
    department: {
        id: string,
    },
    birthdate: Date | null,
} = {
    firstName: '', lastName: '', email: '', phone: '',
    // @ts-ignore
    department: null,
    birthdate: null,
    avatar: null,
    jobTitle: '',
}

