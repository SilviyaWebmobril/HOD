import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    
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


export default class Login extends Component {


  
    static navigationOptions = ({ navigation }) => ({
        title: 'LOGIN WITH OTP',
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

        this.mobileref = React.createRef();
        this.state={isFocused:false}

        
    }

   
    onLogin=()=>{   

        //console.log("mobile no =",this.mobileref.current.getInputTextValue());
        this.props.navigation.navigate('OTP');
        
    };
    onCreate_Account = () => {
        this.props.navigation.navigate('Create_Account');
    };
    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView style={LoginStyle.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomLogo/>

               
                    <View style={LoginStyle.bottom}>
                        <View style={{width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Mobile No.
                            </Text>
                        </View>
                    

                        <CustomTextInput 
                            onFocus={()=>this.setState({isFocused:true})}
                            onBlur={()=>this.setState({isFocused:false})}
                            placeholder="Enter mobile number"
                            placeholderTextColor='#898785'
                            keyboardType='numeric'
                            ref={this.mobileref}
                            customTxtInputStyle = {[ {
                                borderColor: this.state.isFocused
                                    ? '#FD8D45'
                                    : 'black',
                                borderWidth: this.state.isFocused
                                ? 1.5 
                                : 1,
                            }]}
                        
                            />

                    
                    <CustomButton customTextStyle={{ color:'white'}} onPressHandler = {() => this.onLogin()} text="CONTINUE" />
                    
                    <View style={{margin:25}}> 
                        <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>OR</Text>
                    </View>

                    <CustomButton text="CREATE ACCOUNT"
                        onPressHandler ={() => this.onCreate_Account()} 
                        customButttonStyle={{backgroundColor:"#FD8D45", }}
                        customTextStyle={{ color:'#48241e'}} />

                    </View>

                </ScrollView>
               
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}


