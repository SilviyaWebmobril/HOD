import { ADD_LOCATION } from './types';
export const addLocation  =  locationObj  => {
    return {
        type:ADD_LOCATION,
        payload:locationObj
    }
}