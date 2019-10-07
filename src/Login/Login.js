import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import LoginStyle from './LoginStyle';
import CustomLogo from './../CustomUI/Logo/CustomLogo';
import * as HOC from '../HOC/mainHoc';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import { ScrollView } from 'react-native-gesture-handler';
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
        title:navigation.getParam("update") == 0 ? 'LOGIN WITH OTP' : "UPDATE MOBILE",
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
     
        this.state={isFocused:false, onUpdate:this.props.navigation.getParam("update")}

        
    }

   
   
    onContinue=()=>{   

         //  update param to check wheater usr is login currently or udating mobile no. update =0 (Login) , update= 1(Change mobile)
        if(this.props.navigation.getParam("update") == 0){

            // 

            if(this.refs.mobile.getInputTextValue("mobile") !== "invalid"){

                this.setState({isLoading:true});
    
                var formdata = new FormData();
                formdata.append("mobile_no",this.refs.mobile.getInputTextValue("mobile"));
               
                Axios.post(ApiUrl.baseurl +ApiUrl.send_mobile_for_otp,formdata).then(response => {
                    this.setState({isLoading:false})
    
                    console.log("response send mobile",response);
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
            
        }else{

            if(this.refs.mobile.getInputTextValue("mobile") !== "invalid"){

                this.setState({isLoading:true});
    
                console.log("userdata === >",this.props.userdata);
                var formdata = new FormData();  
                formdata.append("mobile_no",this.refs.mobile.getInputTextValue("mobile"));
                formdata.append("user_id",this.props.userdata.userdata.user_id);
               
                Axios.post(ApiUrl.baseurl +ApiUrl.update_mobile_no,formdata).then(response => {
                    this.setState({isLoading:false})
    
                    console.log("response send mobile",response);
                    if(response.data.error){
                        Alert.alert(`${response.data.message}`);
                    }else{
                        this.props.navigation.navigate('OTP',{mobile:this.refs.mobile.getInputTextValue("mobile"),update:1});
                    }
                   
    
                }).catch(error => {
                    this.setState({isLoading:false})
                    console.log("error",error);
                });
            }else{
                Alert.alert("Please Enter Mobile No.")
            }   
        }

    };
    onCreate_Account = () => {
        this.props.navigation.navigate('Create_Account');
    };
    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView style={LoginStyle.container}  spinner={this.state.isLoading}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomLogo/>

               
                    <View style={LoginStyle.bottom}>
                        <View style={{width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Mobile No.
                            </Text>
                        </View>
                    

                        <CustomTextInput 
                                ref="mobile"
                                placeholder="Enter mobile number" 
                                placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                inputType="mobile"
                                keyboardType='numeric'
                        
                            />

                    
                    <CustomButton customTextStyle={{ color:'white'}} onPressHandler = {() => this.onContinue()} text="CONTINUE" />
                    {this.state.onUpdate == 0 ?  

                    <View>
                        <View style={{margin:25}}> 
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>OR</Text>
                        </View>

                        <CustomButton text="CREATE ACCOUNT"
                            onPressHandler ={() => this.onCreate_Account()} 
                            customButttonStyle={{backgroundColor:"#FD8D45", }}
                            customTextStyle={{ color:'#48241e'}} />

                    </View>

                    :
                    <View/>
                    
                    
                    }
                  
                    </View>

                </ScrollView>
               
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}




const mapStateToProps = state => {
    return {
      userdata: state.userdata
    }
  }
  
  export default connect(mapStateToProps,null)(Login)
  