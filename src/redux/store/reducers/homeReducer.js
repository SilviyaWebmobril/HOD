import {HOME_SCREEN,
    UPDATE_GET_ALL_PRODUCTS_QUANTITY,
    CATEGORY_PRODUCTS,
    CLEAR_CATEGORY_PRODUCT,
    REMOVE_GET_ONCE_GET_ALL_PRODUCTS_QUANTITY,
    REMOVE_FROM_CART_SUBSCRIBED_PRODUCTS_HOME,
    ADD_TO_CART_SUBSCRIBED_PRODUCTS_HOME,
    ADD_TO_CART_GETONCE_PRODUCTS_HOME,
    REMOVE_FROM_CART_GETONCE_PRODUCTS_HOME,
    SEARCH_PRODUCTS,
    REMOVE_ITEM_AFTER_PAYMENT_IN_HOME,
    DELETE_SEARCH,
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


        case DELETE_SEARCH :
            var search_products = action.search_products;
            return {
                ...state,
                search_products:[...search_products]

            }

        case UPDATE_GET_ALL_PRODUCTS_QUANTITY :

            var products  =  [...state.getAllProducts];
          
            var updated_item = action.product_item;
            console.log("updated_item",updated_item);
          
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
                            item.subscribed.subscribed_qauntity = updated_item.quantity;

                        }else{
                            
                            item.subscribed.subscribed_qauntity = updated_item.quantity;
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
                                item.subscribed.subscribed_qauntity = updated_item.quantity;
    
                            }else{
                                
                                item.subscribed.subscribed_qauntity = updated_item.quantity;
                            }
                             
                            
                        }
    
                    }
    

                });
            }

            var category_products  =  [...state.category_products];
           
            console.log('get all category product item',updated_item);
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
                                item.subscribed.subscribed_qauntity = updated_item.quantity;
    
                            }else{
                                
                                item.subscribed.subscribed_qauntity = updated_item.quantity;
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

        case CLEAR_CATEGORY_PRODUCT :
            return{
                ...state,
                category_products:action.category_products
            }
           
        case REMOVE_GET_ONCE_GET_ALL_PRODUCTS_QUANTITY:

                var products  =  [...state.getAllProducts];
                
                
                products.forEach(item => {

                    if(item.id == action.payload.product_id){
                        console.log("item.subscribed.subscribed_qauntity ",item);
                        if(action.payload.type == 0){

                           
                                if(item.get_once.quantity > 1){
    
                                    item.get_once.quantity = parseInt(item.get_once.quantity) -1;
                                }else{
    
                                    item.get_once.itemOnCart = false;
                                    item.get_once.quantity = 1;
                                }
    
                           
                        }else{

                            if(item.subscribed.subscribed_qauntity > 1){
    
                                item.subscribed.subscribed_qauntity  = parseInt(item.subscribed.subscribed_qauntity ) -1;
                            }else{

                                item.subscribed.itemOnCart = false;
                                item.subscribed.subscribed_qauntity  = 1;
                            }
                        }
                       


                    }

                });

                var search_products  =  [...state.search_products];
                if(Array.isArray(state.search_products) && state.search_products.length){

                    
                
                
                    search_products.forEach(item => {
    
                        if(item.id == action.payload.product_id){
                            if(action.payload.type == 0){

                           
                                if(item.get_once.quantity > 1){
    
                                    item.get_once.quantity = parseInt(item.get_once.quantity) -1;
                                }else{
    
                                    item.get_once.itemOnCart = false;
                                    item.get_once.quantity = 1;
                                }
    
                           
                        }else{

                            if(item.subscribed.subscribed_qauntity > 1){
    
                                item.subscribed.subscribed_qauntity  = parseInt(item.subscribed.subscribed_qauntity ) -1;
                            }else{

                                item.subscribed.itemOnCart = false;
                                item.subscribed.subscribed_qauntity  = 1;
                            }
                        }
    
                        }
    
                    });

                }
                var category_products = [...state.category_products];
               
                if(Array.isArray(state.category_products) && state.category_products.length > 0){

                    
                    category_products.forEach(item => {
    
                            if(item.id == action.payload.product_id){
        
                                if(action.payload.type == 0){

                            
                                    if(item.get_once.quantity > 1){
        
                                        item.get_once.quantity = parseInt(item.get_once.quantity) -1;
                                    }else{
        
                                        item.get_once.itemOnCart = false;
                                        item.get_once.quantity = 1;
                                    }
        
                            
                            }else{

                                if(item.subscribed.subscribed_qauntity > 1){
        
                                    item.subscribed.subscribed_qauntity  = parseInt(item.subscribed.subscribed_qauntity ) -1;
                                }else{

                                    item.subscribed.itemOnCart = false;
                                    item.subscribed.subscribed_qauntity  = 1;
                                }
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
    
                                       
                                       
                                    }
                                }
                               
                
                          
                           
                        });
                    }else{

                        Object.assign(item,{subscribed:{itemOnCart:false,is_subscribed:null,subscription_type:null,quantity:1,subscribed_qauntity:null}});
                    }
                   
    
    
                 });

                
               
                
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

        case REMOVE_FROM_CART_GETONCE_PRODUCTS_HOME :

            var cart_products_getonce  =  [...state.cart_products_getonce];
            var product_id_removed =  action.product_id;
            var remove_item  = 0;
          
            cart_products_getonce.map((item,index) =>{

                if(item.product_id ==  product_id_removed ){

                    if(item.quantity > 1){

                        item.quantity = parseInt(item.quantity) - 1;
                       
                    }else{
                        remove_item = 1;

                    }
                }
            });

            if(remove_item == 1){

                for( var i = 0; i < cart_products_getonce.length; i++){ 

                    if(cart_products_getonce[i].product_id ==  product_id_removed ){
                        if(cart_products_getonce[i].quantity == 1){
                            cart_products_getonce.splice(i, 1); 
                            i--;
                           
                        }
                       
                    }
                   
                }
            }
           
           
            return{
                ...state,
                cart_products_getonce:[...cart_products_getonce],
            }

        case ADD_TO_CART_GETONCE_PRODUCTS_HOME :

                var cart_products_getonce  =  [...state.cart_products_getonce];
                var product_id_added =  action.product.product_id;
                var product =  action.product;
                var not_present = 0;
              
                cart_products_getonce.map((item,index) =>{
                    not_present = 0;
                    if(item.product_id ==  product_id_added ){
    
                        if(item.quantity > 1){
    
                            item.quantity = parseInt(item.quantity) + 1;
                            not_present = 1;
    
                        }
                    }
                });
                if(not_present == 0){
                    cart_products_getonce.push(product);
                }
               
                return{
                    ...state,
                    cart_products_getonce:[...cart_products_getonce],
                }
            

            case REMOVE_FROM_CART_SUBSCRIBED_PRODUCTS_HOME :

                    var cart_products_subscribed  =  [...state.cart_products_subscribed];
                    var product_id_removed =  action.product_id;
                    var remove_item = 0;
                    console.log("cart_products_subscribed product_id",product_id_removed);
                    console.log("cart_products_subscribed",cart_products_subscribed);
                    cart_products_subscribed.map((item,index) =>{
        
                        if(item.product_id ==  product_id_removed ){
        
                            if(item.quantity > 1){
        
                                item.quantity = parseInt(item.quantity) - 1;
        
                            }else{
        
                                remove_item =1;
                            }
                        }
                    });

                    if(remove_item == 1){

                        for( var i = 0; i < cart_products_subscribed.length; i++){ 
        
                            if(cart_products_subscribed[i].product_id ==  product_id_removed ){
                                if(cart_products_subscribed[i].quantity == 1){
                                    cart_products_subscribed.splice(i, 1); 
                                    i--;
                                   
                                }
                               
                            }
                           
                        }
                    }
                    console.log("cart_products_subscribed",cart_products_subscribed)
                    return{
                        ...state,
                        cart_products_subscribed:[...cart_products_subscribed],
                    }
            
            case ADD_TO_CART_SUBSCRIBED_PRODUCTS_HOME :
    
                    var cart_products_subscribed  =  [...state.cart_products_subscribed];
                    var product_id_added =  action.product.product_id;
                    var product =  action.product;
                    var not_present =0;
                    
                    cart_products_subscribed.map((item,index) =>{
                        not_present = 0;
                        if(item.product_id ==  product_id_added ){
        
                            if(item.quantity > 1){
        
                                item.quantity = parseInt(item.quantity) + 1;
                                not_present = 1;
        
                            }
                        }
                    });
                    if(not_present == 0){
                        cart_products_subscribed.push(product);
                    }
                    console.log("cart_products_subscribed",cart_products_subscribed)
                    return{
                        ...state,
                        cart_products_subscribed:[...cart_products_subscribed],
                    }
                
    
               





    
        default :
            return state;
    }

}