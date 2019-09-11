import { ADD_USER_DATA } from '../actions/types';
import User from '../../../models/User';
import { ADD_USER_ADDRESS } from '../actions/types';


const initialState = {
    userdata:{},
    user_address:"",
}
 const userDataReducer = (state = initialState,action)  => {

    
    switch(action.type){
        case ADD_USER_DATA:

            let user = action.payload;
          
            let updatedUser  = new User(user.user_id,user.user_name,user.user_email,user.user_mobile);
           
            return{
                ...state,
                userdata:updatedUser
            }
        case ADD_USER_ADDRESS:
           
            return{
                ...state,
                user_address:action.payload
            }


        default:
                return state;
    }
 

}


export default userDataReducer;