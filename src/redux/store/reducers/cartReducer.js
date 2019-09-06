import {ADD_TO_CART} from '../actions/types';
import CartItem from '../../../models/CartItem';
import { DELETE_FROM_CART } from '../actions/types';

const initialState = {
     
    product_item:{},
    totalAmount:0.00,
    quantity:0,
  //  total_cart_count:0,

}

export default (state = initialState ,action) => {

    switch(action.type) {

        case ADD_TO_CART :  
            const addedproduct = action.product_item;
            const prodId = addedproduct.id;
            const prodPrice = parseFloat(addedproduct.new_price).toFixed(2);
            const prodName =  addedproduct.name;
          
            let  quantity ;
          
            let updatedOrNewCartItem ;

            if(state.product_item[prodId]){

                // checking if already present
                quantity =    state.product_item[prodId].itemQuanity + 1;
                updatedOrNewCartItem =  new CartItem(
                        prodName,
                        state.product_item[prodId].itemQuanity + 1,
                        prodPrice,
                        parseFloat(state.product_item[prodId].sum + prodPrice).toFixed(2)
                    );
                

            }else{
                quantity = 1;
                updatedOrNewCartItem =  new CartItem(prodName,1,prodPrice,prodPrice);
               

            }

            console.log("total ant", ( parseFloat(state.totalAmount) + parseFloat(quantity * prodPrice) ));

            return {
                ...state, 
                product_item:{...state.product_item,[prodId]:updatedOrNewCartItem},
                totalAmount: parseFloat(parseFloat(state.totalAmount) + parseFloat(quantity * prodPrice)).toFixed(2),
               // total_cart_count:count,
            }

        case DELETE_FROM_CART :
            return {
                ...state, 
                product_item:{},
                totalAmount:0.00,
                quantity:0
                // total_cart_count:count,
            }
    

            default:
                    return state;


    }

   
}