import React from 'react';
import {View ,TouchableOpacity,Text,StyleSheet}  from 'react-native';

const CustomButton = (props) => {
    return(
        <View style={{width:'100%',alignItems:"center"}}>
            <TouchableOpacity 
                style={[buttonStyle.btn,props.customButttonStyle ]}
                onPress={props.onPressHandler}
                disabled={props.disabled}
                >
                <Text style={[buttonStyle.txtStyle,props.customTextStyle]}>
                    {props.text}
                </Text>
            </TouchableOpacity>

        </View>
       
    );
}

export default CustomButton;

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
        fontFamily:"roboto-bold",
        fontSize:17,
        color:'#808080'
    }


});