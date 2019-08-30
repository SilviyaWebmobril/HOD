import React ,{ useState } from 'react';
import {View ,Text, StyleSheet, Image,}  from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import IncrementDecrementButton from '../../CustomUI/CustomButton/IncrementDecremntButton';

const ProductItem  = (props) => {

    const [showQuantityButton , setQuantityHide] = useState(false);

  

    return(

        <View style={styles.container}>
            <Image  source={{uri:"https://www.webmobril.org/dev/hod/"+props.data.img}} style={{width:120, height:120,borderRadius:10}}/>
            <View style={styles.sectionRow}>
                <View style={styles.textColumnLeft}>
                    <Text style={styles.textProductname}>{props.data.name}</Text>
                    <Text style={{lineHeight:20}}>{props.data.new_price}</Text>
                    <Text  style={{lineHeight:20}}>{props.data.quantity} left</Text>
                </View>
                {props.data.unit.name == "L"  ? 

                <View style={styles.textColumnLeft}>

                    {showQuantityButton ? 
                        <IncrementDecrementButton />
                    :
                    <CustomButton 
                        onPressHandler={()=> setQuantityHide(!showQuantityButton)}
                         customButttonStyle={{backgroundColor:"white",borderColor:"grey",borderWidth:1,borderRadius:2, height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                         customTextStyle={{ color:'grey',fontSize:12}}
                         text="Get Once"  />
                    }
                   

                    <CustomButton 
                         customButttonStyle={{backgroundColor:"#FD8D45", height:30,marginTop:10,textAlign:"right",alignSelf:"flex-end",width:"70%"}}
                         customTextStyle={{ color:'white',fontSize:12}}
                         text="Subscribe"  />
                   
                </View>
                
                :
                <View  style={styles.textColumnLeft}>
                  
                    <Text style={styles.textBorder}>250g</Text>
                   
                    <CustomButton 
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
