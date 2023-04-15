import { createRoutine } from 'redux-saga-routines';

export const getAdminRequestsUsersRoutine = createRoutine('ADMIN_REQUESTS_USERS:ALL');
export const setUserBannedRoutine = createRoutine('ADMIN_REQUESTS_USERS:SET_BANNED');

export const getAdminRequestsCompaniesRoutine = createRoutine('ADMIN_REQUESTS_COMPANIES:ALL');
export const setAdminCompanyVerifiedRoutine = createRoutine('ADMIN_REQUESTS_COMPANIES:SET_VERIFIED');
export const setAdminCompanyVerifyDismissRoutine = createRoutine('ADMIN_REQUESTS_COMPANIES:SET_VERIFY_DISMISS');
