import { ADD_TO_CART } from '../actions/types';
import { DELETE_FROM_CART } from '../actions/types';
import { CART_COUNT } from '../actions/types';
import { ERROR } from '../actions/types';
import axios from 'axios';
import ApiUrl from '../../../Api/ApiUrl';
import {IS_LOADING} from '../actions/types';
import  {REMOVE_FROM_CART,GET_CART_PRODUCTS } from '../actions/types';


export const fetchCartProducts  = (user_id) => {


    return dispatch => {
        //any async code you want! 
        var formdata  = new FormData();
        formdata.append("user_id",user_id);
       
      axios.post(ApiUrl.baseurl + ApiUrl.get_cart_products,formdata)
      .then(response => {

        
        dispatch({
            type:IS_LOADING,
            isLoading:false,
        })

        if(response.data.error){

          
            dispatch({
                type:ERROR,
                error:"Some Error Ocurred ! Please try again later."
                
            })

        }else{

            dispatch( {
                type:GET_CART_PRODUCTS,
                products:response.data.data,
            })

           
    
        }

     
      }).catch(error => {

      
     
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

export const addToCart  = (product_id,price,user_id) => {


    return dispatch => {
        //any async code you want! 
        var formdata  = new FormData();
        formdata.append("user_id",user_id);
        formdata.append("product_id",product_id);
        formdata.append("price",price);
      

      axios.post(ApiUrl.baseurl + ApiUrl.add_to_cart,formdata)
      .then(response => {

        
        dispatch({
            type:IS_LOADING,
            isLoading:false,
        })

       

        if(response.data.error){

          
            dispatch({
                type:ERROR,
                error:"Some Error Ocurred ! Please try again later."
                
            })

        }else{

            dispatch( {
                type:ADD_TO_CART,
                product_item:response.data.data,
            })
    
        }

     
      }).catch(error => {

       
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

export const removeFromCart = (product_id,user_id) =>{ 

    return dispatch => {

         //any async code you want! 
            var formdata  = new FormData();
            formdata.append("user_id",user_id);
            formdata.append("product_id",product_id);
         
            axios.post(ApiUrl.baseurl + ApiUrl.remove_cart_product,formdata)
            .then(response => {
        
                console.log("remove cart",response);
                
                dispatch({
                    type:IS_LOADING,
                    isLoading:false,
                })
        
                if(response.data.error){
        
                
                    dispatch({
                        type:ERROR,
                        error:"Some Error Ocurred ! Please try again later."
                        
                    })
        
                }else{
        
                    
        
        
                    dispatch( {
                        type:REMOVE_FROM_CART,
                        product_id:product_id,
                      
                    })
        
                    dispatch({
                        type:ERROR,
                        error:"Remove from cart!"
                        
                    })
        
            
                }
        
            
            }).catch(error => {
        
                console.log("response on error",error);
        
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



export const deleteCart = () => {

    return{
        type: DELETE_FROM_CART,
        product_item:{}
    }
}

export const onError = (value)  =>{
    return {
        type :ERROR,
        error: value
    }
}

export const isLoading = (value) => {
    return {
        type:IS_LOADING,
        isLoading:value,
    }
}


export const cartCount = () =>{

    return {
        type:CART_COUNT
    }
}