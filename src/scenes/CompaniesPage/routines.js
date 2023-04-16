import { createRoutine } from 'redux-saga-routines';

export const getCompaniesRoutine = createRoutine('COMPANIES:ALL');
export const getTechnologiesRoutine = createRoutine('TECHNOLOGIES:ALL');
export const getIndustriesRoutine = createRoutine('INDUSTRIES:ALL');
export const addCompanyRoutine = createRoutine('COMPANIES:ADD');
