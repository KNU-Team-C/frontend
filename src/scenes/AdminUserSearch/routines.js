import { createRoutine } from 'redux-saga-routines';

export const getAdminUsersRoutine = createRoutine('ADMIN_USERS:ALL');
export const setUserBannedRoutine = createRoutine('ADMIN_USERS:SET_BANNED');
