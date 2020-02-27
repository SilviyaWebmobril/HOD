import React,{useState,useEffect} from 'react';
import {View ,Text, Image ,StyleSheet,TouchableOpacity, Animated,Easing} from 'react-native';
import { withNavigation } from 'react-navigation';


CartLayout = (props) => {

    const [animatedValue,setAnimatedValue] = useState(new Animated.Value (0));

    let startAnimation = startAnimation =() => {
     
      
        animatedValue.setValue(0)
        Animated.timing(
            animatedValue,
            {
              toValue: 1,
              duration: 3000,
              easing: Easing.linear,
            }
          ).start(()=>{
           
              startAnimation();
          });

    } 


    // useEffect(() => {
    //     startAnimation();
      
      
      
    // }, []);;

    // animatedValue.interpolate({
    //     inputRange: [0, 0.3, 0.5,0.7,1],
    //     outputRange: [8, 10, 12,10,8]
    //   })
    
    
    return(

        <View style={styles.viewCartLayout}>
          <View style={styles.rowLeft}>
              
              <Animated.Text style={{fontFamily:"roboto-bold",fontSize:14,color:"white"}}>{props.quantity} Item(s) | {'\u20B9'}{props.price}</Animated.Text>
          
          </View>
          <TouchableOpacity 
            onPress={()=>props.navigation.navigate("Cart")}>
                <View style={styles.rowRight}>

                    <Text style={styles.textStyles}>View Cart</Text>
                    <Image source={require('../../Assets/cart_white.png')} style={{width:20,height:20,marginLeft:4}} />
                
                </View>
            
          </TouchableOpacity>
         
        </View> 
    );
}

export default withNavigation(CartLayout);


const styles = StyleSheet.create({

    viewCartLayout:{
      width:'100%',
      height:50,
      backgroundColor:'#3cb371',
      flexDirection:"row",
      position:"absolute",
      justifyContent:"space-between",
      bottom:0,
      left:0,
      right:0,

   
  },
  rowLeft:{
      flexDirection:"row",
      alignItems:"center",
      margin:20,
  },
  textStyles:{
      fontFamily:"Roboto-Light",
      fontSize:12,
      fontWeight:"bold",
      color:"white"
  },
  rowRight:{
    elevation:1,
    flexDirection:"row",
    alignItems:"center",
    margin:10,
    padding:4,
    borderRadius:2,
    borderWidth:1,
    borderColor:'white',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
   
  },
  });