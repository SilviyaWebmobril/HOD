import React,{useState,forwardRef, useRef, useImperativeHandle} from 'react';
import { StyleSheet, View, TextInput, Image,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomTextInputWithIcon = React.forwardRef((props,ref) => {


    const [txtInputValue ,setTextInputValue] = useState('');
    const [showTextInput ,setTextInput] = useState(false);

    useImperativeHandle(ref, () => ({

        getInputTextValue (){

            return txtInputValue;
    
        }

    
    
      }));

      
    

    return (

   
      <View style={styles.container}>
           
      {props.showTextInput 
      ?
        <View style={styles.SectionStyle}>

        <Image source={require('../../Assets/search1.png')} style={styles.ImageStyle} />

          <TextInput
              style={{flex:1,fontFamily:"roboto-light",}}
              autoFocus = {props.isEditable}
              placeholder={props.placeholder}
              underlineColorAndroid="transparent"
              placeholder={props.placeholder}
              keyboardType={props.keyboardType}
              secureTextEntry={props.secureTextEntry}
              placeholderTextColor={props.placeholderTextColor}
              onFocus={props.onFocus}
              onChangeText={(value)=> {props.onSearchPress(value)}}
              value={ props.searchValue}
              onSubmitEditing={props.onSubmitEditing}
              returnKeyType={props.returnKeyType}
          />

        </View>
      :
      <TouchableOpacity onPress={() => {props.textpress()}}>
        <View style={styles.SectionStyle}>

        <Image source={require('../../Assets/search1.png')} style={styles.ImageStyle} />

          <View  style={{fontFamily:"roboto-light",width:"90%"}}>
            <Text>Serch for products...</Text>
          </View>
        
        </View>
      </TouchableOpacity>
     
      }
       
      

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