import { createRoutine } from 'redux-saga-routines';

export const getCompanyRoutine = createRoutine('COMPANY:GET');
export const modifyCompanyRoutine = createRoutine('COMPANY:MODIFY');
export const uploadImageRoutine = createRoutine('COMPANY:UPLOAD_IMAGE');
