import { ADD_USER_DATA } from './types';
import { ADD_USER_ADDRESS } from './types';

export const userData = userDataObj => {
    return {
        type:ADD_USER_DATA,
        payload:userDataObj,
    }
}

export const userAddress = address => {
    return {
        type:ADD_USER_ADDRESS,
        payload:address
    }
}