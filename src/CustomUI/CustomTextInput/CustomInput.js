import React,{Component} from 'react';
import {View,TextInput,Text,StyleSheet } from 'react-native';
import {validationService} from '../../validation/service';


export default class CustomInput extends Component{

    
   constructor(props){
       super(props);

       this.state = {

        inputs: {
            phone: {
              type: "phone",
              value: ""
            },
        }

       }

        this.onInputChange = validationService.onInputChange.bind(this);
        this.getFormValidation = validationService.getFormValidation.bind(this);
        
    }

    renderError(id) {
        const { inputs } = this.state;
        if (inputs[id].errorLabel) {
          return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
        }
        return null;
      }

   
   render(){
        return(

            <View style={[textInput.viewStyle,this.props.customTextInputView]}>
                <TextInput 
                   // ref={ref}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    style={[textInput.txtInput,
                            this.props.customTxtInputStyle]}
                    placeholder={this.props.placeholder}
                    keyboardType={this.props.keyboardType}
                    placeholderTextColor={this.props.placeholderTextColor}
                    onChangeText={(value)=> this.onInputChange("phone" ,value )}
                    value={this.state.inputs.phone.value}
                    onSubmitEditing={this.props.onSubmitEditing}
                    returnKeyType={this.props.returnKeyType}

                />
                  {this.renderError("phone")}
            </View>

        );
   }
    
}


const textInput = StyleSheet.create({

    viewStyle:{
        width:"90%",marginBottom:50,marginTop:10,alignItems:"center",
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