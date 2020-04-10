import React from 'react';
import {View ,Text, Image ,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import {useDispatch } from 'react-redux';
import { withNavigation } from 'react-navigation';

Cartbadge = (props) => {


    return(
    <TouchableOpacity 
        onPress={()=>props.nav.navigate("Cart",{ updateProductList1:(id,q) => props.updateStateQuantity(id,q)})}>
        <View style={styles.container}>
            
            <ImageBackground  source={props.img == 0 ? require('../../Assets/cartt.png') :  require('../../Assets/cart_white.png')} style={{width:25,height:25}}>
                {props.count > 0 
                    ?
                    <View style={props.img == 0 ? styles.circleBlack : styles.circleWhite}>
                        <Text style={props.img == 0 ? styles.countBlack : styles.countWhite}>{props.count}</Text>
                    </View>

                    :
                    <View/>
                }
               
            </ImageBackground>
        </View>
    
    </TouchableOpacity>
      
    );




}

export default withNavigation(Cartbadge);

const styles = StyleSheet.create({

    container:{
        marginRight:20
    },
    circleWhite:{
        position:'absolute',

        minWidth:27,
        minHeight:27,
        borderRadius:18,   //half radius will make it cirlce,
        backgroundColor:'white',
        position: 'absolute',
        top: 0,
        left: 20,
        right: 0,
        bottom: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
       },
       circleBlack:{
        position:'absolute',
        // maxWidth:40,
        // maxHeight:40,
        minWidth:27,
        minHeight:27,
        borderRadius:20,   //half radius will make it cirlce,
        backgroundColor:'black',
        position: 'absolute',
        top: 0,
        left: 20,
        right: 0,
        bottom: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
       },
    countBlack:{color:'white',fontSize:13,fontFamily:"Roboto-Light",},
    countWhite:{color:'black',fontSize:13,fontFamily:"Roboto-Light",}
})
