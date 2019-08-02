import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    
    Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as HOC from '../HOC/mainHoc';

import CustomLogo from '../CustomUI/Logo/CustomLogo';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import LoginEmailStyle from './LoginEmailStyle';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);


export default class LoginEmail extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Login With Email',
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
    onSubmit = () => {
      
        this.props.navigation.navigate('Create_Account');
    };

    onLoginHandler = () =>{
        this.props.navigation.navigate('Bottomtabs');
    }
    constructor(props) {
        super(props);
        this.state = {
             seconds: 60 ,
             isFocusedEmail:false,
             isFocusedPassword:false,
            
        
        };
       
      }
     
    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView style={LoginEmailStyle.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom:20}}>

                    <CustomLogo />
                    {/* <View style={OTPStyle.bottom}>
                    
                    
                    </View> */}
                    <View style={{marginLeft:20,width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>Email</Text>
                    </View>
                    <CustomTextInput 
                            onFocus={()=>this.setState({isFocusedEmail:true})}
                            onBlur={()=>this.setState({isFocusedEmail:false})}
                            placeholder="Enter Email"
                            placeholderTextColor='#898785'
                            keyboardType='email-address'
                            ref={this.otpref}
                            customTxtInputStyle = {[ {
                                borderColor: this.state.isFocusedEmail
                                    ? '#FD8D45'
                                    : 'black',
                                borderWidth: this.state.isFocusedEmail
                                ? 1.5 
                                : 1,
                                marginBottom:-20
                            }]}
                            
                            />

                    <View style={{marginLeft:20,width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>Password</Text>
                    </View>
                    <CustomTextInput 
                            onFocus={()=>this.setState({isFocusedPassword:true})}
                            onBlur={()=>this.setState({isFocusedPassword:false})}
                            placeholder="Enter Password"
                            placeholderTextColor='#898785'
                            secureTextEntry={true}
                            ref={this.otpref}
                            customTxtInputStyle = {[ {
                                borderColor: this.state.isFocusedPassword
                                    ? '#FD8D45'
                                    : 'black',
                                borderWidth: this.state.isFocusedPassword
                                ? 1.5 
                                : 1,
                                marginBottom:0
                            }]}
                            
                            />

                        <CustomButton onPressHandler={()=>this.onStartTimer()}  text="Forget Password"
                         customButttonStyle={{alignItems:"flex-end",backgroundColor:'white',marginTop:-50}} 
                         customTextStyle={{color:'#FD8D45',fontWeight: 'bold',fontSize: 14,textDecorationLine: 'underline'}}/>

 
                        <CustomButton customTextStyle={{ color:'white'}} 
                            onPressHandler={()=>this.onLoginHandler()}
                            text="LOGIN" />

                        <View style={{margin:25,justifyContent:"center"}}> 
                            <Text style={{color:'#808080',fontWeight: 'bold',alignSelf:"center", fontSize: 17,justifyContent:"center"}}>OR</Text>
                        </View>


                        
                        <CustomButton  customButttonStyle={{backgroundColor:"#FD8D45", }} customTextStyle={{ color:'black'}} onPressHandler = {() => this.onSubmit()} text="CREATE ACCOUNT" />


                </View>

                </ScrollView>
               
                
               
            
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}