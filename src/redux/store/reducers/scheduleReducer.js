import {ADD_SCHEDULER,CANCEL_SCHEDULER} from '../actions/types';

const initialState = {

    schedule_id:0
}


export default (state = initialState,action) =>{

    switch(action.type){
    
        case ADD_SCHEDULER:
            
            return{
                schedule_id:action.schedule_id
            }

        case CANCEL_SCHEDULER:

            return{
                schedule_id:action.schedule_id
            }

        default:
                return state;
    }
}