import React ,{ useState, useEffect } from 'react';
import {View ,Text, StyleSheet, Image,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';






const ProductItem  = (props) => {

    const dispatch = useDispatch();
    const user_id  = useSelector(state => state.userdata.userdata.user_id);
    const cart =  useSelector(state => state.cart.product_item);

    var quantity;
    var price;
    var subscribed;
    var get_once;
    var subscribed_quantity;

    if('cart' in props.data){

        var [showQuantityButton , setQuantityHide] = useState(true);   
    
    }else{
        var [showQuantityButton , setQuantityHide] = useState(true);   
    
    }
    
   
    var [itemQuantity, setItemQuantity] = useState(20);
    var [itemSubscribedQuantity, setItemSubscribedQuantity] = useState(0);

    var [itemPrice, setItemPrice] = useState(0.00);
    var [is_get_once ,setOnce ]= useState(-1);
    var [is_subscribed ,isSubscribed ]= useState(-1);
    
   
console.log("cart size ",Object.keys(cart).length);

    useEffect(()=>{

        console.log("in use effect",props.data.id);

        if('cart' in props.data){
            setQuantityHide(props.data.cart.itemOnCart);
                     
        }

        
        if('cart' in props.data){

            if(props.data.cart.itemOnCart){

                if(props.data.cart.is_subscribed == 2){
        
        
                    if('get_once' in cart || 'subscribed' in cart){
        
                       
        
                     // these are needed in IncrementDecremnet Component 
                     console.log("qantity",cart.get_once[props.data.id].itemQuanity);
                      quantity = cart.get_once[props.data.id].itemQuanity;
                      price = cart.get_once[props.data.id].itemPrice;    
                      get_once = cart.get_once[props.data.id].isSubscribed;
                      subscribed = cart.subscribed[props.data.id].isSubscribed;
                      subscribed_quantity = cart.subscribed[props.data.id].itemQuanity;
        
                    setItemQuantity(quantity)
                    setItemPrice(price);
                    setItemSubscribedQuantity(subscribed_quantity)
                     setOnce(get_once);
                    isSubscribed(subscribed);
                      
        
                        
                    
                     
                    }
                    
            
                  
                   
                }else{
        
                    if('get_once' in cart){
        
                        quantity = cart.get_once[props.data.id].itemQuanity;
                        price = cart.get_once[props.data.id].itemPrice;
                        subscribed = cart.get_once[props.data.id].isSubscribed;
                        subscribed_quantity = 1;
                        console.log("is subs1111",quantity);
        
                                    
                            
                        setItemQuantity(quantity)
                        setItemPrice(price);
                        setItemSubscribedQuantity(subscribed_quantity)
                         setOnce(get_once);
                        isSubscribed(subscribed);
                  
                    
                    }
                  
        
                }
        
            }else{
                quantity = 1;
                price = props.data.new_price
                subscribed_quantity=1;
                // need to change the UI of INcrement Decrement
                subscribed = -1;
                get_once = -1;
        
                
                setItemQuantity(quantity)
                setItemPrice(price);
                setItemSubscribedQuantity(subscribed_quantity)
                 setOnce(get_once);
                isSubscribed(subscribed);
        
                  
        
        
            
            }
        

        }


     
    

   })

   
   

   

    console.log(" get once",is_get_once+ " id = ",props.data.id);
    console.log("quantity",itemQuantity+ " id = ",props.data.id);
    console.log("subscribed_quantity",itemSubscribedQuantity+ " id = ",props.data.id);
    console.log("is price",itemPrice+ " id = ",props.data.id);
    console.log("is subbs",is_subscribed+ " id = ",props.data.id);


      



    return(

        <View style={styles.container}>
            <Image  source={{uri:"https://www.webmobril.org/dev/hod/"+props.data.img}} style={{width:120, height:120,borderRadius:10}}/>
            <View style={styles.sectionRow}>
                <View style={styles.textColumnLeft}>
                    <Text style={styles.textProductname}>{props.data.name}</Text>
                    <Text style={{lineHeight:20}}>{'\u20B9'}{props.data.new_price}</Text>
                    <Text  style={{lineHeight:20}}>{props.data.quantity} left</Text>
                </View>
                {props.data.unit.name == "L"  ? 

                <View style={styles.textColumnLeft}>

                    {(showQuantityButton && is_get_once != -1)
                        ?
 
                        <CustomButton 
                         onPressHandler={()=> {
                             dispatch(cartActions.isLoading(true));
                             dispatch(cartActions.addToCart(props.data.id,props.data.new_price,user_id));
                             setQuantityHide(!showQuantityButton)
                        }}
                        // onPressHandler={()=> {
                        //     dispatch(cartActions.isLoading(true));
                        //     dispatch(cartActions.addToCart(props.data,user_id));
                            
                            
                        //   }}
                         customButttonStyle={{backgroundColor:"white",borderColor:"grey",borderWidth:1,borderRadius:2, height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                         customTextStyle={{ color:'grey',fontSize:12}}
                         text="Get Once"  />

                      
                    :

                        <IncrementDecrementButton product_id={props.data.id}  quantity={itemQuantity} price={itemPrice} />

                    }
                        
                
                   
                   {(!showQuantityButton && is_subscribed != -1 ) ?


                        <CustomButton 
                            customButttonStyle={{backgroundColor:"#FD8D45", height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                            customTextStyle={{ color:'white',fontSize:12}}
                            text="Subscribe"  />
                    
                    
                       
                   
                   :
                //    <IncrementDecrementButton product_id={props.data.id}  quantity={itemSubscribedQuantity} price={itemPrice} />
                <View/>
                  
                   }
                   
                </View>
                
                :

                //Add To Cart Button
                <View  style={styles.textColumnLeft}>
                  
                    <Text style={styles.textBorder}>250g</Text>
                   
                    <CustomButton 
                          onPressHandler={()=> {
                            dispatch(cartActions.isLoading(true));
                            dispatch(cartActions.addToCart(props.data,user_id))
                            dispatch(cartActions.cartCount());
                          }}
                         customButttonStyle={{backgroundColor:"#FD8D45",padding:3, height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                         customTextStyle={{ color:'white',fontSize:12}}
                         text="Add To Cart"  />
                </View>
               
                } 
               
            </View>
           
        </View>

    );

}
export default ProductItem;

const styles = StyleSheet.create({

    container:{
      
        flexDirection:"row",
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        //backgroundColor:"red"

    },
    sectionRow:{
        flexDirection:"row",
        flex:1,
        margin:10,
        
        alignSelf:"center"
       

    },
    textColumnLeft:{
        flexDirection:"column",
        alignSelf:"flex-start",
        flex:0.5,
        marginTop:10
        
    },
    textColumnRight:{
        flexDirection:"column",
        alignSelf:"flex-end",
        position: 'absolute', 
        textAlign:"right",
        flex:0.5,
       
        
    },
    textProductname:{
        fontSize:15,
        fontWeight:"bold",
        color:"black",
        lineHeight:30,
    },
    textBorder:{
        // borderColor:'grey',
        // borderRadius:1,
        // borderWidth:0.5,
        textAlign:"right",
        padding:2,
        lineHeight:20,
        marginTop:10,

    },
    milkRightContains:{

    }
    
});
