import { createRoutine } from 'redux-saga-routines';

export const getProjectsRoutine = createRoutine('PROJECTS:ALL');
export const createProjectRoutine = createRoutine('PROJECT:CREATE');
