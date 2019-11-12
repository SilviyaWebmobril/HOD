import React,{useState,forwardRef, useRef, useImperativeHandle} from 'react';
import { StyleSheet, View, TextInput, Image} from 'react-native';

const CustomTextInputWithIcon = React.forwardRef((props,ref) => {


    const [txtInputValue ,setTextInputValue] = useState('');

    useImperativeHandle(ref, () => ({

        getInputTextValue (){

            return txtInputValue;
    
        }

    
    
      }));

      
    

    return (
      <View style={styles.container}>
       
        <View style={styles.SectionStyle}>

        <Image source={require('../../../Assets/search1.png')} style={styles.ImageStyle} />

          <TextInput
              style={{flex:1}}
              autoFocus = {props.isEditable}
              placeholder={props.placeholder}
              underlineColorAndroid="transparent"
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            placeholderTextColor={props.placeholderTextColor}
            onChangeText={(value)=> {props.onSearchPress(value)}}
            value={ props.searchValue}
            onSubmitEditing={props.onSubmitEditing}
            returnKeyType={props.returnKeyType}
          />

        </View>

      </View>
    );
  
});

export default  CustomTextInputWithIcon;


const styles = StyleSheet.create({

  container: {
  
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  
  },
  
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#ececec",
    borderWidth: .5,
    height: 40,
    borderRadius: 5 ,
    margin: 10
},

ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
},

});