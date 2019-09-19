import { ADD_TO_CART } from '../actions/types';
import { DELETE_FROM_CART } from '../actions/types';
import { CART_COUNT } from '../actions/types';
import { ERROR } from '../actions/types';
import axios from 'axios';
import ApiUrl from '../../../Api/ApiUrl';
import {IS_LOADING} from '../actions/types';
import  {REMOVE_FROM_CART,GET_CART_PRODUCTS,
REMOVE_SUBSCRIBED_FROM_CART,UPDATE_GET_ALL_PRODUCTS_QUANTITY,
REMOVE_GET_ONCE_GET_ALL_PRODUCTS_QUANTITY } from '../actions/types';


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

        
        if(response.data.error && response.data.data.length !== 0){

          
            dispatch({
                type:ERROR,
                error:"Some Error Ocurred ! Please try again later."
                
            })

        }else{

            // creating cart objects get_once / subscribed
            dispatch( {
                type:GET_CART_PRODUCTS,
                products:response.data.data,
            })

           
    
        }

     
      }).catch(error => {

      
     console.log("on adding items error",error);
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

        console.log("on adding product",response);
    
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
    
            dispatch( {
                type:UPDATE_GET_ALL_PRODUCTS_QUANTITY,
                product_item:response.data.data,
                
            })
        }

     
      }).catch(error => {

        console.log("error",error);
      
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

export const removeFromCart = (product_id,user_id,price) =>{ 

    return dispatch => {

         //any async code you want! 
            var formdata  = new FormData();
            formdata.append("user_id",user_id);
            formdata.append("product_id",product_id);
            formdata.append("price",price);
         
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

                    dispatch( {
                        type:REMOVE_GET_ONCE_GET_ALL_PRODUCTS_QUANTITY,
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




export const removeSubscribedFromCart = (product_id,user_id) =>{ 

    return dispatch => {

         //any async code you want! 
            var formdata  = new FormData();
            formdata.append("user_id",user_id);
            formdata.append("product_id",product_id);
            formdata.append("price",price);
         
            axios.post(ApiUrl.baseurl + ApiUrl.remove_subscribed_product,formdata)
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
                        type:REMOVE_SUBSCRIBED_FROM_CART,
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

export const addOrUpdateSubscriptionToCart = (product_id,price,subscriptipn_type,user_id,update)=>{


    return dispatch => {

        //any async code you want! 
           var formdata  = new FormData();
           formdata.append("user_id",user_id);
           formdata.append("product_id",product_id);
           formdata.append("price",price);
           formdata.append("subscription_type",subscriptipn_type);
           if(update == 1){
            formdata.append("update_quantity","1");
           }else{
            formdata.append("update_quantity","");
           }

         
           axios.post(ApiUrl.baseurl + ApiUrl.add_subscribed_products,formdata)
           .then(response => {
       
             
               dispatch({
                   type:IS_LOADING,
                   isLoading:false,
               })
       
               console.log("new response",response);
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
       
                   dispatch({
                       type:ERROR,
                       error:"Subscribe to cart"
                       
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