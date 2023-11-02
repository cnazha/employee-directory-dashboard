import {date, number, object, string} from "yup";
import {Employee} from "@/gql/graphql";

export const addEmployeeSchema = object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    jobTitle: string().required('Job title is required'),
    department: object({
        id: string().required('Department is required'),
    }),
    birthdate: date().required('Birth date is required'),
    email: string().email('Invalid email').required('Email is required'),
    // @ts-ignore
    phone: string()
        .phone(["LB", "FR", "US"], "Please enter a valid phone number")
        .required(),
    avatar: object({
        url: string().required('Image is required'),
        path: string().required('Image is required'),
        width: number().default(300).required('Image is required'),
        height: number().default(300).required('Image is required'),
    }).required('Image is required')
});


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

