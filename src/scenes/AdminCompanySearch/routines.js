import {createRoutine} from 'redux-saga-routines';

export const getAdminCompaniesRoutine = createRoutine('ADMIN_COMPANIES:ALL');
export const getAdminTechnologiesRoutine = createRoutine('ADMIN_TECHNOLOGIES:ALL');
export const getAdminIndustriesRoutine = createRoutine('ADMIN_INDUSTRIES:ALL');
export const setAdminCompanyVerifiedRoutine = createRoutine('ADMIN_COMPANIES:SET_VERIFIED');
export const setAdminCompanyVerifyDismissRoutine = createRoutine('ADMIN_COMPANIES:SET_VERIFY_DISMISS');
