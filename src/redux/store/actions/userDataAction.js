import { ADD_USER_DATA,REMOVE_ADDRESS,ADD_NEW_ADDRESS } from './types';
import axios from 'axios';
import ApiUrl from '../../../Api/ApiUrl';
import { ADD_USER_ADDRESS,CHANGE_MOBILE,USER_ID ,IS_LOADING,ERROR,ALL_ADDRESSES} from './types';

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

export const getUserId = (id) => {
    console.log("by create account",id);
    return{
        type:USER_ID,
        user_id:id
    }
}

export const getUserProfile =  (user_id) => {

    console.log("getProfileid",user_id);

    return dispatch =>{

        dispatch({
            type:IS_LOADING,
            isLoading:true,
        })

        //any async code you want! 
      
        axios.get(ApiUrl.baseurl+ApiUrl.get_profile+user_id).then(res => {

               
            dispatch({
                type:IS_LOADING,
                isLoading:false,
            })

           
            console.log("   ",res);
            if(res.data.error){

                
                dispatch({
                    type:ERROR,
                    error:"Some Error Ocurred ! Please try again later."
                    
                })
            }else{

                
                let userdata ={};
                  
                Object.assign(userdata,{"user_id":JSON.stringify(res.data.result.id)});
                Object.assign(userdata,{"user_name": res.data.result.name});
                Object.assign(userdata,{"user_email":res.data.result.email});
                Object.assign(userdata,{"user_mobile":res.data.result.mobile});
                Object.assign(userdata,{"user_gender":res.data.result.gender});
                Object.assign(userdata,{"user_dob":res.data.result.dob});
                Object.assign(userdata,{"user_married":JSON.stringify(res.data.result.married)});
                Object.assign(userdata,{"user_family_members":res.data.result.family_members});
                Object.assign(userdata,{"user_vegitarian":JSON.stringify(res.data.result.vegitarian)});

                dispatch({
                    type:ADD_USER_DATA,
                    payload:userdata
                })

                if(res.data.primary_address !== null){
                    dispatch({
                        type:ADD_USER_ADDRESS,
                        payload:res.data.primary_address.homeaddress
        
                    })
    
                }else{
                    dispatch({
                        type:ADD_USER_ADDRESS,
                        payload:""
        
                    })
    
                }
               
                dispatch({
                    type:ALL_ADDRESSES,
                    all_address:res.data.result.addresses
    
                })
    

            }

          }).catch(error => {
              console.log("check error",error);
                dispatch({
                    type:IS_LOADING,
                    isLoading:false,
                })
        
              
                dispatch({
                    type:ERROR,
                    error:"Check Your Network Connection!"
                })
          });
    }

}

export const changeMobile = (mobile) =>{

    return {
        type:CHANGE_MOBILE,
        mobile:mobile
    }
}

export const removeAddress = (id) =>{
    return{
        type:REMOVE_ADDRESS,
        removed_id:id
    }
}

export const addNewAddress = (item) =>{

    return {
        type:ADD_NEW_ADDRESS,
        payload:item
    }
}