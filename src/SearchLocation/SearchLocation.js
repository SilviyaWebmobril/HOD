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
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import GooglePlacesInput from './GooglePlacesInput'; 
import { connect } from 'react-redux';
import {userAddress,addNewAddress,getUserId,userData} from '../redux/store/actions/userDataAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class SearchLocation extends Component {


    static navigationOptions = ({ navigation }) => ({
        title: '  Search Location  ',
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white',fontSize:17,flex:1 ,fontFamily:"roboto-bold",textAlign:"center"},
        headerTintColor: 'white', 
        headerTitleContainerStyle: {
          left: 0, // THIS RIGHT HERE
        },
        headerLeft:(
          <TouchableOpacity
            onPress={()=>{navigation.pop()}}
          >
            {Platform.OS === 'android'
            ?
            <Image source={require('../Assets/arrow_left.png')} style={{marginLeft:20}} />
            :
            <Image source={require('../Assets/back_white_ios.png')} style={{marginLeft:20}} />
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
            is_primary:false,
            city_disabled:true,
            locality_disabled:true,
            showPlacesList:'auto', 
           



        }
    }

    componentDidMount= async()  =>{

      const { navigation } = this.props;
      this.setState({location_update:navigation.getParam("location_update")},()=>{
        console.log("update",this.state.location_update);
      });
     
      //const user_id = await AsyncStorage.getItem("user_id");
      this.setState({user_id:this.props.user.userdata.user_id});
      console.log("nambvcbvcvb",this.props.user.userdata.user_name);

      this.setState({isLoading:true});
      if(this.props.user.userdata.user_name !== null && this.props.user.userdata.user_name  !== "null"){
        this.refs.nameText.setTextInputValue(this.props.user.userdata.user_name,"name");
       // this.setState({name:this.props.user.userdata.user_name});
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
           
            
            this.setState({isLoading:false});

            const full_address = response.data.results[0].formatted_address;
            

            const postal_code = response.data.results[0].address_components[response.data.results[0].address_components.length - 1].long_name;
            this.setState({full_address:full_address});
            this.setState({postal_code:postal_code});


              response.data.results[0].address_components.forEach( (element,index) =>{

            
                  element.types.forEach((type,typindex)=> {
                  
                    if(type == "premise"){

                      const street = element.long_name;
                      this.setState({street:street},()=>{

                        this.refs.street.setTextInputValue(this.state.street,"street");
       
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

              this.setState({locality_disabled:false});
              this.setState({city_disabled:false})

              var is_primary =0;
             
              console.log("address url"+ApiUrl.baseurl+ApiUrl.setLocation+this.state.user_id+"&name= "+this.state.name+"&city="+this.state.city+"&locality="+this.state.locality+
              "&street="+this.state.street+"&ho_no= &latitude="+this.state.latitude+"&longitude="+this.state.longitude+
              "&full_address="+this.state.full_address+"&landmark=  &pin_code="+this.state.postal_code+"&floor_no=  &is_primary="+is_primary);

            //   axios.post(ApiUrl.baseurl+ApiUrl.setLocation+this.state.user_id+"&name= "+this.state.name+"&city="+this.state.city+"&locality="+this.state.locality+
            //   "&street="+this.state.street+"&ho_no= &latitude="+this.state.latitude+"&longitude="+this.state.longitude+
            //   "&full_address="+this.state.full_address+"&landmark=  &pin_code="+this.state.postal_code+"&floor_no=  &is_primary="+is_primary)
            //   .then(res => {
                
            //     this.setState({isLoading:false});
             
                
            //     if(res.data.error){
            //       Alert.alert(
            //         'Location',
            //         "Something went wrong! Please try again later.",
            //         [
                 
            //         {text: 'OK', onPress: () =>  {console.log("ok")}},
            //         ], 
            //         { cancelable: false }
            //         )
                
            //     }else{
        
            //       AsyncStorage.setItem('user_id',this.props.user.userdata.user_id);
            //       this.props.onUpdateUserId(this.props.user.userdata.user_id);
            //       let userdata = {};
            //       Object.assign(userdata,{"user_id":this.props.user.userdata.user_id});
            //       Object.assign(userdata,{"user_name": this.props.user.userdata.user_name});
            //       Object.assign(userdata,{"user_email":this.props.user.userdata.user_email});
            //       Object.assign(userdata,{"user_mobile":this.props.user.userdata.user_mobile});
            //       Object.assign(userdata,{"user_gender":this.props.user.userdata.user_gender});
            //       Object.assign(userdata,{"user_dob":this.props.user.userdata.user_dob});
            //       Object.assign(userdata,{"user_married":this.props.user.userdata.user_married});
            //       Object.assign(userdata,{"user_family_members":this.props.user.userdata.user_family_members});
            //       Object.assign(userdata,{"user_vegitarian":this.props.user.userdata.user_vegitarian});
            //       this.props.onUpdateUser(userdata);
            //       this.props.addNewAddress(res.data.data);
            //       this.props.onUpdateAddress(this.state.full_address);  
                
            //      if(this.state.location_update == 1 ){
               
                  
                   
            //           this.props.navigation.navigate('HomeBottomtabs');
                   
                      
          
            //         Alert.alert(
            //           'Location',
            //           "Your Location Updated Successfully!",
            //           [
                  
            //           {text: 'OK', onPress: () =>  {console.log("ok")}},
            //           ], 
            //           { cancelable: false }
            //           )
                  
            //      }else{
                  
            //         this.props.navigation.navigate('ViewProfile');
            
            //         Alert.alert(
            //           'Location',
            //           "Your Location Updated Successfully!",
            //           [
                  
            //           {text: 'OK', onPress: () =>    {console.log("ok")}},
            //           ], 
            //           { cancelable: false }
            //           )
            //       }
          
                 
                  
        
            //     }
        
             
        
        
            //   })
            //   .catch(error => {
            //     console.log("my error",error)
            // });
        




          })
          .catch(error=>{
            // handle error
            console.log(error);
          })




         

    }

    setAddressFromGoogleAutoComplete = (response) => {

      console.log("ress...",response)

      response.address_components.forEach( (element,index) =>{

            
        element.types.forEach((type,typindex)=> {
        
          if(type == "premise"){

            const street = element.long_name;
            this.setState({street:street},()=>{

              this.refs.street.setTextInputValue(this.state.street,"street");

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

    this.setState({locality_disabled:false});
    this.setState({city_disabled:false})

    }

      continueButtonHandler = () =>{
      
        if(this.refs.nameText.getInputTextValue("name") == "invalid" || this.refs.cityText.getInputTextValue("city") == "invalid"
         || this.refs.localityText.getInputTextValue("locality") == "invalid" || this.refs.street.getInputTextValue("street") == "invalid"){

          Alert.alert(
            'Location',
            "All * marked fields are required!",
            [
        
            {text: 'OK', onPress: () =>  {console.log("ok")}},
            ], 
            { cancelable: false }
            )

        }else{

         
          this.props.navigation.navigate('SearchLocationContinue',{"postal_code":this.state.postal_code,
          "name":this.state.name,
          "city":this.refs.cityText.getInputTextValue("city"),
          "locality":this.refs.localityText.getInputTextValue("locality"),
          "street":this.refs.street.getInputTextValue("street"),
          "latitude":this.state.latitude,
          "longitude":this.state.longitude,"full_address":this.state.full_address,
          "location_update" :this.state.location_update,
          
          });

        }
      
      
      }


      onSubmitHandler =() => {

         var is_primary ;
       
          if(this.state.is_primary){
            is_primary = 1;
          }else{
            is_primary = 0;
          }

          let full_address;
          let house_no = this.refs.houseno.getInputTextValue("houseno") ;
          let floor_no = this.refs.floorno.getInputTextValue("floorno") ;
          let pincode =  this.refs.postal_code.getInputTextValue("pincode") ;
          let street = this.refs.street.getInputTextValue('street');
          let locality  = this.refs.localityText.getInputTextValue("locality");
           let city  = this.refs.cityText.getInputTextValue("city");
           
          if(house_no !== "invalid" || floor_no !== "invalid" || pincode !== "invalid" || street  !== "invalid"){

            
            full_address = house_no +" "+ floor_no +" "+ street+" "+locality+" "+city;
        
            this.setState({full_address:full_address});
    
          }else{
            this.setState({full_address:full_address});
    
          }
        
        
  
        if(this.refs.houseno.getInputTextValue("houseno") == "invalid" || this.refs.floorno.getInputTextValue("floorno") == "invalid" || this.refs.postal_code.getInputTextValue("pincode") == "invalid"){
  
          Alert.alert(
            'Location',
            "All * marked fields are compulsory!",
            [
        
            {text: 'OK', onPress: () =>  {console.log("ok")}},
            ], 
            { cancelable: false }
            )
  
  
        }else{
  
            this.setState({isLoading:true});
            let formdata = new FormData();
            formdata.append("user_id",this.state.user_id);
            formdata.append("name",this.refs.nameText.getInputTextValue("name"));
            formdata.append("city",this.refs.cityText.getInputTextValue("city"));
            formdata.append("locality",locality);
            formdata.append("street",street);
            formdata.append("ho_no",house_no);
            formdata.append("latitude",this.state.latitude);
            formdata.append("longitude",this.state.longitude);
            formdata.append("full_address",full_address);
            formdata.append("landmark",this.refs.landmark.getInputTextValue("landmark"));
            formdata.append("pin_code",this.refs.postal_code.getInputTextValue("pincode"));
            formdata.append("floor_no",floor_no);
            formdata.append('is_primary',is_primary);
            console.log("form address",formdata);

            axios.post(ApiUrl.baseurl+ApiUrl.setLocation,formdata)
            .then(res => {
             
            
              this.setState({isLoading:false});
              if(res.data.error){
                console.log("respons efrom add",res.data.error);
                Alert.alert(
                  'Location',
                  "Something went wrong! Please try again later.",
                  [
              
                  {text: 'OK', onPress: () =>  {console.log("ok")}},
                  ], 
                  { cancelable: false }
                  )
              
              }else{
      
                  if(this.state.is_primary){
        
                    // updating primary address 
                    this.props.onUpdateAddress(full_address+","+this.refs.postal_code.getInputTextValue("pincode"));  
                  }
                  AsyncStorage.setItem('user_id',this.props.user.userdata.user_id);
                  this.props.onUpdateUserId(this.props.user.userdata.user_id);
                  let userdata = {};
                  Object.assign(userdata,{"user_id":this.props.user.userdata.user_id});
                  Object.assign(userdata,{"user_name": this.refs.nameText.getInputTextValue("name")});
                  Object.assign(userdata,{"user_email":this.props.user.userdata.user_email});
                  Object.assign(userdata,{"user_mobile":this.props.user.userdata.user_mobile});
                  Object.assign(userdata,{"user_gender":this.props.user.userdata.user_gender});
                  Object.assign(userdata,{"user_dob":this.props.user.userdata.user_dob});
                  Object.assign(userdata,{"user_married":this.props.user.userdata.user_married});
                  Object.assign(userdata,{"user_family_members":this.props.user.userdata.user_family_members});
                  Object.assign(userdata,{"user_vegitarian":this.props.user.userdata.user_vegitarian});
                  this.props.onUpdateUser(userdata);
                  this.props.addNewAddress(res.data.data);

                  console.log("response address...",res.data.data)
              
              
                if(this.props.navigation.getParam('view_profile') == 0){
                
                
                    this.props.navigation.navigate('HomeBottomtabs');
                  //    this.props.navigation.pop();
        
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
              console.log("my error",error);
              this.setState({isLoading:false});
              Alert.alert(
                'Error',
                'Check Your Internet connection and again later!',
                [
            
                {text: 'OK', onPress: () => console.log("ok")},
                
                ], 
                { cancelable: false }
                )
          });
      
        }
      
       
  
  
         // this.props.navigation.navigate('Bottomtabs');
      }
      
  

    render() {
      
      return(

          

            <FullSCreenSpinnerAndDismissKeyboardView 
            refreshing={false}
            spinner={this.state.isLoading}
            >
              
            <KeyboardAwareScrollView>

            <View style={{  justifyContent: 'center',alignItems: 'center',marginBottom:0}}>
                 {/* <GooglePlacesInput ref="details" setAddressCallBack={(response) => this.setAddressFromGoogleAutoComplete(response)}/>
                  */}
                 {/* <GooglePlacesAutocomplete
                    placeholder='Search Location'
                    minLength={2} // minimum length of text to search
                    autoFocus={true}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed={'auto'}  // true/false/undefined
                    fetchDetails={true}
                    textInputProps={{
                      onFocus: () => this.setState({showPlacesList: 'auto'},()=>{
                        console.log("on focus....")
                      }),
                      onBlur: () => this.setState({showPlacesList: false},()=>{
                        console.log("on Blurrrrr");
                      }),
                   }}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log("map data details",details);
                        this.setState({showPlacesList:false})
                        console.log("map data",data);
                       
                      // console.log("map details",details);
                      // this.props.onAdd(details)
                       this.setAddressFromGoogleAutoComplete(details);
                      // this.setState({details:details});

                    }}

                    getDefaultValue={() => ''}

                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      //key: 'AIzaSyBx5f8NnFiA2kEv7ZcFJVtUs0_6TfZaMPw',
                      key: 'AIzaSyDBxQEvhACIZ73YCvPF9fI7A2l6lULic0E',
                      language: 'en', // language of the results
                      types: 'geocode' // default: 'geocode'
                    }}

                    styles={{
                      textInputContainer: {
                        width: '97%',
                        borderRadius:7,
                        alignSelf:"center",
                        marginTop:10
                        
                      },
                      description: {
                        fontWeight: 'bold'
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb'
                      },
                      row:{
                        width:"97%"
                      }
                    }}

                      //		currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    //	currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        types: 'food'
                    }}

                    filterReverseGeocodingByTypes={['political', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    renderLeftButton={()  => <Image source={require('../Assets/search2.png')} style={{width:30 ,height:30,alignSelf:"center",marginLeft:5}}/>}
                    // renderRightButton={() => <Text>Custom text after the input</Text>}
                  /> */}
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
                      <Text style={{color:'#808080',fontSize: 14,fontFamily:"roboto-bold",}}>Name*</Text>
                  </View>
                  <CustomTextInput 
                      ref="nameText"
                       inputType="name"
                      placeholder="Enter Name" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                      ///onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />
                  
                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontSize: 14,fontFamily:"roboto-bold",}}>City*</Text>
                  </View>
                  <CustomTextInput 
                      inputType="city"
                      ref="cityText"
                      placeholder="Enter City" 
                      customTxtInputStyle={{color:'black'}}
                      editable={this.state.city_disabled}
                      placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontSize: 14,fontFamily:"roboto-bold",}}>Locality*</Text>
                  </View>
                  <CustomTextInput 
                       inputType="locality" 
                       ref="localityText"
                       editable={this.state.locality_disabled}
                       customTxtInputStyle={{color:'black'}}
                      placeholder="Enter Locality" 
                      placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                  <View style={{marginLeft:0,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                      <Text style={{color:'#808080',fontSize: 14,fontFamily:"roboto-bold",}}>Street*</Text>
                  </View>
                  <CustomTextInput 
                       inputType="street"
                       ref="street"
                      placeholder="Enter Street" 
                      placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                   //   onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />
                  {/* <CustomButton 
                    onPressHandler={()=> this.continueButtonHandler()}
                    customButttonStyle={{backgroundColor:"#FD8D45"}}
                    customTextStyle={{ color:'#48241e'}} 
                    text="  CONTINUE  "
                  /> */}
                  <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontSize: 14,fontFamily:"roboto-bold",}}>House Number*</Text>
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
                      <Text style={{color:'#808080',fontSize: 14, fontFamily:'roboto-bold',}}>Floor No.*</Text>
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
                      <Text style={{color:'#808080',fontSize: 14, fontFamily:'roboto-bold',}}>Pincode*</Text>
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
                      <Text style={{color:'#808080',fontSize: 14, fontFamily:'roboto-bold',}}>Landmark</Text>
                    </View>
                    <CustomTextInput 
                      inputType="landmark"
                      ref="landmark"
                      placeholder="Enter Landmark" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                    
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                    {this.state.location_update == 1
                    ?
                      <CheckBox
                      title='Make this address as Delivery Address'
                      checked={this.state.is_primary}
                      onPress={() => this.setState({is_primary: !this.state.is_primary})}
                    />
                    :
                      <View/>
                    }
                   

                <CustomButton 
                   onPressHandler={()=>this.onSubmitHandler()}
                   customButttonStyle={{ marginTop:20,marginBottom:40}}
                   customTextStyle={{ color:'white'}} 
                   text="SUBMIT"
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



