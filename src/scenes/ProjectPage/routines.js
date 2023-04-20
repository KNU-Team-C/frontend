import { createRoutine } from 'redux-saga-routines';

export const getProjectRoutine = createRoutine('PROJECT:GET');
export const modifyProjectRoutine = createRoutine('PROJECT:MODIFY');
export const uploadImageRoutine = createRoutine('PROJECT:UPLOAD_IMAGE');
