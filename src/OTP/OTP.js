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
import OTPStyle from './OTPStyles';
import CustomLogo from '../CustomUI/Logo/CustomLogo';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton/CustomButton';

const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);


export default class OTP extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'OTP',
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
        clearInterval(this.interval);
        this.props.navigation.navigate('Bottomtabs');
    };
    constructor(props) {
        super(props);
        this.state = {
             seconds: 60 ,
             isFocused:false,
             images : [

                "../../../Assets/logo1.png",
                "../../../Assets/img2.jpg",
                "../../../Assets/img4.jpeg",
            
            ],
            
        };
        this.otpref = React.createRef();
      }
      tick() {
        this.state.seconds>0?this.setState(prevState => ({seconds: prevState.seconds - 1})): (clearInterval(this.interval),Alert.alert("OTP Expired Please RESEND"));
    }
    onStartTimer(){
        clearInterval(this.interval);
        this.setState({seconds:60});
        this.interval = setInterval(() => this.tick(), 1000);
    }
      componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    render() {
        return (
            <FullSCreenSpinnerAndDismissKeyboardView style={OTPStyle.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom:20}}>

                    <CustomLogo />
                    <View style={OTPStyle.bottom}>
                    <Text style={{flexDirection:'row',alignItems:'center',color:'black',fontWeight: 'bold',fontSize: 20,marginBottom:10}}>OTP</Text>
                    <Text style={{color:'#898785',fontWeight: 'bold',fontSize: 17,marginBottom:20,marginTop:10}}>Phone Number Verification</Text>
                    <View style={OTPStyle.circle}>
                        <Text style={OTPStyle.Timertxt}>{this.state.seconds}</Text>
                        </View>
                    <View style={{width:'90%',flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        <Text style={{color:'black',fontWeight: 'bold',fontSize: 14,}}>OTP</Text>
                    </View>

                    </View>
                    <View style={{alignItems:"center",marginBottom:20}}>

                            <CustomTextInput 
                                placeholder="Enter OTP" 
                                placeholderTextColor='#898785'
                                returnKeyType = { "next" }
                                inputType="name"
                                keyboardType='numeric'
                            
                            />


                        <CustomButton onPressHandler={()=>this.onStartTimer()}  text="Resend" customButttonStyle={{alignItems:"flex-end",backgroundColor:'white'}} customTextStyle={{color:'#FD8D45',fontWeight: 'bold',fontSize: 14,textDecorationLine: 'underline'}}/>

                        <CustomButton customTextStyle={{ color:'white'}} onPressHandler = {() => this.onSubmit()} text="SUBMIT" />


                    </View>



                </View>

                </ScrollView>
               
                
               
            
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}