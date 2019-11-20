import React, {Component} from 'react';
import {Alert,View,Text,StyleSheet,TouchableOpacity,Image, Platform,} from 'react-native';
import * as HOC from '../HOC/mainHoc';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import CustomButtonWithIcon from '../CustomUI/CustomButton/CustomButtonWithIcon';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import SearchLocationStyle from './SearchLocationStyle';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import ApiUrl from '../Api/ApiUrl';
//const KeyboardAwareView = HOC.KeyboardAwareHOC(View);
import KeyboardAwareHOC from '../HOC/KeyboardAwareHOC';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);

const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView,
  
  
);
import AsyncStorage from '@react-native-community/async-storage';
import GooglePlacesInput from './GooglePlacesInput'; 
import { connect } from 'react-redux';
import {userAddress,addNewAddress,getUserId,userData} from '../redux/store/actions/userDataAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class SearchLocation extends Component {


    static navigationOptions = ({ navigation }) => ({
        title: '  Search Location  ',
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white',fontSize:17,flex:1 },
        headerTintColor: 'white', 
        headerLeft:(
          <TouchableOpacity
            onPress={()=>{navigation.pop()}}
          >
            {Platform.OS === 'android'
            ?
            <Image source={require('../../Assets/arrow_left.png')} style={{marginLeft:20}} />
            :
            <Image source={require('../../Assets/back_white_ios.png')} style={{marginLeft:20}} />
            }
            
          </TouchableOpacity>
        
      )
    });


    constructor(props){
        super(props);

        this.state ={
            user_id:"",
            name:"",
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
            isLoading:false,
            location_update:"",
           



        }
    }

    componentDidMount= async()  =>{

      const { navigation } = this.props;
      this.setState({location_update:navigation.getParam("location_update")});

     
      //const user_id = await AsyncStorage.getItem("user_id");
      this.setState({user_id:this.props.user.userdata.user_id});
      this.setState({name:this.props.user.userdata.user_name});

      this.setState({isLoading:true});
      if(this.props.user.userdata.user_name !== null){
        this.refs.nameText.setTextInputValue(this.props.user.userdata.user_name,"name");
      }
     

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({isLoading:false});
        
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });

             
        },
        (error) => console.log("on error wokeey",error),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
     
    }

    
    getCurrentLocation = () =>{ 

          this.setState({isLoading:true});
      
          
        

          axios.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=' + ApiUrl.googlePlacesApiKey)
          .then(response =>{
            // handle success
           
          
            

            const full_address = response.data.results[0].formatted_address;

            const postal_code = response.data.results[0].address_components[response.data.results[0].address_components.length - 1].long_name;
            this.setState({full_address:full_address});
            this.setState({postal_code:postal_code});


              response.data.results[0].address_components.forEach( (element,index) =>{

            
                  element.types.forEach((type,typindex)=> {
                  
                    if(type == "premise"){

                      const street = element.long_name;
                      this.setState({street:street},()=>{

                        this.refs.streetText.setTextInputValue(this.state.street,"street");
       
                      });
                      
                    
                    }

                    if(type == "sublocality"){

                      const sublocality = element.long_name;
                      this.setState({locality:sublocality},()=>{
                      
     
                        this.refs.localityText.setTextInputValue(this.state.locality,"locality");
                      });
                    
                    }

                    if(type == "locality"){

                      const city = element.long_name;
                      this.setState({city:city},()=>{

                        this.refs.cityText.setTextInputValue(this.state.city,"city");
                      });
                    
                    }

                  });
                
              });

              var is_primary =1 ;
             
              console.log("address url"+ApiUrl.baseurl+ApiUrl.setLocation+this.state.user_id+"&name= "+this.state.name+"&city="+this.state.city+"&locality="+this.state.locality+
              "&street="+this.state.street+"&ho_no= &latitude="+this.state.latitude+"&longitude="+this.state.longitude+
              "&full_address="+this.state.full_address+"&landmark=  &pin_code="+this.state.postal_code+"&floor_no=  &is_primary="+is_primary);

              axios.post(ApiUrl.baseurl+ApiUrl.setLocation+this.state.user_id+"&name= "+this.state.name+"&city="+this.state.city+"&locality="+this.state.locality+
              "&street="+this.state.street+"&ho_no= &latitude="+this.state.latitude+"&longitude="+this.state.longitude+
              "&full_address="+this.state.full_address+"&landmark=  &pin_code="+this.state.postal_code+"&floor_no=  &is_primary="+is_primary)
              .then(res => {
                
                this.setState({isLoading:false});
             
                
                if(res.data.error){
                  Alert.alert(
                    'Location',
                    "Something went wrong! Please try again later.",
                    [
                 
                    {text: 'OK', onPress: () =>  {console.log("ok")}},
                    ], 
                    { cancelable: false }
                    )
                
                }else{
        
                  AsyncStorage.setItem('user_id',this.props.user.userdata.user_id);
                  this.props.onUpdateUserId(this.props.user.userdata.user_id);
                  let userdata = {};
                  Object.assign(userdata,{"user_id":this.props.user.userdata.user_id});
                  Object.assign(userdata,{"user_name": this.props.user.userdata.user_name});
                  Object.assign(userdata,{"user_email":this.props.user.userdata.user_email});
                  Object.assign(userdata,{"user_mobile":this.props.user.userdata.user_mobile});
                  Object.assign(userdata,{"user_gender":this.props.user.userdata.user_gender});
                  Object.assign(userdata,{"user_dob":this.props.user.userdata.user_dob});
                  Object.assign(userdata,{"user_married":this.props.user.userdata.user_married});
                  Object.assign(userdata,{"user_family_members":this.props.user.userdata.user_family_members});
                  Object.assign(userdata,{"user_vegitarian":this.props.user.userdata.user_vegitarian});
                  this.props.onUpdateUser(userdata);
                  this.props.addNewAddress(res.data.data);
                  this.props.onUpdateAddress(this.state.full_address);  
                
                 if(this.state.location_update == 1 ){
               
                  
                   
                      this.props.navigation.navigate('HomeBottomtabs');
                   
                      
          
                    Alert.alert(
                      'Location',
                      "Your Location Updated Successfully!",
                      [
                  
                      {text: 'OK', onPress: () =>  {console.log("ok")}},
                      ], 
                      { cancelable: false }
                      )
                  
                 }else{
                  
                    this.props.navigation.navigate('ViewProfile');
            
                    Alert.alert(
                      'Location',
                      "Your Location Updated Successfully!",
                      [
                  
                      {text: 'OK', onPress: () =>    {console.log("ok")}},
                      ], 
                      { cancelable: false }
                      )
                  }
          
                 
                  
        
                }
        
             
        
        
              })
              .catch(error => {
                console.log("my error",error)
            });
        










          })
          .catch(error=>{
            // handle error
            console.log(error);
          })




         

    }

      continueButtonHandler = () =>{
      
        if(this.refs.nameText.getInputTextValue("name") == "invalid" || this.refs.cityText.getInputTextValue("city") == "invalid"
        || this.refs.localityText.getInputTextValue("locality") == "invalid" || this.refs.streetText.getInputTextValue("street") == "invalid"){

          Alert.alert("All * marked fields are compulsory!")

        }else{

         
          this.props.navigation.navigate('SearchLocationContinue',{"postal_code":this.state.postal_code,
          "name":this.state.name,
          "city":this.refs.cityText.getInputTextValue("city"),
          "locality":this.refs.localityText.getInputTextValue("locality"),
          "street":this.refs.streetText.getInputTextValue("street"),
          "latitude":this.state.latitude,
          "longitude":this.state.longitude,"full_address":this.state.full_address,
          "location_update" :this.state.location_update,
          
          });

        }
      
      
      }
      
  

    render() {
      
      return(

          

            <FullSCreenSpinnerAndDismissKeyboardView 
            refreshing={false}
            spinner={this.state.isLoading}
            >
              
            <KeyboardAwareScrollView>

            <View style={{  justifyContent: 'center',alignItems: 'center',marginBottom:0}}>
                 <GooglePlacesInput ref="details"/>
                 
                  <View style={SearchLocationStyle.viewLineGrey}></View>
                  <CustomButtonWithIcon       
                    type="mat"
                    onPressHandler={()=>this.getCurrentLocation()}
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
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>  Name*  </Text>
                  </View>
                  <CustomTextInput 
                      ref="nameText"
                       inputType="name"
                      placeholder="Enter Name" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                      ///onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />
                  
                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>  City*  </Text>
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
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>  Locality*  </Text>
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
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>  Street*  </Text>
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
                    customButttonStyle={{backgroundColor:"#FD8D45"}}
                    customTextStyle={{ color:'#48241e'}} 
                    text="  CONTINUE  "
                  />
                  
                  

                  </View>



            </KeyboardAwareScrollView>
            
           
             </FullSCreenSpinnerAndDismissKeyboardView>
        

            
        );
    }




}

const mapStateToProps = state => {
  return {
    location: state.location.location,
    user:state.userdata
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onAdd: (name) => {
      dispatch(addLocation(name))
    },
    onUpdateAddress : (address) => {
      
        dispatch(userAddress(address))
    },
    addNewAddress :(address) =>{
      dispatch(addNewAddress(address))
    },
    onUpdateUser: (userdata) => {
      dispatch(userData(userdata))
    },
    onUpdateUserId: (id) => {
      dispatch(getUserId(id))
    },

  }
}



export default connect(mapStateToProps,mapDispatchToProps)(SearchLocation)



