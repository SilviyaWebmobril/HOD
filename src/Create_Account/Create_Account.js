import React, { Component } from 'react';
import axios  from 'axios';
import {
    View,
   Alert,
    Text,
   
} from 'react-native';
import * as HOC from '../HOC/mainHoc';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomButtonWithIcon from '../CustomUI/CustomButton/CustomButtonWithIcon';
import Create_AccountStyle from './Create_AccountStyle';
import CustomLogo from '../CustomUI/Logo/CustomLogo';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import ApiUrl from '../Api/ApiUrl';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import FCM from "react-native-fcm"; 
import AsyncStorage from '@react-native-community/async-storage';

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

    constructor(props){
        super(props);
        this.state= {
           
            isFocusedName: false,
            isFocusedEmail: false,
            isFocusedPassword: false, 
            isFocusedMobile:false,
            isFocusedCode:false,
            device_token:"",
            isLoading:false
        }
    }


    onLogin = () => {
       this.props.navigation.navigate('Login');
    };



    onCreateAccount = ()=>{

       
        if((this.refs.nameText.getInputTextValue("name") !== "invalid") && (this.refs.emailText.getInputTextValue("email") !== "invalid") &&
             (this.refs.passwordText.getInputTextValue("password") !== "invalid") && (this.refs.mobileText.getInputTextValue("mobile") !== "invalid") ) {
              this.setState({isLoading:true})
              console.log("api base url",ApiUrl.baseurl);
              FCM.requestPermissions();
              FCM.getFCMToken().then(token => {
              this.setState({device_token:token});


                var formdata = new FormData();
                formdata.append("name",this.refs.nameText.getInputTextValue("name"));
                formdata.append("email",this.refs.emailText.getInputTextValue("email"));
                formdata.append("mobile",this.refs.mobileText.getInputTextValue("mobile"));
                formdata.append("password",this.refs.passwordText.getInputTextValue("password"));
                formdata.append("device_type",ApiUrl.device_type);
                formdata.append("device_token",this.state.device_token);

                console.log("formdata",formdata);

        
                axios.post(ApiUrl.baseurl + ApiUrl.create_account,formdata)
                .then(res => {
                 
                    console.log("my response",res);
                   
                    if(res.data.error){

                        this.setState({isLoading:false});
                        Alert.alert("Email Already exists. Please Login!");

                    }else{

                        AsyncStorage.setItem('user_id',JSON.stringify(res.data.result.id))
                        AsyncStorage.setItem("user_name", res.data.result.name)
                        AsyncStorage.setItem("user_email", res.data.result.email)
                        AsyncStorage.setItem('user_mobile',res.data.result.mobile)
                        AsyncStorage.setItem("user_password",res.data.result.txtpassword)
                        AsyncStorage.setItem("user_home",res.data.result.homeaddress)
                        this.setState({isLoading:false});
                        Alert.alert("Your Account created Successfully!");
                        this.props.navigation.navigate('Bottomtabs');
    
                        
                    }
                   
                  
                })
                .catch(error => {
                    console.log("my error",error.response)
                });



              });

              

            

            
        }else{
            Alert.alert("All the * marked fields are required");
        }
      
    }
   


    render() {
        
        return (
             <FullSCreenSpinnerAndDismissKeyboardView 
               style={Create_AccountStyle.container}
               spinner={this.state.isLoading}>
                    <View>
                        <CustomLogo />
                        <View style={Create_AccountStyle.Create_Accountbottom}>
                      
                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Name*
                                </Text>
                            </View>   
                            <CustomTextInput 
                                ref="nameText"
                                inputType= "name"
                                placeholder="Enter Name"
                                placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            />

                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Email*
                                </Text>
                            </View>   
                            <CustomTextInput 
                                ref="emailText"
                                onFocus={()=>this.setState({isFocusedEmail:true})}
                                onBlur={()=>this.setState({isFocusedEmail:false})}
                                inputType="email"
                                placeholder="Enter Email" placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            />

                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Password*
                                </Text>
                            </View>   
                            <CustomTextInput 
                                ref="passwordText"
                                onFocus={()=>this.setState({isFocusedPassword:true})}
                                onBlur={()=>this.setState({isFocusedPassword:false})}
                                placeholder="Enter Password" placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                inputType="password"
                                //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            />
                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Mobile*
                                </Text>
                            </View>
                            <CustomTextInput 
                                ref="mobileText"   
                                placeholder="Enter mobile number" 
                                placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                inputType="mobile"
                                keyboardType='numeric'
                                //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                            />
                        
                            <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                    Refferal Code(optional)*Terms Apply
                                </Text>
                            </View>
                            <CustomTextInput 
                                ref="referralCodeText"
                                onFocus={()=>this.setState({isFocusedCode:true})}
                                onBlur={()=>this.setState({isFocusedCode:false})}
                                placeholder="Enter Refferal Code" placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                inputType="referralCode"    
                                //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                            />
                    
                     
                        
                                <CustomButton onPressHandler={()=>this.onCreateAccount()} text="CREATE ACCOUNT" 
                                    customTextStyle={Create_AccountStyle.enableTextColor}/>
                    
                               
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
                          
                        </View>
                    </View>
                  
                
             </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}