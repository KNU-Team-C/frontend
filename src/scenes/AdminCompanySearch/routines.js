import { createRoutine } from 'redux-saga-routines';

export const getAdminCompaniesRoutine = createRoutine('ADMIN_COMPANIES:ALL');
export const getAdminTechnologiesRoutine = createRoutine('ADMIN_TECHNOLOGIES:ALL');
export const getAdminIndustriesRoutine = createRoutine('ADMIN_INDUSTRIES:ALL');
