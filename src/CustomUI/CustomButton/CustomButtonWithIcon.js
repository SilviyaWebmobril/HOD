import React from 'react';
import {View ,TouchableOpacity,Text,StyleSheet}  from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomButtonWithIcon = (props) => {
    return(
        <View style={{width:'100%',alignItems:"center"}}>
            <TouchableOpacity 
                style={[buttonStyle.btn,props.customButttonStyle ]}
                onPress={props.onPressHandler}
                >
                <View style={{ flexDirection:"row",borderRadius:5}}>
                    <View style={[buttonStyle.viewIconStyle,props.customViewIconStyle]}>
                    {props.type == "awesome" ?  
                        <Icon name={props.iconName} color={props.iconColor} size={props.iconSize}/>
                    :
                        <MatIcon name={props.iconName} color={props.iconColor} size={props.iconSize}/>
                    }
                        
                    </View>
                    <View style={[buttonStyle.viewTextStyle,props.customViewTextStyle]}>
                     <Text style={[buttonStyle.btnText,props.custombtnText]}>{props.customText}</Text>
                    </View>
                   
                </View>

            </TouchableOpacity>

        </View>
       
    );
}

export default CustomButtonWithIcon;

const buttonStyle =  StyleSheet.create({

    btn:{
        width:"90%",
        height:50,
        borderColor: 'black',
        borderRadius:5,
        backgroundColor: '#48241e',
        justifyContent: 'center',
        alignItems: 'center',
       

    },
    txtStyle:{
        fontSize:17,
        fontWeight:'bold',
        color:'#808080'
    },
    viewIconStyle:{
        height:50,
        width:'20%',
        alignItems:'center',
        justifyContent:"center",
        borderColor: 'black',
       

       
    },
    viewTextStyle:{
        width:'80%',
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderColor: 'black',
      
    },
    btnText:{
        fontSize:17,color:'white'
    }


});