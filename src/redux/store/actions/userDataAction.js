import { ADD_USER_DATA } from './types';

export const userData = userDataObj => {
    return {
        type:ADD_USER_DATA,
        payload:userDataObj,
    }
}