import React, {Component} from 'react';
import {Alert,View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import * as HOC from '../HOC/mainHoc';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import CustomButtonWithIcon from '../CustomUI/CustomButton/CustomButtonWithIcon';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import SearchLocationStyle from './SearchLocationStyle';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import ApiUrl from '../Api/ApiUrl';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);

import GooglePlacesInput from './GooglePlacesInput'; 

export default class SearchLocation extends Component {


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
       
            focusedName:false,
            focusedCity:false,
            focusedLocality:false,
            focusedStreet:false,
            error:"",
            latitude:"",
            longitude:"",
            full_address:"",
            postal_code:"",
            street:"",
            locality:"",
            city:"",



        }
    }

    componentDidMount() {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("wokeeey");
          console.log(position);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });

             
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
     
    }

    
    getCurrentLocation = () =>{ 

          console.log("latitude",this.state.latitude);
          console.log("long",this.state.longitude);

          axios.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=' + ApiUrl.googlePlacesApiKey)
          .then(response =>{
            // handle success
        
            console.log("response",response);
          
            console.log("full_address",response.data.results[0].formatted_address);
            const full_address = response.data.results[0].formatted_address;

            console.log("postal code",response.data.results[0].address_components[response.data.results[0].address_components.length - 1].long_name);
            const postal_code = response.data.results[0].address_components[response.data.results[0].address_components.length - 1].long_name;
            this.setState({full_address:full_address});
            this.setState({postal_code:postal_code});


            // this.setState({full_address:response.data.results[0].formatted_address});
              // this.setState({postal_code:response.data.results[0].address_components[response.data.results[0].address_components.length - 1].long_name})
              response.data.results[0].address_components.forEach( (element,index) =>{

            
                  element.types.forEach((type,typindex)=> {
                  
                    if(type == "premise"){

                      const street = element.long_name;
                      this.setState({street:street});
                      
                    
                    }

                    if(type == "sublocality"){

                      const sublocality = element.long_name;
                      this.setState({sublocality:sublocality});
                    
                    }

                    if(type == "locality"){

                      const city = element.long_name;
                      this.setState({city:city});
                    
                    }

                  });
                
              });

          })
          .catch(error=>{
            // handle error
            console.log(error);
          })
         

    }

      continueButtonHandler = () =>{
       
        this.refs.localityText.setTextInputValue(this.state.locality,"locality");
        this.refs.streetText.setTextInputValue(this.state.street,"street");
        this.refs.cityText.setTextInputValue(this.state.city,"city");

        this.props.navigation.navigate('SearchLocationContinue');
      }
     

    render() {
      
      return(

            <FullSCreenSpinnerAndDismissKeyboardView style={SearchLocationStyle.container}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{  justifyContent: 'center',alignItems: 'center',marginBottom:20}}>
                 <GooglePlacesInput />
                 
                  <View style={SearchLocationStyle.viewLineGrey}></View>
                  <CustomButtonWithIcon       
                    type="mat"
                    onPressHandler={this.getCurrentLocation}
                    iconName="crosshairs-gps"
                    iconColor="black"
                    iconSize={20}
                    customText="Current Location (GPS)"
                    customViewIconStyle= {{backgroundColor:"#ffffff",borderTopLeftRadius: 5,borderBottomLeftRadius: 5,}}
                    customButttonStyle ={{padding:10,backgroundColor:"#ffffff"}}
                    customViewTextStyle={{ borderBottomRightRadius: 5,borderTopRightRadius: 5,fontSize:15}}
                    custombtnText={{color:'grey',fontWeight:'bold',alignSelf:'flex-start'}}
                    />

                  <View style={SearchLocationStyle.viewLineBlack}></View>

                  <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Name*
                      </Text>
                  </View>
                  <CustomTextInput 
                      ref="nameText"
                       inputType="name"
                      placeholder="Enter Name" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                      ///onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />
                  
                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          City*
                      </Text>
                  </View>
                  <CustomTextInput 
                      inputType="city"
                      ref="cityText"
                      placeholder="Enter City" 
                      placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Locality*
                      </Text>
                  </View>
                  <CustomTextInput 
                       inputType="locality"
                       ref="localityText"
                      placeholder="Enter Locality" 
                      placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Street*
                      </Text>
                  </View>
                  <CustomTextInput 
                       inputType="street"
                       ref="streetText"
                      placeholder="Enter Street" 
                      placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                   //   onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />
                  <CustomButton 
                    onPressHandler={()=> this.continueButtonHandler()}
                    customButttonStyle={{backgroundColor:"#FD8D45", }}
                    customTextStyle={{ color:'#48241e'}} 
                    text="CONTINUE"
                  />
                  
                  

                  </View>
                </ScrollView>   
             </FullSCreenSpinnerAndDismissKeyboardView>
        
        );
    }




}


