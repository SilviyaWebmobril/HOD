import { CART_COUNT } from '../actions/types';
import { ERROR } from '../actions/types';
import axios from 'axios';
import ApiUrl from '../../../Api/ApiUrl';
import {IS_LOADING} from '../actions/types';
import  {GET_CART_PRODUCTS,HOME_SCREEN,CATEGORY_PRODUCTS,SEARCH_PRODUCTS} from '../actions/types';


export const homeScreenProducts = (user_id) =>{

    return dispatch =>{

           

          //any async code you want! 
          var formdata  = new FormData();
          formdata.append("user_id",user_id);
        
          axios.post(ApiUrl.baseurl+ApiUrl.home_page+user_id)
          .then(response => {

                
            dispatch({
                type:IS_LOADING,
                isLoading:false,
            })


            dispatch( {
                type:HOME_SCREEN,
                home_products:response.data,
            })

            dispatch( {
                type:GET_CART_PRODUCTS,
                products_getonce:response.data.cart_products_getonce,
                products_subscribed:response.data.cart_products_subscribed,
            })


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

    }
}

export const categoryProducts  = (category_id) =>{

    return dispatch => {

      
                
        dispatch({
            type:IS_LOADING,
            isLoading:true,
        })

        axios.post(ApiUrl.baseurl + ApiUrl.get_categories_product+category_id)
        .then(response => {

              
          dispatch({
              type:IS_LOADING,
              isLoading:false,
          })


          dispatch( {
              type:CATEGORY_PRODUCTS,
              category_products:response.data.data,
          })

        //   dispatch( {
        //       type:GET_CART_PRODUCTS,
        //       products_getonce:response.data.cart_products_getonce,
        //       products_subscribed:response.data.cart_products_subscribed,
        //   })


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



    }

    
}

export const searchProducts  =(value) =>{


    return dispatch =>{

                  
        dispatch({
            type:IS_LOADING,
            isLoading:true,
        })

        axios.post(ApiUrl.baseurl + ApiUrl.search_products+value)
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