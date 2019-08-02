import React,{useState,forwardRef, useRef, useImperativeHandle} from 'react';
import {View,TextInput,Text,StyleSheet } from 'react-native';


const CustomTextInput = React.forwardRef((props,ref) => {

    const [txtInputValue ,setTextInputValue] = useState('');

    console.log("textInput ",txtInputValue);

    useImperativeHandle(ref, () => ({

        getInputTextValue (){

            return txtInputValue;
    
        }

        

      
    
      }));

      
    
    
   
    return(

        <View style={[textInput.viewStyle,props.customTextInputView]}>
            <TextInput 
                ref={ref}
                onBlur={props.onBlur}
                textAlignVertical={'top'}
                onFocus={props.onFocus}
                style={[textInput.txtInput,
                        props.customTxtInputStyle]}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                placeholderTextColor={props.placeholderTextColor}
                onChangeText={(value)=> {setTextInputValue(value)}}
                value={txtInputValue}
                onSubmitEditing={props.onSubmitEditing}
                returnKeyType={props.returnKeyType}
                multiline={props.multiline}

            />
        </View>

    );
})

export default CustomTextInput;

const textInput = StyleSheet.create({

    viewStyle:{
        width:"100%",marginBottom:50,marginTop:10,alignItems:"center",
    },

    txtInput: {
        width:'90%',
        padding:10,
        borderColor: 'gray',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
       
      },
})