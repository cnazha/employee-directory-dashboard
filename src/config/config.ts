import {subYears} from 'date-fns'

export const employeeMaxAge = 60;
export const employeeMinAge = 18;

// use date-fsn to get min and max dates
export const employeeMaxBirthDate = subYears(new Date(), employeeMinAge);
export const employeeMinBirthDate = subYears(new Date(), employeeMaxAge);
