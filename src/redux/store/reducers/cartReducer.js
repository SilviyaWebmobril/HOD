import {ADD_TO_CART} from '../actions/types';
import CartItem from '../../../models/CartItem';
import { DELETE_FROM_CART } from '../actions/types';
import  { CART_COUNT } from '../actions/types';
import { ERROR } from '../actions/types';
import { IS_LOADING } from '../actions/types';
import { REMOVE_FROM_CART,GET_CART_PRODUCTS } from '../actions/types';


const initialState = {

    product_item:{},    
    totalAmount:0.00,
    total_cart_count:0,
    error :"",
    isLoading:true,
    all_products:[],
   

}

export default (state = initialState ,action) => {

    switch(action.type) {

        case GET_CART_PRODUCTS :

            const all_products = [...action.products]
            let totalAmount ;
            let cart = {};
            if(all_products.length > 0){

              
                all_products.map(item =>{
                   
                    const cartItem = new CartItem(item.product.name,item.is_subscribed,item.subscription_type,item.quantity,item.product.new_price,parseFloat(item.product.new_price) * parseInt(item.quantity));
    
                        if(item.is_subscribed == 0 ){
                           
                            Object.assign(cart,{"get_once":{[item.product.id]:cartItem}})
                          
                        }else{
                         
                            Object.assign(cart,{"subscribed":{[item.product.id]:cartItem}})
                        }
                   
                  
                     totalAmount =  parseFloat(parseFloat(state.totalAmount) + parseFloat(item.quantity * item.product.new_price)).toFixed(2)
                })

                console.log("fetch product",cart);

               
            }
          
            return {
                ...state,
                product_item:cart,
                totalAmount:totalAmount,
                total_cart_count:all_products.length,
            }


        case ADD_TO_CART :  

            const addedproduct = {...action.product_item};
            let is_subscribed  =  addedproduct.is_subscribed;
            let subscryption_type = addedproduct.subscription_type;
            let prodId = addedproduct.product.id;
            let prodPrice = parseFloat(addedproduct.product.new_price).toFixed(2);
            let prodName =  addedproduct.product.name;
            
          
            let  quantity = addedproduct.quantity ;
          
            let updatedOrNewCartItem ;
            let count ;

            if(is_subscribed == 0 ){

                if(state.product_item.get_once[prodId]){

                        console.log("on get once added",addedproduct);
                      // checking if already present
               
                        updatedOrNewCartItem =  new CartItem(
                            prodName,
                            is_subscribed,
                            subscryption_type,
                            quantity,
                            prodPrice,
                            parseFloat(state.product_item.get_once[prodId].sum + prodPrice).toFixed(2)
                        );

                        count = Object.keys(state.product_item).length ;
            
                }else{

                    quantity = 1;
                    updatedOrNewCartItem =  new CartItem(prodName,is_subscribed,subscryption_type,1,prodPrice,prodPrice);
                    count = Object.keys(state.product_item).length +1;
                   
    

                }


            }else{

                if(state.product_item.subscribed[prodId]){


                    // checking if already present
             
                      updatedOrNewCartItem =  new CartItem(
                          prodName,
                          is_subscribed,
                          subscryption_type,
                          quantity,
                          prodPrice,
                          parseFloat(state.product_item.subscribed[prodId].sum + prodPrice).toFixed(2)
                      );

                      count = Object.keys(state.product_item).length ;
          
              }else{

                quantity = 1;
                updatedOrNewCartItem =  new CartItem(prodName,is_subscribed,subscryption_type,1,prodPrice,prodPrice);
                count = Object.keys(state.product_item).length +1;
               

              }


            }


        

          if(is_subscribed == 0){

            return{
                ...state,
                product_item:{
                   
                    get_once:{
                        
                        ...state.product_item.get_once,[prodId]:updatedOrNewCartItem,
                    },
                    subscribed:{
                        
                        ...state.product_item.subscribed

                    }
                   
                 

                },
                totalAmount: parseFloat(parseFloat(state.totalAmount) + parseFloat(quantity * prodPrice)).toFixed(2),
                total_cart_count:count,

            }
          }else{

                return {
                        ...state, 
                        product_item:{
                            get_once:{
                                ...state.product_item.get_once,
                            },
                            subscribed:{
                                ...state.product_item.subscribed,[prodId]:updatedOrNewCartItem
                            }
                            
                           
                    },
                    totalAmount: parseFloat(parseFloat(state.totalAmount) + parseFloat(quantity * prodPrice)).toFixed(2),
                    total_cart_count:count,
                }

            }

           
        case CART_COUNT : 
            return{

                ...state,
                total_cart_count:Object.keys(state.product_item).length
            }

        case REMOVE_FROM_CART :

            const productId = action.product_id;
            
            let  updatedCartItems ;
            let total_cart_amount ; 
            let total_cart_count;

            if(state.product_item[productId]){

                if(state.product_item[productId].itemQuanity > 1){

                    // reduce the quantity the by 1

                    const updatedCartItem = new CartItem(

                        state.product_item[productId].itemName,
                        state.product_item[productId].itemQuanity - 1,
                        state.product_item[productId].itemPrice,
                        parseFloat(state.product_item[productId].sum) -   parseFloat(state.product_item[productId].itemPrice),
                    );

                   
                    updatedCartItems = {...state.product_item,[action.productId]:updatedCartItem};
                    total_cart_amount =  parseFloat( parseFloat(state.total_cart_amount) - parseFloat(state.product_item[productId].itemPrice)).toFixed(2);
                    total_cart_count = state.total_cart_count;

                  
                }else{

                    updatedCartItems = {...state.product_item};

                    delete updatedCartItems[productId];
                    total_cart_amount = parseFloat( parseFloat(state.total_cart_amount) - parseFloat(state.product_item[productId].itemPrice)).toFixed(2);
                    total_cart_count = parseInt(state.total_cart_count) - 1;

                }

            }
           
            
            return {
                ...state ,
                product_item:updatedCartItems,
                totalAmount: total_cart_amount,
                total_cart_count:total_cart_count,

            }
        
        case ERROR :
            return {
                ...state,
                error:action.error,
            }

        case IS_LOADING :
            return {
                ...state,
                isLoading : action.isLoading
            }

        case DELETE_FROM_CART :
            return {
                ...state, 
                product_item:{},
                totalAmount:0.00,
                total_cart_count:0,
            }
    

            default:
                    return state;


    }

   
}