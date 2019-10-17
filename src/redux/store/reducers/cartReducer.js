import {ADD_TO_CART} from '../actions/types';
import CartItem from '../../../models/CartItem';
import { DELETE_FROM_CART } from '../actions/types';
import  { CART_COUNT } from '../actions/types';
import { ERROR } from '../actions/types';
import { IS_LOADING } from '../actions/types';
import { REMOVE_FROM_CART,
    GET_CART_PRODUCTS ,
    REMOVE_SUBSCRIBED_FROM_CART,
    REMOVE_ITEM_AFTER_PAYMENT_IN_CART,
    GET_CART_API} from '../actions/types';


const initialState = {

    cart_get_once:{
    
    },
    cart_subscribed:{

    } ,
    totalAmount:0.00,
    total_cart_count:0,
    error :"",
    isLoading:true,
    all_cart_products:[],
    get_once_cart_sum:0.00,

   

}

export default (state = initialState ,action) => {

    switch(action.type) {

          // in cart reducer from home api for cart_get_once , cart_subscribed

        case GET_CART_PRODUCTS :

            const products_getonce = [...action.products_getonce];
            const products_subscribed = [...action.products_subscribed];
           
            let totalAmount_get_once = state.totalAmount;
            let totalAmount_subscribed = state.totalAmount;
            let totalAmount = 0;
            let total_get_once_quantity = state.total_cart_count;
            let total_subscribed_quantity = state.total_cart_count;
            let total_count = 0;
            let cart_get_once = {};
            let cart_subscribed ={};
            
            if(products_getonce.length > 0){

              
                products_getonce.map(item =>{
                   
                    if(item.product.is_discount == 1){
                        var product_price  = item.product.new_price;
                        var sum = parseFloat(item.product.new_price) * parseInt(item.quantity);
                    }else{
                        var product_price  = item.product.old_price;
                        var sum = parseFloat(item.product.old_price) * parseInt(item.quantity);
                    }
                   
                    const cartItem = new CartItem(item.product.name,item.is_subscribed,item.subscription_type,item.quantity,product_price,parseFloat(sum));
    
                      
                            Object.assign(cart_get_once,{[item.product.id]:cartItem})
                            total_get_once_quantity = parseInt(total_get_once_quantity) + parseInt(item.quantity);
                       
                            totalAmount_get_once =  parseFloat(parseFloat(totalAmount_get_once) + parseFloat(parseFloat(item.quantity) * parseFloat(product_price)))
                })

               
               
            }

            if(products_subscribed.length > 0){

              
                products_subscribed.map(item =>{
                   
                    if(item.product.is_discount == 1){
                        var product_price  = item.product.new_price;
                        var sum = parseFloat(item.product.new_price) * parseInt(item.quantity);
                    }else{
                        var product_price  = item.product.old_price;
                        var sum = parseFloat(item.product.old_price) * parseInt(item.quantity);
                    }
                   
                    const cartItem = new CartItem(item.product.name,item.is_subscribed,item.subscription_type,item.quantity,product_price,parseFloat(sum));
    
                            Object.assign(cart_subscribed,{[item.product.id]:cartItem});
                            total_subscribed_quantity = parseInt(total_subscribed_quantity) + parseInt(item.quantity);
                       
                            totalAmount_subscribed =  parseFloat(parseFloat(totalAmount_subscribed) + parseFloat(parseFloat(item.quantity) * parseFloat(product_price)))
                })

               
               
            }
            total_count = parseInt(total_get_once_quantity) + parseInt(total_subscribed_quantity);
            
            totalAmount = parseFloat(totalAmount_get_once) +  parseFloat(totalAmount_subscribed);
          
            return {
                ...state,
                cart_get_once:cart_get_once,
                cart_subscribed:cart_subscribed,
                totalAmount:totalAmount,
                total_cart_count:total_count,
            }


        case ADD_TO_CART :  

            
            const addedproduct = {...action.product_item};
            let is_subscribed  =  addedproduct.is_subscribed;
            let subscryption_type = addedproduct.subscription_type;
            let prodId = addedproduct.product.id;
            if(addedproduct.product.is_discount == 1){
                var  prodPrice = parseFloat(addedproduct.product.new_price).toFixed(2);
            }else{
                var prodPrice = parseFloat(addedproduct.product.old_price).toFixed(2);
            }
            
            let prodName =  addedproduct.product.name;
           
          
            let  quantity = addedproduct.quantity ;
          
            let updatedOrNewCartItem ;
            let count ;
            let get_once_cart_sum;

            if(is_subscribed == 0 ){

              

                    if(state.cart_get_once[prodId]){

                       

                        // checking if already present
                 
                          updatedOrNewCartItem =  new CartItem(
                              prodName,
                              is_subscribed,
                              subscryption_type,
                              quantity,
                              parseFloat(prodPrice),
                              parseFloat(state.cart_get_once[prodId].sum + parseFloat(prodPrice)).toFixed(2)
                          );
  
                        

                }else{

                    quantity = 1;
                    updatedOrNewCartItem =  new CartItem(prodName,is_subscribed,subscryption_type,1,parseFloat(prodPrice),parseFloat(prodPrice));
                    
    

                }
                get_once_cart_sum = parseFloat(state.get_once_cart_sum) + parseFloat(prodPrice)

            }else{

             

                if(state.cart_subscribed[prodId]){

                 
                        // checking if already present
                 
                          updatedOrNewCartItem =  new CartItem(
                              prodName,
                              is_subscribed,
                              subscryption_type,
                              quantity,
                              parseFloat(prodPrice),
                              parseFloat(state.cart_subscribed[prodId].sum + parseFloat(prodPrice)).toFixed(2)
                          );
    
                     
                }else{

                quantity = 1;
                updatedOrNewCartItem =  new CartItem(prodName,is_subscribed,subscryption_type,1,parseFloat(prodPrice),parseFloat(prodPrice));
               
               

              }


            }

            // update the Qunatity here for all cart products
            var all_cart  = [...state.all_cart_products];
            if(Array.isArray(state.all_cart_products) && state.all_cart_products.length){

              
                all_cart.forEach(item => {

                    if(item.product.id ===  prodId){


                        if(addedproduct.is_subscribed ==  item.is_subscribed){
                            item.quantity = parseInt(item.quantity) + 1;
                        }
                       
                    
                      
                    }

                });
            }


        

          if(is_subscribed == 0){

                return{
                    ...state,
                    cart_get_once:{
                        ...state.cart_get_once,[prodId]:updatedOrNewCartItem,
                    },
                    totalAmount: parseFloat(parseFloat(state.totalAmount) +  parseFloat(prodPrice)),
                    total_cart_count:parseInt(state.total_cart_count) +1,
                    all_cart_products:[...all_cart],
                    get_once_cart_sum:get_once_cart_sum

                }
          }else{

                return {
                        ...state, 
                        cart_subscribed:{
                            ...state.cart_subscribed,[prodId]:updatedOrNewCartItem,
                        },
                        totalAmount: parseFloat(parseFloat(state.totalAmount) + parseFloat(prodPrice)),
                        total_cart_count:parseInt(state.total_cart_count) +1,
                        all_cart_products:[...all_cart]
                }

            }

           
        case CART_COUNT : 
            return{

                ...state,
                total_cart_count:Object.keys(state.cart_get_once).length +  Object.keys(state.cart_subscribed).length
            }


        case REMOVE_SUBSCRIBED_FROM_CART:{

            const productId = action.product_id;
            
            let  updatedCartItem ;
            let total_cart_amount ; 
            let total_cart_count;

            
            if(state.cart_subscribed[productId]){
               
                if(state.cart_subscribed[productId].itemQuanity > 1){

                    // reduce the quantity the by 1
                   
                    let itemName =   state.cart_subscribed[productId].itemName;
                    let isSubscribed = state.cart_subscribed[productId].isSubscribed;
                    let subscryptionType = state.cart_subscribed[productId].subscryptionType;
                    let itemQuanity = parseInt(state.cart_subscribed[productId].itemQuanity) - 1;
                    let itemPrice =  state.cart_subscribed[productId].itemPrice;
                    let sum = parseFloat(state.cart_subscribed[productId].sum) - parseFloat(state.cart_subscribed[productId].itemPrice),

                 updatedCartItem = new CartItem(

                        itemName,
                        isSubscribed,
                        subscryptionType,
                        itemQuanity,
                        itemPrice,
                        sum
                    );
                    total_cart_amount =  parseFloat(state.totalAmount) - parseFloat(itemPrice);
                    total_cart_count = parseInt(state.total_cart_count) - 1;
                   
                 
                    return {
                        ...state ,
                        cart_subscribed:{
                            ...state.cart_subscribed,[productId]:updatedCartItem,
                        },
                        totalAmount: parseFloat(total_cart_amount),
                        total_cart_count:total_cart_count,
        
                    }
                

                }else{

                    updatedCartItem = {...state.cart_subscribed};
    
                    total_cart_amount = parseFloat(state.totalAmount) - parseFloat(state.cart_subscribed[productId].itemPrice);
                    total_cart_count = parseInt(state.total_cart_count) - 1;
    
    
                    delete updatedCartItem[productId];
    
                    return {
                        ...state ,
                        cart_subscribed:{
                           ...updatedOrNewCartItem,
                        },
                        totalAmount: parseFloat(total_cart_amount),
                        total_cart_count:total_cart_count,
        
                    }
    

            
                }
            
            }
                  
          
            

        }

        


        case REMOVE_FROM_CART :

            const productId = action.product_id;
            
            let  updatedCartItem ;
            let total_cart_amount ; 
            let total_cart_count;

            var all_cart = [...state.all_cart_products];
          
            if(Array.isArray(state.all_cart_products) && state.all_cart_products.length){
         
                all_cart.map((item,index) => {

                    
                    if(item.product.id == productId){

                        if(item.is_subscribed == 0){
                           
                            if(item.quantity > 1){
                                item.quantity = parseInt(item.quantity) - 1; 
                               
                               
                            }else{

                                all_cart.splice(index,1);
                                index--;
                                
                            }
                           
                        }

                    }

                });
            }
           

            if(state.cart_get_once[productId]){

                if(state.cart_get_once[productId].itemQuanity > 1){

                    // reduce the quantity the by 1
                  
                    updatedCartItem = new CartItem(

                        state.cart_get_once[productId].itemName,
                        state.cart_get_once[productId].isSubscribed,
                        state.cart_get_once[productId].subscryptionType,
                        parseInt(state.cart_get_once[productId].itemQuanity) - 1,
                        state.cart_get_once[productId].itemPrice,
                        parseFloat(state.cart_get_once[productId].sum) - parseFloat(state.cart_get_once[productId].itemPrice),
                    );

                    total_cart_amount = parseFloat(state.totalAmount) - parseFloat(state.cart_get_once[productId].itemPrice);
                    total_cart_count = parseInt(state.total_cart_count) - 1;
                    var cart_sum = state.get_once_cart_sum;
                    cart_sum = parseFloat(cart_sum) - parseFloat(state.cart_get_once[productId].itemPrice);
                  
                    
                   
                    return {
                        ...state ,
                        cart_get_once:{ ...state.cart_get_once,[productId]:updatedCartItem},
                        totalAmount: parseFloat(total_cart_amount),
                        total_cart_count:total_cart_count,
                        all_cart_products:[...all_cart],
                        get_once_cart_sum:cart_sum
        
                    }
                       
                
                   
                  
                }else{

                    updatedCartItem = {...state.cart_get_once};

                    total_cart_amount = parseFloat(state.totalAmount) - parseFloat(state.cart_get_once[productId].itemPrice);
                    total_cart_count = parseInt(state.total_cart_count) - 1;
                    var cart_sum = state.get_once_cart_sum;
                    get_once_cart_sum = parseFloat(cart_sum) - parseFloat(state.cart_get_once[productId].itemPrice);


                    delete updatedCartItem[productId];

                    return {
                        ...state ,
                        product_item:updatedCartItem,
                        totalAmount: parseFloat(total_cart_amount),
                        total_cart_count:total_cart_count,
                        all_cart_products:[...all_cart],
                        get_once_cart_sum:cart_sum
        
                    }
                   
                }

            
            }

        case GET_CART_API :

            var cart_products = [...action.cart_products];
            var cart_sum =0.00;
            console.log("cart sum",cart_sum);
            cart_products.map(item =>{

                if(item.is_subscribed == 0){
                    var price  ;
                    if(item.product.is_discount ==  1){
                        price = item.product.new_price;
                    }else{
                        price =  item.product.old_price;
                    }
                    cart_sum = parseFloat(cart_sum) + (parseInt(item.quantity) * parseFloat(price)) 
                }
            })
            return {
                ...state,
                all_cart_products:[...cart_products],
                get_once_cart_sum:cart_sum
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

        case REMOVE_ITEM_AFTER_PAYMENT_IN_CART :
            
            /// now remove this item from cart and cart_get_once 
            var all_cart = [...state.all_cart_products];
            var cart_once = {...state.cart_get_once};
            var get_once_product_ids =  Object.keys(cart_once);
            var cart_count = 0 ;
            
           

            for( var i = 0; i < all_cart.length; i++){ 
                if ( all_cart[i].is_subscribed === 0) {
                    cart_count = cart_count + all_cart[i].quantity;
                    all_cart.splice(i, 1); 
                  i--;
                }
             }
           
           

        
            return {
                ...state,
                total_cart_count:parseInt(state.total_cart_count) - parseInt(cart_count),
                cart_get_once:{},
                all_cart_products: [...all_cart],

            }
    

            default:
                    return state;


    }

   
}