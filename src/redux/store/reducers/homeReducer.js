import {HOME_SCREEN,
    UPDATE_GET_ALL_PRODUCTS_QUANTITY,
    CATEGORY_PRODUCTS,
    REMOVE_GET_ONCE_GET_ALL_PRODUCTS_QUANTITY,
    SEARCH_PRODUCTS,
    REMOVE_ITEM_AFTER_PAYMENT_IN_HOME
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
               
                products.forEach(item=>{
                    var itemOnCart = false;
                    
                    if(cart_products_getonce.length >0 && cart_products_subscribed.length > 0){

                        Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                        Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                        

                    }
                    
                    if(cart_products_getonce.length > 0){
    
    
                        cart_products_getonce.forEach(cart_item =>{
    
                           
                            if(!itemOnCart){

                                if(parseInt(cart_item.product.id) === item.id){

                                    chk_id.push(item.id);
                                    console.log("in if",cart_item);
                                    Object.assign(item,{get_once:{
                                    
                                    itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                                    subscription_type:cart_item.subscription_type,quantity:cart_item.quantity,}});
                                    itemOnCart = true;
                               
                                
                               
                                }else{

                                  
                                
                                    Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                   // Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                    
                                    console.log("in else");
                                }
            
                            }
                                
                              
                          
                           
                        });
                    }else{

                        Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                    }

                    if(cart_products_subscribed.length > 0){
    
                       
                        var itemOnCart = false;
    
                        cart_products_subscribed.forEach(cart_item =>{
    
                           
                                if(!itemOnCart){

                                    if(parseInt(cart_item.product.id) === item.id){


                                        Object.assign(item,{subscribed:{
                                            
                                            itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                                            subscription_type:cart_item.subscription_type,subscribed_qauntity:cart_item.quantity
                                        }});
                                            itemOnCart = true;
                                       
                                        
                                       
                                    }else{

                                        Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                        itemOnCart = false;
    
                                     
                                    }
                                }
                               
                
                          
                           
                        });
                    }else{

                        Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                    }
                   
    
    
                 });

           
            return {
               ...state,
                product:[...action.home_products.product_categories],
                banners:[...action.home_products.banners],
                getAllProducts:[...products],
                cart_products_getonce:[...action.home_products.cart_products_getonce],
                cart_products_subscribed:[...action.home_products.cart_products_subscribed]

            }

        case UPDATE_GET_ALL_PRODUCTS_QUANTITY :

            var products  =  [...state.getAllProducts];
          
            var updated_item = action.product_item;
          
            /// updating all list product 
            products.forEach(item => {

                if(item.id ===  updated_item.product_id){
                
                    if(updated_item.is_subscribed === 0){
                      

                        if(!item.get_once.itemOnCart){

                            item.get_once.itemOnCart = true;
                            item.get_once.quantity = updated_item.quantity;

                        }else{

                            item.get_once.quantity = updated_item.quantity;
                        }
                        
                      
                        

                      
                    }else{

                      

                        if(!item.subscribed.itemOnCart){

                            item.subscribed.itemOnCart = true;
                            item.subscribed.quantity = updated_item.quantity;

                        }else{

                            item.subscribed.quantity = updated_item.quantity;
                        }
                         
                        
                    }

                }

            });

            // checking for serach_product state if products are present the iterate through them
            var search_products  =  [...state.search_products];
          
            if(Array.isArray(state.search_products) && state.search_products.length){

               
                var updated_item = action.product_item;
              
                /// updating all list product 
                search_products.forEach(item => {

                    if(item.id ===  updated_item.product_id){
                    
                        if(updated_item.is_subscribed === 0){
                          
    
                            if(!item.get_once.itemOnCart){
    
                                item.get_once.itemOnCart = true;
                                item.get_once.quantity = updated_item.quantity;
    
                            }else{
    
                                item.get_once.quantity = updated_item.quantity;
                            }
                            
                          
                            
    
                          
                        }else{
    
                          
    
                            if(!item.subscribed.itemOnCart){
    
                                item.subscribed.itemOnCart = true;
                                item.subscribed.quantity = updated_item.quantity;
    
                            }else{
    
                                item.subscribed.quantity = updated_item.quantity;
                            }
                             
                            
                        }
    
                    }
    

                });
            }

            var category_products  =  [...state.category_products];

            console.log('get all category product',category_products);
            if(Array.isArray(state.category_products) && state.category_products.length){
                category_products.forEach(item => {

                    if(item.id ===  updated_item.product_id){
                    
                        if(updated_item.is_subscribed === 0){
                        

                            if(!item.get_once.itemOnCart){

                                item.get_once.itemOnCart = true;
                                item.get_once.quantity = updated_item.quantity;

                            }else{

                                item.get_once.quantity = updated_item.quantity;
                            }
                            
                        
                        }else{

                        
                            if(!item.subscribed.itemOnCart){

                                item.subscribed.itemOnCart = true;
                                item.subscribed.quantity = updated_item.quantity;

                            }else{

                                item.subscribed.quantity = updated_item.quantity;
                            }
                            
                            
                        }

                    }

                });
            }
       

            return{
                ...state,
                getAllProducts:[...products],
                category_products:[...category_products],
                search_products:[...search_products]
            
            }
           
        case REMOVE_GET_ONCE_GET_ALL_PRODUCTS_QUANTITY:

                var products  =  [...state.getAllProducts];
                
                
                products.forEach(item => {

                    if(item.id == action.product_id){

                        if(item.get_once.quantity > 1){

                            item.get_once.quantity = (item.get_once.quantity) -1;
                        }else{

                            item.get_once.itemOnCart = false;
                            item.get_once.quantity = 1;
                        }

                    }

                });

                var search_products  =  [...state.search_products];
                if(Array.isArray(state.search_products) && state.search_products.length){

                    
                
                
                    search_products.forEach(item => {
    
                        if(item.id == action.product_id){
    
                            if(item.get_once.quantity > 1){
    
                                item.get_once.quantity = item.get_once.quantity -1;
                            }else{
    
                                item.get_once.itemOnCart = false;
                                item.get_once.quantity = 1;
                            }
    
                        }
    
                    });

                }
                var category_products = [...state.category_products];
               
                if(Array.isArray(state.category_products) && state.category_products.length > 0){

                    
                    category_products.forEach(item => {
    
                        if(item.id == action.product_id){
    
                            if(item.get_once.quantity > 1){
    
                                item.get_once.quantity = item.get_once.quantity - 1;
                            }else{
    
                                item.get_once.itemOnCart = false;
                                item.get_once.quantity = 1;
                            }
    
                        }
    
                    });
    
                    
                }
               
                return{
                    ...state,
                    getAllProducts:[...products],
                    search_products:[...search_products],
                    category_products: [...category_products],
    
                }

              


        case CATEGORY_PRODUCTS : 
                
            var category_products = [...action.category_products];
            var cart_products_getonce = [...state.cart_products_getonce];
            var cart_products_subscribed = [...state.cart_products_subscribed];

               
            category_products.forEach(item=>{
                var itemOnCart = false;
                
                if(cart_products_getonce.length >0 && cart_products_subscribed.length > 0){

                    Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                    Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                    

                }
                
                if(cart_products_getonce.length > 0){


                    cart_products_getonce.forEach(cart_item =>{

                       
                        if(!itemOnCart){

                            if(parseInt(cart_item.product.id) === item.id){

                            
                                
                                Object.assign(item,{get_once:{
                                
                                itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                                subscription_type:cart_item.subscription_type,quantity:cart_item.quantity,}});
                                itemOnCart = true;
                           
                            
                           
                            }else{

                              
                            
                                Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                
                               
                            }
        
                        }
                            
                          
                      
                       
                    });
                }else{

                    Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                }

                if(cart_products_subscribed.length > 0){

                   
                    var itemOnCart = false;

                    cart_products_subscribed.forEach(cart_item =>{

                       
                            if(!itemOnCart){

                                if(parseInt(cart_item.product.id) === item.id){


                                    Object.assign(item,{subscribed:{
                                        
                                        itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                                        subscription_type:cart_item.subscription_type,subscribed_qauntity:cart_item.quantity
                                    }});
                                        itemOnCart = true;
                                   
                                    
                                   
                                }else{

                                    Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                    itemOnCart = false;

                                   
                                   
                                }
                            }
                           
            
                      
                       
                    });
                }else{

                    Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                }
               


             });




            return{
            ...state,
            category_products:[...category_products]

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
                var cart_products_getonce  = [...state.cart_products_getonce];
               
                var cart_products_subscribed  = [...state.cart_products_subscribed];
                var chk_id =[];

                products.forEach(item=>{
                    var itemOnCart = false;
                    
                    if(cart_products_getonce.length >0 && cart_products_subscribed.length > 0){

                        Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                        Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                        

                    }
                    
                    if(cart_products_getonce.length > 0){
    
    
                        cart_products_getonce.forEach(cart_item =>{
    
                           
                            if(!itemOnCart){

                                if(parseInt(cart_item.product.id) === item.id){

                                    chk_id.push(item.id);
                                   
                                    Object.assign(item,{get_once:{
                                    
                                    itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                                    subscription_type:cart_item.subscription_type,quantity:cart_item.quantity,}});
                                    itemOnCart = true;
                               
                                
                               
                                }else{

                                  
                                
                                    Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                    
                                   
                                }
            
                            }
                                
                              
                          
                           
                        });
                    }else{

                        Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                    }

                    if(cart_products_subscribed.length > 0){
    
                       
                        var itemOnCart = false;
    
                        cart_products_subscribed.forEach(cart_item =>{
    
                           
                                if(!itemOnCart){

                                    if(parseInt(cart_item.product.id) === item.id){


                                        Object.assign(item,{subscribed:{
                                            
                                            itemOnCart:true,is_subscribed:cart_item.is_subscribed,
                                            subscription_type:cart_item.subscription_type,subscribed_qauntity:cart_item.quantity
                                        }});
                                            itemOnCart = true;
                                       
                                        
                                       
                                    }else{

                                        Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                        itemOnCart = false;
    
                                        // if(chk_id.includes(item.id)){
    
                                        //     Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                        //     itemOnCart = false;
                                        // }else{
                                        //     Object.assign(item,{get_once:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                                        // }
                                      
                                        
                                       
                                    }
                                }
                               
                
                          
                           
                        });
                    }else{

                        Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                    }
                   
    
    
                 });

                 /// till now for search products all the get_once and  subcribed object is maintained 
                 // now filter this data with get_all_products

                //  var get_all_products =  [...state.getAllProducts];
                //  var tmp_array = [...state.tmp_array];
                //  var filter_arr = [...state.getAllProducts];
                //  get_all_products.forEach(item =>{

                //   var found = false;

                //     products.forEach(search_item => {
                      
                      

                //             if(item.id !== search_item.id){

                //                 // adding this data to tmp array 
                //                 // and removing from here
                //                 tmp_array.push(item); 
                //                 found =true;
                            
    
                //             }
                        
                        
                //         filter_arr = filter_arr.filter(value => {
                            
                //            return value.id !== search_item.id
                //         })

                //     })

                //  })

                //  console.log("tmp_array",tmp_array);

                //  console.log("search products reducrrr",get_all_products);
               
                
                return {
                ...state,
                    search_products:[...products],
                    // getAllProducts:[...get_all_products],
                    // tmp_array:[...tmp_array]

                

                }


            }


        case REMOVE_ITEM_AFTER_PAYMENT_IN_HOME :

            // update all products item 
            var products = [...state.getAllProducts];
            var ids = [...action.product_ids];

           
            if(products.length >=  action.products_ids){

                products.map(value => {

                    ids.map(item =>{
                        if(value.id == item){

                           if(value.get_once.itemOnCart){

                                value.get_once.itemOnCart = false;
                                value.get_once.is_subscribed = null;
                                value.get_once.subscription_type = null;
                                value.get_once.quantity = 1;
                                value.get_once.subscribed_qauntity =  null
                           }
                         


                        }
                

                    });

                 
                })
            }else{


                ids.map(item => {

                    products.map(value =>{
                        if(value.id == item){

                           if(value.get_once.itemOnCart){

                                value.get_once.itemOnCart = false;
                                value.get_once.is_subscribed = null;
                                value.get_once.subscription_type = null;
                                value.get_once.quantity = 1;
                                value.get_once.subscribed_qauntity =  null;
                           }
                         


                        }
                

                    });
                });

            }


            // for search products 

            var search_prod =  [...state.search_products];
            if(Array.isArray(state.search_products) && state.search_products.length){

                if(search_prod.length >=  action.products_ids){

                    search_prod.map(value => {

                        ids.map(item =>{
                            if(value.id == item){
    
                               if(value.get_once.itemOnCart){
    
                                    value.get_once.itemOnCart = false;
                                    value.get_once.is_subscribed = null;
                                    value.get_once.subscription_type = null;
                                    value.get_once.quantity = 1;
                                    value.get_once.subscribed_qauntity =  null
                               }
                             
    
    
                            }
                    
    
                        });
    
                     
                    })
                }else{

                    ids.map(item => {

                        search_prod.map(value =>{
                            if(value.id == item){
    
                               if(value.get_once.itemOnCart){
    
                                    value.get_once.itemOnCart = false;
                                    value.get_once.is_subscribed = null;
                                    value.get_once.subscription_type = null;
                                    value.get_once.quantity = 1;
                                    value.get_once.subscribed_qauntity =  null;
                               }
                             
    
    
                            }
                    
    
                        });
                    });

                }

            }

            // category products 
            

            return {

                ...state,
                all_products:[...products],


            }
          
            

               





    
        default :
            return state;
    }

}