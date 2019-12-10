import React,{Component} from 'react';
import {View,Text,StyleSheet,Alert} from 'react-native';
import CustomButton from '../../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../../CustomUI/CustomTextInput/CustomTextInput';
import ApiUrl from '../../Api/ApiUrl';
import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);      
import axios  from 'axios';
import AsyncStorage from '@react-native-community/async-storage';   
import DeviceInfo from 'react-native-device-info';


export default class Support extends Component{

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: " Support ",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' ,fontSize:17,flex:1},
        headerTintColor: 'white'
      });

    constructor(props){
        super(props);

        this.state = {
            isLoading:false,

        }
    }


    componentDidMount(){


    }

  

    contactSupport = async() => {

        console.log("sub",this.refs.subject.getInputTextValue("subject"));

        if(this.refs.subject.getInputTextValue("subject") == "invalid" || this.refs.message.getInputTextValue("message") == "invalid"){

           
            Alert.alert(
                'Support',
                'All * marked fields are compulsory!',
                [
             
                {text: 'OK', onPress: () => {console.log("ok")}},
                ], 
                { cancelable: false }
                )

        }else{

            const user_id = await AsyncStorage.getItem('user_id');
            this.setState({isLoading:true});
            let formdata = new FormData();
            formdata.append("user_id",user_id);
            formdata.append('subject',this.refs.subject.getInputTextValue("subject"));
            formdata.append("message",this.refs.message.getInputTextValue("message"));

            axios.post(ApiUrl.baseurl+ApiUrl.get_support,formdata).then(response => {
                this.setState({isLoading:false});
                console.log("on supprort Response",response);

                Alert.alert(
                    'Support',
                    'Thank You for your message.One of the member in our team will contact you shortly!',
                    [
                 
                    {text: 'OK', onPress: () => {this.resetTextInput()}},
                    ], 
                    { cancelable: false }
                    )
    
            }).catch(error => {
                Alert.alert(
                    'Support',
                    'Something Went wrong !Please try again Later',
                    [
                 
                    {text: 'OK', onPress: () => {console.log("ok")}},
                    ], 
                    { cancelable: false }
                    )
    
            });
        }

      

        
    }

    resetTextInput = () => {

        this.refs.subject.resetTextInput("subject");
        this.refs.message.resetTextInput("message");


    }


    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView
            style={styles.container}
            spinner={this.state.isLoading}>

                {DeviceInfo.isTablet()
                ?
                <View style={{marginLeft:40,width:'90%',marginTop:20,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                        Subject*
                    </Text>
                </View>
                :
                <View style={{marginLeft:20,width:'90%',marginTop:20,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}> Subject* </Text>
                </View>
                }
               
                <CustomTextInput 
                    inputType="subject"
                    ref="subject"
                    placeholder="Enter Subject" placeholderTextColor='#898785'
                    returnKeyType = { "next" }
                    //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                />

                {DeviceInfo.isTablet()
                ?
                <View style={{marginLeft:40,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}> Message* </Text>
                </View>
                :
                <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                    <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>  Message* </Text>
                </View>
                }
               

              
                <CustomTextInput 
                    inputType="message"
                    ref="message"
                    placeholder="Enter Message" placeholderTextColor='#898785'
                    returnKeyType = { "next" }
                    inputType="message"
                    customTxtInputStyle={{height:150}}
                    multiline={true}
                    //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                />

                <CustomButton text="  SUBMIT " 
                    onPressHandler={()=>this.contactSupport()} 
                    customButttonStyle={{backgroundColor:"#FD8D45", }}
                    customTextStyle={{ color:'#48241e'}} 
                />


            </FullSCreenSpinnerAndDismissKeyboardView>


        );
    }

}


const styles =  StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'#fff',
       
    },
   
});