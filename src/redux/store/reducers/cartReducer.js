import {ADD_TO_CART} from '../actions/types';
import CartItem from '../../../models/CartItem';
import { DELETE_FROM_CART } from '../actions/types';
import  { CART_COUNT } from '../actions/types';
import { ERROR } from '../actions/types';
import { IS_LOADING } from '../actions/types';
import { REMOVE_FROM_CART,GET_CART_PRODUCTS ,REMOVE_SUBSCRIBED_FROM_CART} from '../actions/types';


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
                   
                    var sum = parseFloat(item.product.new_price) * parseInt(item.quantity);
                    const cartItem = new CartItem(item.product.name,item.is_subscribed,item.subscription_type,item.quantity,item.product.new_price,parseFloat(sum));
    
                        if(item.is_subscribed == 0 ){
                           
                            if('get_once' in cart){
                                Object.assign(cart,{"get_once":{[item.product.id]:cartItem}})
                            }else{
                                Object.assign("get_once",{[item.product.id]:cartItem})
                                //cart.get_once.push({[item.product.id]:cartItem})
                            }
                            
                            
                            console.log("fetch product 11",cart);
                          
                        }else{
                         
                            Object.assign(cart,{"subscribed":{[item.product.id]:cartItem}})
                        }
                   
                  
                     totalAmount =  parseFloat(parseFloat(state.totalAmount) + parseFloat(parseFloat(item.quantity) * parseFloat(item.product.new_price)))
                })

                console.log("fetch product",cart);
               
            }
          
            return {
                ...state,
                product_item:cart,
                all_products:all_products,
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

            console.log("state product item",state.product_item)

            if(is_subscribed == 0 ){

                if('get_once' in state.product_item){

                    if(state.product_item.get_once[prodId]){

                        console.log("state product item updating",state.product_item)

                        // checking if already present
                 
                          updatedOrNewCartItem =  new CartItem(
                              prodName,
                              is_subscribed,
                              subscryption_type,
                              quantity,
                              parseFloat(prodPrice),
                              parseFloat(state.product_item.get_once[prodId].sum + parseFloat(prodPrice)).toFixed(2)
                          );
  
                          count = Object.keys(state.product_item).length ;
              
                  }

                }else{

                    quantity = 1;
                    updatedOrNewCartItem =  new CartItem(prodName,is_subscribed,subscryption_type,1,parseFloat(prodPrice),parseFloat(prodPrice));
                    count = Object.keys(state.product_item).length +1;
                   
    

                }


            }else{

                if('subcribed' in state.product_item){

                    if(state.product_item.subscribed[prodId]){


                        // checking if already present
                 
                          updatedOrNewCartItem =  new CartItem(
                              prodName,
                              is_subscribed,
                              subscryption_type,
                              quantity,
                              parseFloat(prodPrice),
                              parseFloat(state.product_item.subscribed[prodId].sum + parseFloat(prodPrice)).toFixed(2)
                          );
    
                          count = Object.keys(state.product_item).length ;
              
                  }
                }else{

                quantity = 1;
                updatedOrNewCartItem =  new CartItem(prodName,is_subscribed,subscryption_type,1,parseFloat(prodPrice),parseFloat(prodPrice));
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
                totalAmount: parseFloat(parseFloat(state.totalAmount) +  parseFloat(prodPrice)),
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
                    totalAmount: parseFloat(parseFloat(state.totalAmount) + parseFloat(prodPrice)),
                    total_cart_count:count,
                }

            }

           
        case CART_COUNT : 
            return{

                ...state,
                total_cart_count:Object.keys(state.product_item).length
            }


        case REMOVE_SUBSCRIBED_FROM_CART:{

            const productId = action.product_id;
            
            let  updatedCartItems ;
            let total_cart_amount ; 
            let total_cart_count;

            if(state.product_item.subscribed[productId]){

                if(state.product_item.subscribed[productId].itemQuanity > 1){

                    // reduce the quantity the by 1

                    const updatedCartItem = new CartItem(

                        state.product_item.subscribed[productId].itemName,
                        state.product_item.subscribed[productId].isSubscribed,
                        state.product_item.subscribed[productId].subscryptionType,
                        state.product_item.subscribed[productId].itemQuanity - 1,
                        state.product_item.subscribed[productId].itemPrice,
                        parseFloat(state.product_item.subscribed[productId].sum) - parseFloat(state.product_item.subscribed[productId].itemPrice),
                    );
                    total_cart_amount =  parseFloat(state.totalAmount) - parseFloat(state.product_item.subscribed[productId].itemPrice);
                    total_cart_count = state.total_cart_count;
                   
                    updatedCartItems = {
                      
                            get_once:{
                                ...state.product_item.get_once,
                            },
                            subscribed:{
                                ...state.product_item.subscribed,[productId]:updatedCartItem
                            }
                      
                    }

                }

            
            } 

                  
            return {
                ...state ,
                product_item:updatedCartItems,
                totalAmount: parseFloat(total_cart_amount),
                total_cart_count:total_cart_count,

            }
        
            

        }

        


        case REMOVE_FROM_CART :

            const productId = action.product_id;
            
            let  updatedCartItems ;
            let total_cart_amount ; 
            let total_cart_count;

            if(state.product_item.get_once[productId]){

                if(state.product_item.get_once[productId].itemQuanity > 1){

                    // reduce the quantity the by 1
                  
                    const updatedCartItem = new CartItem(

                        state.product_item.get_once[productId].itemName,
                        state.product_item.get_once[productId].isSubscribed,
                        state.product_item.get_once[productId].subscryptionType,
                        state.product_item.get_once[productId].itemQuanity - 1,
                        state.product_item.get_once[productId].itemPrice,
                        parseFloat(state.product_item.get_once[productId].sum) - parseFloat(state.product_item.get_once[productId].itemPrice),
                    );

                    total_cart_amount = parseFloat(state.totalAmount) - parseFloat(state.product_item.get_once[productId].itemPrice);
                    total_cart_count = state.total_cart_count;

                   
                    updatedCartItems = {
                      
                            get_once:{
                                ...state.product_item.get_once,[productId]:updatedCartItem
                            },
                            subscribed:{
                                ...state.product_item.subscribed
                            }
                        
                    }
                        
                       
                
                   
                  
                }else{

                    updatedCartItems = {...state.product_item.get_once};

                    total_cart_amount = parseFloat(state.totalAmount) - parseFloat(state.product_item.get_once[productId].itemPrice);
                    total_cart_count = parseInt(state.total_cart_count) - 1;


                    delete updatedCartItems[productId];
                   
                }

            
            }
           
            
            return {
                ...state ,
                product_item:updatedCartItems,
                totalAmount: parseFloat(total_cart_amount),
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