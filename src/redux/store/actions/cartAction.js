import { ADD_TO_CART } from '../actions/types';
import { DELETE_FROM_CART } from '../actions/types';
import { CART_COUNT } from '../actions/types';
import axios from 'axios';

export const addToCart =  (product) => {

    // Now here due to redux thunk we can dispatch an action which will dispatch another action in turn !
    // Due  to which we can run any async code inside that .. and it will wait for the api call and then in turn 
    // gives the Object which will dispatch another action to give the response from server

    return dispatch => {
        //any async code you want! 
      
        dispatch( {
            type:ADD_TO_CART,
            product_item:product,
        })
    }
   
}

export const deleteCart = () => {

    return{
        type: DELETE_FROM_CART,
        product_item:{}
    }
}


export const cartCount = () =>{

    return {
        type:CART_COUNT
    }
}