import { ADD_USER_DATA } from '../actions/types';

const initialState = {

    userdata:{}
}
 const userDataReducer = (state = initialState,action)  => {

    switch(action.type){
        case ADD_USER_DATA:
            return{
                ...state,
                userdata:action.payload
            }
            default:
                 return state;
    }
 

}


export default userDataReducer;