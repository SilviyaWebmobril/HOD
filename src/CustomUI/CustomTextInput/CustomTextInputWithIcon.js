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

   
      <View style={[styles.container,props.container]}>
           
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
            <Text style={{fontFamily:'roboto-light',fontSize:16,color:"grey"}}>Search for products...</Text>
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
    marginLeft:15,
    marginRight:15,
   marginBottom:10,
   borderRadius: 7,
   backgroundColor:"white",
  
  },
  
  SectionStyle: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#ececec",
    height: 40,

    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#9F9F9F',
    borderBottomWidth: 1,
    shadowColor: 'grey',
    shadowOpacity: 1.5,
    shadowRadius: 4,
    
  
   
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