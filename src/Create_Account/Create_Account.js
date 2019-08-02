import React, { Component } from 'react';
import axios  from 'axios';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import * as HOC from '../HOC/mainHoc';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomButtonWithIcon from '../CustomUI/CustomButton/CustomButtonWithIcon';
import Create_AccountStyle from './Create_AccountStyle';
import CustomLogo from '../CustomUI/Logo/CustomLogo';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import { ScrollView } from 'react-native-gesture-handler';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);

export default class Create_Account extends Component {
    
    static navigationOptions = ({ navigation }) => ({
        title: 'CREATE ACCOUNT',
        headerStyle: {
            height: 60,
            backgroundColor: '#FD8D45',
        },
        headerTitleStyle: {
            color: 'white',
            alignSelf: 'center',
            textAlign: 'center',
            flex: 1,
            fontSize: 17,
        },
        headerTintColor: 'white',
        headerRight: (<View></View>)
    });
    onLogin = () => {
        //this.props.navigation.navigate('Login');
    };
    onContinue = ()=>{
        this.props.navigation.navigate('SearchLocation');
    }
    state = { 
        isFocusedName: false,
        isFocusedEmail: false,
        isFocusedPassword: false, 
        isFocusedMobile:false,
        isFocusedCode:false,
     };//isFocused1 is for textinput1, isFocused2 is for textinput2, isFocused3 is for textinput3
   
    render() {
        
        return (
             <FullSCreenSpinnerAndDismissKeyboardView style={Create_AccountStyle.container}>

                
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    <View>
                        <CustomLogo />
                        <View style={Create_AccountStyle.Create_Accountbottom}>
                      
                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Name*
                                </Text>
                            </View>   
                            <CustomTextInput 
                                onFocus={()=>this.setState({isFocusedName:true})}
                                onBlur={()=>this.setState({isFocusedName:false})}
                                customTxtInputStyle={[Create_AccountStyle.customtxtInput,{
                                    borderColor: this.state.isFocusedName
                                        ? '#FD8D45'
                                        : 'black',
                                    borderWidth: this.state.isFocusedName
                                    ? 1.5 
                                    : 1,
                                    }]}
                                placeholder="Enter Name" placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            />

                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Email*
                                </Text>
                            </View>   
                            <CustomTextInput 
                                onFocus={()=>this.setState({isFocusedEmail:true})}
                                onBlur={()=>this.setState({isFocusedEmail:false})}
                                customTxtInputStyle={[Create_AccountStyle.customtxtInput,{
                                    borderColor: this.state.isFocusedEmail
                                        ? '#FD8D45'
                                        : 'black',
                                    borderWidth: this.state.isFocusedEmail
                                    ? 1.5 
                                    : 1,
                                    }]}
                                placeholder="Enter Name" placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            />

                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Password*
                                </Text>
                            </View>   
                            <CustomTextInput 
                                onFocus={()=>this.setState({isFocusedPassword:true})}
                                onBlur={()=>this.setState({isFocusedPassword:false})}
                                customTxtInputStyle={[Create_AccountStyle.customtxtInput,{
                                    borderColor: this.state.isFocusedPassword
                                        ? '#FD8D45'
                                        : 'black',
                                    borderWidth: this.state.isFocusedPassword
                                    ? 1.5 
                                    : 1,
                                    }]}
                                placeholder="Enter Name" placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            />
                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Mobile*
                                </Text>
                            </View>
                            <CustomTextInput 
                                onFocus={()=>this.setState({isFocusedMobile:true})}
                                onBlur={()=>this.setState({isFocusedMobile:false})}
                                customTxtInputStyle={[Create_AccountStyle.customtxtInput,{
                                    borderColor: this.state.isFocusedMobile
                                        ? '#FD8D45'
                                        : 'black',
                                    borderWidth: this.state.isFocusedMobile
                                    ? 1.5 
                                    : 1,
                                    }]}
                                placeholder="Enter mobile number" placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                            />
                        
                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Refferal Code(optional)*Terms Apply
                                </Text>
                            </View>
                            <CustomTextInput 
                                onFocus={()=>this.setState({isFocusedCode:true})}
                                onBlur={()=>this.setState({isFocusedCode:false})}
                                customTxtInputStyle={[Create_AccountStyle.customtxtInput,{
                                    borderColor: this.state.isFocusedCode
                                        ? '#FD8D45'
                                        : 'black',
                                    borderWidth: this.state.isFocusedCode
                                    ? 1.5 
                                    : 1,
                                    marginBottom:0,
                                    }]}
                                placeholder="Enter Refferal Code" placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                            />
                    
                            {/* <View style={{marginTop:0,width:'90%',flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:30}}> */}
                        
                                <CustomButton onPressHandler={()=>this.onContinue()} text="LOGIN" customTextStyle={{ color:'white'}}/>
                                
                               
                                <View style={{width:'100%',justifyContent:'center',alignItems: 'center',margin:20}}> 
                                    <Text style={{color:'#808080',margin:5,fontWeight: 'bold',fontSize: 17,}}>OR</Text>
                                </View>
                                <CustomButtonWithIcon 
                                    customViewIconStyle={{backgroundColor:"#2F4F93",borderTopLeftRadius: 5,borderBottomLeftRadius: 5,}} 
                                    iconName="facebook" iconSize={25}
                                    iconColor="white"
                                    onPressHandler={()=> this.onLogin()} 
                                    customViewTextStyle={{backgroundColor:"#3B5998", borderBottomRightRadius: 5,borderTopRightRadius: 5,fontSize:15}}
                                    customText="REGISTER WITH FACEBOOK"
                                    /> 
                               
                            {/* </View> */}
                        </View>
                    </View>
                  
                {/* </ScrollView>    */}
             
                  
           
             </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}