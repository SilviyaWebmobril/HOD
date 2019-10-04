import {ADD_SCHEDULER,CANCEL_SCHEDULER} from '../actions/types';

export const addSchedule = (schedule_id) =>{
    return{
        type:ADD_SCHEDULER,
        schedule_id:schedule_id
    }
}


export const cancelSchedule = () =>{

    return {
        type:CANCEL_SCHEDULER,
        schedule_id:0
    }
}