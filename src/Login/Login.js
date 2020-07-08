import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    StyleSheet,
    ToastAndroid
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import LoginStyle from './LoginStyle';
import CustomLogo from './../CustomUI/Logo/CustomLogo';
import * as HOC from '../HOC/mainHoc';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import { SwitchActions } from 'react-navigation';
import Axios from 'axios';
import ApiUrl from '../Api/ApiUrl';
import {connect} from 'react-redux';

class Login extends Component {


  
    static navigationOptions = ({ navigation }) => ({

      
        //title:navigation.getParam("update") == 0 ? 'LOGIN WITH OTP' : "UPDATE MOBILE",
        title:"LOGIN",
        headerStyle: {
           /// height: 60,
            backgroundColor: '#FD8D45',
        },
        //headerTitleStyle: { color: 'white' ,fontSize:17,fontFamily:"roboto-bold",textAlign:'center',alignSelf:"center"},
        headerTitleStyle: { alignSelf: 'center', textAlign:"center",flex:1 },
        headerTintColor: 'white',
        
        // headerTitleStyle: {
        //     fontFamily:"Roboto-Light",
        //     color: 'white',
        //     alignSelf: 'center',
        //     textAlign: 'center',
        //     flex: 1,
        //     fontSize: 17,
        // },
        // headerTintColor: 'white',
        // headerRight: (<View></View>)
    });

    constructor(props){
        super(props);
     
        this.state={isFocused:false, onUpdate:this.props.navigation.getParam("update")}

        
    }

   
   
    onContinue=()=>{   

        if(this.refs.mobile.getInputTextValue("mobile") !== "invalid"){

            this.setState({isLoading:true});

            var formdata = new FormData();
            formdata.append("mobile_no",this.refs.mobile.getInputTextValue("mobile"));
           
            Axios.post(ApiUrl.baseurl +ApiUrl.send_mobile_for_otp,formdata).then(response => {
                this.setState({isLoading:false})

              //  ToastAndroid.show("Your otp is "+response.data.otp,ToastAndroid.LONG);
              console.log("response...data",response.data);
                if(response.data.error){
                    Alert.alert(`${response.data.message}`);;
                }else{
                    this.props.navigation.navigate('OTP',{mobile:this.refs.mobile.getInputTextValue("mobile"),update:0});
                }
               

            }).catch(error => {
                this.setState({isLoading:false})
                console.log("error",error);
            });
           
       }else{
           Alert.alert("Please Enter Mobile No.")
       }
        
        

    };
    onCreate_Account = () => {
        this.props.navigation.navigate('Create_Account');
    };
    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView style={styles.container} refreshing={false} spinner={this.state.isLoading}>
                <KeyboardAwareScrollView >
                    {/* <CustomLogo/>

                   
                   
                   
                    <View style={LoginStyle.bottom}>
                        <View style={{width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17, fontFamily:'roboto-bold',}}>Mobile No.</Text>
                        </View>
                    

                        <CustomTextInput 
                                ref="mobile"
                                placeholder="Enter mobile number" 
                                placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                inputType="mobile"
                                keyboardType='numeric'
                        
                            />

                    
                    <CustomButton text="CONTINUE" customTextStyle={{ color:'white'}} onPressHandler = {() => this.onContinue()}  /> */}

                    <CustomLogo/>

                    {/* <Text style={{color:'#FD8D45',fontSize: 17, alignSelf:"center",margin:20, fontFamily:'roboto-bold',}}>LOGIN WITH OTP</Text>
                    <Text style={styles.labelText}>Mobile No.</Text> */}
                    <CustomTextInput 
                        ref="mobile"
                        placeholder="Enter Mobile Number" 
                        placeholderTextColor='#898785'
                        returnKeyType = { "next" }
                        inputType="mobile"
                        keyboardType='numeric'
                
                    />
                    <CustomButton text="CONTINUE"
                     customButttonStyle={{marginBottom:40,marginTop:20}}
                     customTextStyle={{ color:'white'}} onPressHandler = {() => this.onContinue()}  />


               
                   
                    

                    {/* <View style={{width:"100%"}}>
                        <View style={{margin:25,alignSelf:"center"}}> 
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}> OR </Text>
                        </View>

                        <CustomButton text=" CREATE ACCOUNT "
                            onPressHandler ={() => this.onCreate_Account()} 
                            customButttonStyle={{backgroundColor:"#FD8D45", }}
                            customTextStyle={{ color:'#48241e'}} />

                    </View> */}

                    
                   
                </KeyboardAwareScrollView>
               
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}




const mapStateToProps = state => {
    return {
      userdata: state.userdata
    }
  }


  const styles = StyleSheet.create({


    container:{
        flex:1,
        backgroundColor:'#fff',
        marginLeft:0,
        marginRight:0,
        marginTop:15,
       
    },

   
    labelText:{
        fontFamily:"roboto-bold",
        color:'grey',
        fontSize: 14,
        marginLeft:15
    },

  })
  
  
  export default connect(mapStateToProps,null)(Login)
  
