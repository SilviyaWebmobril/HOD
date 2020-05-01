import { CART_COUNT } from '../actions/types';
import { ERROR } from '../actions/types';
import axios from 'axios';
import ApiUrl from '../../../Api/ApiUrl';
import {IS_LOADING} from '../actions/types';
import  {CLEAR_CATEGORY_PRODUCT,GET_CART_PRODUCTS,DELETE_SEARCH,HOME_SCREEN,CATEGORY_PRODUCTS,SEARCH_PRODUCTS,REMOVE_ITEM_AFTER_PAYMENT_IN_HOME} from '../actions/types';


// export const homeScreenProducts = (user_id) =>{

//     return dispatch =>{

//         dispatch({
//             type:IS_LOADING,
//             isLoading:true,
//         })
           

//           //any async code you want! 
//           var formdata  = new FormData();
//           formdata.append("user_id",user_id);
        
//           axios.post(ApiUrl.baseurl+ApiUrl.home_page+user_id)
//           .then(response => {

           
//             dispatch({
//                 type:IS_LOADING,
//                 isLoading:false,
//             })

           
//             dispatch( {
//                 type:HOME_SCREEN,
//                 home_products:response.data,
//             })

//             // in cart reducer from home api
//             dispatch( {
//                 type:GET_CART_PRODUCTS,
//                 products_getonce:response.data.cart_products_getonce,
//                 products_subscribed:response.data.cart_products_subscribed,
//             })


//           }).catch(error => {

            
//                 console.log("on home screen error",error);
//                 dispatch({
//                     type:IS_LOADING,
//                     isLoading:false,
//                 })

//                 dispatch({
//                     type:ERROR,
//                     error:"Check Your Network Connection!"
//                 })



//           });

//     }
// }

export const homeScreenProducts = (user_id) => (dispatch) => 
    new Promise((resolve, reject) => {

        console.log("dispatching home api again on checkout")
        dispatch({
            type:IS_LOADING,
            isLoading:true,
        })

                  //any async code you want! 
          var formdata  = new FormData();
          formdata.append("user_id",user_id);
        
          axios.post(ApiUrl.baseurl+ApiUrl.home_page+user_id)
          .then(response => {

           
            dispatch({
                type:IS_LOADING,
                isLoading:false,
            })

             //in cart reducer from home api
             dispatch( {
                type:GET_CART_PRODUCTS,
                products_getonce:response.data.cart_products_getonce,
                products_subscribed:response.data.cart_products_subscribed,
            })

            dispatch( {
                type:HOME_SCREEN,
                home_products:response.data,
            })

            console.log("dispatching home api again on checkoutvdgvv")
            resolve(response);
           
            

           


          }).catch(error => {

            
                console.log("on home screen error",error);
                dispatch({
                    type:IS_LOADING,
                    isLoading:false,
                })

                dispatch({
                    type:ERROR,
                    error:"Check Your Network Connection!"
                })



          });
           


    })

export const searchProducts  =(value,category_id) =>{


    return dispatch =>{

                  
        dispatch({
            type:IS_LOADING,
            isLoading:true,
        })

        axios.post(ApiUrl.baseurl + ApiUrl.search_products+value+"&category_id="+category_id)
        .then(response => {

         console.log("get serach response action",response);
          dispatch({
              type:IS_LOADING,
              isLoading:false,
          })

          if(response.data.error){
            dispatch( {
                type:SEARCH_PRODUCTS,
                search_products:response.data.data,
                error:true,
            })
          }else{
            dispatch( {
                type:SEARCH_PRODUCTS,
                search_products:response.data.data,
                error:false
            })
  
       
          }

        

        }).catch(error => {

          
              console.log("on search product error action",error);
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

// export const categoryProducts  = (category_id) =>{

//     return dispatch => {

      
                
//         dispatch({
//             type:IS_LOADING,
//             isLoading:true,
//         });

//         dispatch({
//             type:CLEAR_CATEGORY_PRODUCT,
//             category_products:[],
//         });
       

//         axios.post(ApiUrl.baseurl + ApiUrl.get_categories_product+category_id)
//         .then(response => {
//             console.log("category fetch",response);

            
//             dispatch({
//                 type:IS_LOADING,
//                 isLoading:false,
//             })
        
//             if(response.data.error){

          
//                 dispatch({
//                     type:ERROR,
//                     error: `${response.data.message}`
                    
//                 })
    
//             }else{

      
      
//                 dispatch( {
//                     type:CATEGORY_PRODUCTS,
//                     category_products:response.data.data,
//                 })
      
              
      

//             }
        
         

//         }).catch(error => {

          
//               console.log("on home screen error",error);
//               dispatch({
//                   type:IS_LOADING,
//                   isLoading:false,
//               })

//               dispatch({
//                   type:ERROR,
//                   error:"Check Your Network Connection!"
//               })



//         });



//     }

    
// }


export const categoryProducts  = (category_id,user_id) => (dispatch) => 
    new Promise((resolve ,reject)  => {
         dispatch({
            type:IS_LOADING,
            isLoading:true,
        });
        let formdata = new FormData();
        formdata.append("product_cat_id",category_id);
        formdata.append("user_id",user_id);
        console.log("form",formdata);
    axios.post(ApiUrl.baseurl + ApiUrl.get_categories_product,formdata)
        .then(response => {
             
            dispatch({
                type:IS_LOADING,
                isLoading:false,
            })
        
            if(response.data.error){

          
                dispatch({
                    type:ERROR,
                    error: `${response.data.message}`
                    
                })
    
            }else{

      
      
                // dispatch( {
                //     type:CATEGORY_PRODUCTS,
                //     category_products:response.data.data,
                // })
      
              
      

            }

            resolve(response);
        
         

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

    })

export const removeItemAterPaymentInHome = (arr) =>{

    return {

        type:REMOVE_ITEM_AFTER_PAYMENT_IN_HOME,
        product_ids :  arr,

    }
}

export const deleteSearch = () => {
    return {
        type:DELETE_SEARCH,
        search_products:[],
    }
}