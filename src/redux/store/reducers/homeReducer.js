import {HOME_SCREEN,SEARCH_PRODUCTS,DELETE_SEARCH
 
} from '../actions/types';

// here for home screen maintaining search products list in other array so that can handle delete press

const initialState = {

    product:[],
    banners:[],
    getAllProducts:[],
    error :"",
    isLoading:true,
    all_products:[],
    cart_products_getonce:[],
    cart_products_subscribed:[],
    category_products:[],
    tmp_array:[],
    search_products: [],


}


export default (state = initialState ,action) => {

    switch(action.type) {

        case HOME_SCREEN :

                
                var products = [...action.home_products.all_products];
                var cart_products_getonce  = [...action.home_products.cart_products_getonce];
               
                var cart_products_subscribed  = [...action.home_products.cart_products_subscribed];
                var chk_id =[];
               
              
            return {
               ...state,
               // product:[...action.home_products.product_categories],
               // banners:[...action.home_products.banners],
               // getAllProducts:[...products],
                cart_products_getonce:[...action.home_products.cart_products_getonce],
                cart_products_subscribed:[...action.home_products.cart_products_subscribed]

            }
            case DELETE_SEARCH :
                var search_products = action.search_products;
                return {
                    ...state,
                    search_products:[...search_products]
    
            }
            case SEARCH_PRODUCTS :

                if(action.error){
    
                    return{
                        ...state,
                        search_products:[],
                       // getAllProducts:[...state.tmp_array],
                    }
    
                }else if(Array.isArray(action.search_products) && action.search_products.length){
    
                    var products = [...action.search_products];
                    // var cart_products_getonce  = [...state.cart_products_getonce];
                   
                    // var cart_products_subscribed  = [...state.cart_products_subscribed];
                    // var chk_id =[];
    
                    // products.forEach(item=>{
                    //     var itemOnCart = false;
                        
                    //     if(cart_products_getonce.length >0 && cart_products_subscribed.length > 0){
    
                    //         Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:0,subscribed_qauntity:null}});
                    //         Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:0,subscribed_qauntity:null}});
                            
    
                    //     }
                        
                    //     if(cart_products_getonce.length > 0){
        
        
                    //         cart_products_getonce.forEach(cart_item =>{
        
                               
                    //             if(!itemOnCart){
    
                    //                 if(parseInt(cart_item.product.id) === item.id){
    
                    //                     chk_id.push(item.id);
                                       
                    //                     Object.assign(item,{get_once:{
                                        
                    //                     itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                    //                     subscription_type:cart_item.subscription_type,quantity:cart_item.quantity,}});
                    //                     itemOnCart = true;
                                   
                                    
                                   
                    //                 }else{
    
                                      
                                    
                    //                     Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:0,subscribed_qauntity:null}});
                                        
                                       
                    //                 }
                
                    //             }
                                    
                                  
                              
                               
                    //         });
                    //     }else{
    
                    //         Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:0,subscribed_qauntity:null}});
                    //     }
    
                    //     if(cart_products_subscribed.length > 0){
        
                           
                    //         var itemOnCart = false;
        
                    //         cart_products_subscribed.forEach(cart_item =>{
        
                               
                    //                 if(!itemOnCart){
    
                    //                     if(parseInt(cart_item.product.id) === item.id){
    
    
                    //                         Object.assign(item,{subscribed:{
                                                
                    //                             itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                    //                             subscription_type:cart_item.subscription_type,subscribed_qauntity:cart_item.quantity
                    //                         }});
                    //                             itemOnCart = true;
                                           
                                            
                                           
                    //                     }else{
    
                    //                         Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:0,subscribed_qauntity:null}});
                    //                         itemOnCart = false;
        
                                           
                                           
                    //                     }
                    //                 }
                                   
                    
                              
                               
                    //         });
                    //     }else{
    
                    //         Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:0,subscribed_qauntity:null}});
                    //     }
                       
        
        
                    //  });
    
                    
                   
                    
                    return {
                    ...state,
                        search_products:[...products],
                        // getAllProducts:[...get_all_products],
                        // tmp_array:[...tmp_array]
    
                    
    
                    }
    
    
                }
    


        default :
            return state;
    }

}