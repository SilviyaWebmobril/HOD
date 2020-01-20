import { ADD_USER_DATA,REMOVE_ADDRESS, ADD_NEW_ADDRESS } from '../actions/types';
import User from '../../../models/User';
import { ADD_USER_ADDRESS ,CHANGE_MOBILE,USER_ID,ALL_ADDRESSES,CHANGE_PRIMARY_ADDRESS_STATUS} from '../actions/types';


const initialState = {
    userdata:{},
    user_address:"",
    user_id:"",
    all_address:[]

    
}
 const userDataReducer = (state = initialState,action)  => {

    
    switch(action.type){
        case ADD_USER_DATA:

            let user = action.payload;
          
            let updatedUser  = new User(user.user_id,user.user_name,user.user_email,
                                        user.user_mobile,user.user_gender,user.user_dob,user.user_married,user.user_family_members,user.user_vegitarian);

           
           
            return{
                ...state,
                userdata:{...updatedUser}
            }
            /// adding primary address here
        case ADD_USER_ADDRESS:
            console.log("ADD_USER_ADDRESS",action.payload);
           
            return{
                ...state,
                user_address:action.payload
            }

        case CHANGE_MOBILE:
            return {
                ...state,
                userdata:{
                    ...state.userdata,
                    user_mobile:action.mobile,
                }
            }
            

        case USER_ID :
            return {
                ...state,
                user_id:action.user_id
            }

        case ALL_ADDRESSES :
            return{
                ...state,
                all_address:action.all_address
            }

        case REMOVE_ADDRESS:{
            console.log('on user action removed id',action.removed_id);
            var removed_id = action.removed_id;
            var address_array = [...state.all_address];
            for( var i = 0; i < address_array.length; i++){ 
                if ( address_array[i].id === removed_id) {
                    address_array.splice(i, 1); 
                  i--;
                }
             }
            return{
                ...state,
                all_address:[...address_array]

            }
        }

        case ADD_NEW_ADDRESS :
            console.log("hello user data",action.payload);
            var address_item  = action.payload;
            var address_array = [...state.all_address];
            address_array.push(address_item);
            return{
                ...state,
                all_address:[...address_array]

            }

        case CHANGE_PRIMARY_ADDRESS_STATUS :
            var address_id = action.payload;
            let all_address = [...state.all_address];
            all_address.forEach(ele => {

                if(address_id == ele.id){
                    ele.primary_status = 1;
                }else{
                    ele.primary_status = 0;
                }

            });
            return {
                ...state,
                all_address:[...all_address]
            }

        default:
                return state;
    }
 

}


export default userDataReducer;