import React from 'react';
import {View ,Text, Image ,StyleSheet,TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';


CartLayout = (props) => {
    
    return(

        <View style={styles.viewCartLayout}>
          <View style={styles.rowLeft}>
              
              <Text style={styles.textStyles}>{props.quantity} Item(s) | {'\u20B9'}{props.price}</Text>
          
          </View>
          <View style={styles.rowRight}>
          <TouchableOpacity 
            onPress={()=>props.navigation.navigate("ViewProfile")}>
                <View style={styles.rowRight}>

                    <Text style={styles.textStyles}>View Cart</Text>
                    <Image source={require('../../../Assets/cart_white.png')} style={{width:20,height:20,marginLeft:4}} />
                
                </View>
            
          </TouchableOpacity>
          </View>
         
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
      fontSize:12,
      fontWeight:"bold",
      color:"white"
  },
  rowRight:{
    flexDirection:"row",
    alignItems:"center",
    margin:20,
   
  },
  });