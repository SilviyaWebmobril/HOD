import React ,{ Component } from 'react';
import {View ,Text, StyleSheet, Image,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import { isTemplateElement } from '@babel/types';

const ProductItem  = (props) => {

    return(

        <View style={styles.container}>
            <Image  source={props.data.image_url} style={{width:120, height:120,borderRadius:10}}/>
            <View style={styles.sectionRow}>
                <View style={styles.textColumnLeft}>
                    <Text style={styles.textProductname}>Kaju Katli</Text>
                    <Text style={{lineHeight:20}}>500</Text>
                    <Text  style={{lineHeight:20}}>3 left</Text>
                </View>
                <View  style={styles.textColumnLeft}>
                    
                    <Text style={styles.textBorder}>250g</Text>
                   
                    <CustomButton 
                         customButttonStyle={{backgroundColor:"#FD8D45", height:35,marginTop:10}}
                         customTextStyle={{ color:'white',fontSize:12}}
                         text="Add To Cart"  />
                </View>
               
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

    }
    
});
