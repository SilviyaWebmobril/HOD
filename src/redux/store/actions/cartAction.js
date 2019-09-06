import { ADD_TO_CART } from '../actions/types';
import { DELETE_FROM_CART } from '../actions/types';

export const addToCart =  (product) => {

    return {
        type:ADD_TO_CART,
        product_item:product,
    }
}

export const deleteCart = () => {

    return{
        type: DELETE_FROM_CART,
        product_item:{}
    }
}


