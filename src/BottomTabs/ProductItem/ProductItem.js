import React ,{ useState } from 'react';
import {View ,Text, StyleSheet, Image,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../redux/store/actions/cartAction';




const ProductItem  = (props) => {

    const dispatch = useDispatch();
    const user_id  = useSelector(state => state.userdata.userdata.user_id);
    const cart =  useSelector(state => state.cart.product_item);

    let quantity;
    let price;
    let subscribed;
   
  
        // if this product is already present in users cart then

        if(props.data.cart.itemOnCart){

            let keys =  Object.keys(cart);
            for(var i=0 ; i< keys.length ;i++  ){
        
                // then chk for the prod in cart that wheatther it is subscribed or not then get the values 

                    if(props.data.cart.is_subscribed == 0){


                        // if((props.data.id+"-"+"0" in cart)){
                

                            // these are needed in IncrementDecremnet Component 
                            quantity = cart[props.data.id+"-"+"0"].itemQuanity;
                            price = cart[props.data.id+"-"+"0"].itemPrice;
                            subscribed = cart[props.data.id+"-"+"0"].isSubscribed;
                    
                            console.log("is subs0000",quantity);
                            
                        //  }

                    }else{

                        
                            // these are needed in IncrementDecremnet Component 
                            quantity = cart[props.data.id+"-"+"1"].itemQuanity;
                            price = cart[props.data.id+"-"+"1"].itemPrice;
                            subscribed = cart[props.data.id+"-"+"1"].isSubscribed;
                            
                    
                            console.log("is subs111",quantity);
                            
                    }
                 

            }   

        }else{

            quantity = 1;
            price = props.data.new_price
    
            // need to change the UI of INcrement Decrement
            subscribed = props.data.cart.is_subscribed
        }







        // if((props.data.id+"-"+"0" in cart)){
        

        //     // these are needed in IncrementDecremnet Component 
        //      quantity = cart[props.data.id+"-"+"0"].itemQuanity;
        //      price = cart[props.data.id+"-"+"0"].itemPrice;
        //      subscribed = cart[props.data.id+"-"+"0"].isSubscribed;
     
        //      console.log("is subs0000",quantity);
            
        //  }else if(props.data.id+"-"+"1" in cart){
     
        //      // these are needed in IncrementDecremnet Component 
        //      quantity = cart[props.data.id+"-"+"1"].itemQuanity;
        //      price = cart[props.data.id+"-"+"1"].itemPrice;
        //      subscribed = cart[props.data.id+"-"+"1"].isSubscribed;
        //      console.log("is subs1111",quantity);
           
        //  }else{
     
        //      quantity = 1;
        //      price = props.data.new_price
     
        //      // need to change the UI of INcrement Decrement
        //      subscribed = props.data.cart.is_subscribed
        //  }
     

    
   
  

    let [itemQuantity, setItemQuantity] = useState(quantity);
    console.log("is subs",quantity);
    let [itemPrice, setItemPrice] = useState(price);
    let [is_subscribed ,isSubscribed ]= useState(subscribed);
    
   
    let [showQuantityButton , setQuantityHide] = useState(props.data.cart.itemOnCart);



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

                    {(!showQuantityButton && is_subscribed != 2)
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
                        
                
                   
                   {(!showQuantityButton && is_subscribed != 1 ) ?


                        <CustomButton 
                            customButttonStyle={{backgroundColor:"#FD8D45", height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                            customTextStyle={{ color:'white',fontSize:12}}
                            text="Subscribe"  />
                    
                    
                       
                   
                   :
                   <IncrementDecrementButton product_id={props.data.id}  quantity={itemQuantity} price={itemPrice} />
                  
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
