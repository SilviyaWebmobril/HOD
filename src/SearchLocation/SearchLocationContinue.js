import React ,{Component} from 'react';
import {View ,StyleSheet,Text,Alert} from 'react-native';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import SearchLocationStyle from './SearchLocationStyle';
import * as HOC from '../HOC/mainHoc';

import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import AsyncStorage from '@react-native-community/async-storage';
import ApiUrl from '../Api/ApiUrl';

export default class SeacrhLocationContinue extends Component { 

    static navigationOptions = ({ navigation }) => ({
        title: 'Search Location',
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

        this.state ={
           
            isFocusedHouse:false,
            isFocusedPincode:false,
            isFocusedFloor:false,
            isFocusedLandmark:false,
            postal_code:"",
            city:"",
            state:"",
            locality:"",
            name:"",
            user_id:""



        }
        
      
     // this.refs.cityText.setTextInputValue(this.state.city,"city");
    }

    componentDidMount = async() => {

      const value = await AsyncStorage.getItem('user_name');
      const user_id = await AsyncStorage.getItem("user_id");

      console.log("name=",value);
      console.log("user_id",user_id);
      this.setState({user_id:user_id});
      this.setState({"name":value});

      const { navigation } = this.props;
      const postal_code = navigation.getParam('postal_code', '');
      const city = navigation.getParam('city', '');
      const state = navigation.getParam('state', '');
      const locality = navigation.getParam('locality', '');
      const street = navigation.getParam("street",'');
      const latitude = navigation.getParam("latitude","");
      const longitude = navigation.getParam("longitude","");
      const full_address = navigation.getParam("full_address","");
      this.setState({latitude:latitude});
      this.setState({longitude:longitude});
      this.setState({full_address:full_address});

      this.setState({street:street});
      console.log("postal_code 11",postal_code);
      this.setState({postal_code:postal_code},()=>{
        this.refs.postal_code.setTextInputValue(this.state.postal_code,"pincode")
      });
      this.setState({city:city});
      this.setState({"locality":locality});
      this.setState({"state":state})
         
      

    }

    onSubmitHandler =() => {


      console.log("post url"+ApiUrl.baseurl+ApiUrl.setLocation+"&name="+this.state.name+"&city="+this.state.city+"&locality="+this.state.locality+
      "&street="+this.state.street+"&ho_no="+this.refs.houseno.getInputTextValue("houseno")+"&latitude="+this.state.latitude+"&longitude="+this.state.longitude+
      "&full_address="+this.state.full_address+"&landmark="+this.refs.landmark.getInputTextValue("landmark")+"&pin_code="+this.state.postal_code+"&floor_no="+this.refs.floorno.getInputTextValue("floorno"));
    

      axios.post(ApiUrl.baseurl+ApiUrl.setLocation+this.state.user_id+"&name="+this.state.name+"&city="+this.state.city+"&locality="+this.state.locality+
      "&street="+this.state.street+"&ho_no="+this.refs.houseno.getInputTextValue("houseno")+"&latitude="+this.state.latitude+"&longitude="+this.state.longitude+
      "&full_address="+this.state.full_address+"&landmark="+this.refs.landmark.getInputTextValue("landmark")+"&pin_code="+this.state.postal_code+"&floor_no="+this.refs.floorno.getInputTextValue("floorno"))
      .then(res => {
        
        console.log("response ",res);

        Alert.alert("Your Location Updated Successfully!");
        


      })
      .catch(error => {
        console.log("my error",error.response)
    });

      


       // this.props.navigation.navigate('Bottomtabs');
    }

    render() {

    
         
        return (

            <FullSCreenSpinnerAndDismissKeyboardView style = {SearchLocationStyle.container}>
            <ScrollView>
                <View style={{  justifyContent: 'center',alignItems: 'center',marginBottom:20,marginTop:20}}>

                    <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          House Number*
                      </Text>
                    </View>
                    <CustomTextInput 
                       inputType="houseno"
                       ref="houseno"
                        placeholder="Enter House" placeholderTextColor='#898785'
                        returnKeyType = { "next" }
                        keyboardType='numeric'
                        //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                    />

                    <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Fill the floor No.*
                      </Text>
                    </View>
                    <CustomTextInput 
                      inputType="floorno"
                      ref="floorno"
                      placeholder="Enter Floor No." placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                      keyboardType='numeric'
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                    <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Pincode*
                      </Text>
                    </View>
                    <CustomTextInput 
                      inputType="pincode"
                      ref="postal_code"
                      placeholder="Enter Pincode"
                      placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                      keyboardType='numeric'
                   
                      //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                    <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Landmark
                      </Text>
                    </View>
                    <CustomTextInput 
                      inputType="landmark"
                      ref="landmark"
                      placeholder="Enter Landmark" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                    
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                <CustomButton 
                   onPressHandler={()=>this.onSubmitHandler()}
                   customButttonStyle={{backgroundColor:"#FD8D45", marginTop:20}}
                   customTextStyle={{ color:'#48241e'}} 
                   text="SUBMIT"
                 />
                 




                </View>

            </ScrollView>



            </FullSCreenSpinnerAndDismissKeyboardView>


        )
    }

}


