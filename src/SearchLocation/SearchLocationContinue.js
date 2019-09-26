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
import { userData ,userAddress, addNewAddress,getUserId} from '../redux/store/actions/userDataAction';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'

 class SeacrhLocationContinue extends Component { 

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
            user_id:"",
            location_update:"",
            is_primary:false



        }
        
      
     
        
    }

    componentDidMount = async() => {

    
    
      
      this.setState({user_id:this.props.user.userdata.user_id});
      

      const { navigation } = this.props;
      const postal_code = navigation.getParam('postal_code', '');
      this.setState({name:navigation.getParam("name")});
      const city = navigation.getParam('city', '');
      const state = navigation.getParam('state', '');
      const locality = navigation.getParam('locality', '');
      const street = navigation.getParam("street",'');
      const latitude = navigation.getParam("latitude","");
      const longitude = navigation.getParam("longitude","");
      const full_address = navigation.getParam("full_address","");
     
      this.setState({location_update :navigation.getParam("location_update")})
      
      this.setState({street:street});
      this.setState({city:city});
      this.setState({"locality":locality});
      this.setState({"state":state})
      this.setState({latitude:latitude});
      this.setState({longitude:longitude});
      
      if(full_address == "" ){

        var fulladdress = street+" "+locality+" "+city;
        this.setState({full_address:fulladdress});

      }else{
        this.setState({full_address:full_address});

      }
    
      

    }

    onSubmitHandler =() => {

      var is_primary ;
      if(this.state.location_update == 1 ){
        is_primary = 1
      }else{
        if(this.state.is_primary){
          is_primary = 1;
        }else{
          is_primary = 0;
        }
     
      }
    
      axios.post(ApiUrl.baseurl+ApiUrl.setLocation+this.state.user_id+"&name="+this.state.name+"&city="+this.state.city+"&locality="+this.state.locality+
      "&street="+this.state.street+"&ho_no="+this.refs.houseno.getInputTextValue("houseno")+"&latitude="+this.state.latitude+"&longitude="+this.state.longitude+
      "&full_address="+this.state.full_address+"&landmark="+this.refs.landmark.getInputTextValue("landmark")+"&pin_code="+this.refs.postal_code.getInputTextValue("pincode")+"&floor_no="+this.refs.floorno.getInputTextValue("floorno")+"&is_primary="+is_primary)
      .then(res => {
        
      
        
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

          if(this.state.is_primary){

            // updating primary address 
            this.props.onUpdateAddress(this.state.full_address+","+this.refs.postal_code.getInputTextValue("pincode"));  
          }
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
         
         
         if(this.state.location_update == 1 ){
          
           
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
        console.log("my error",error)
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

                    {this.state.location_update == 2
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


const mapStateToProps = state => {
  return {
  
    user:state.userdata
  }
}



const mapDispatchToProps = dispatch => {
  return {
      
    onUpdateUser: (userdata) => {
      dispatch(userData(userdata))
    },
    onUpdateUserId: (id) => {
      dispatch(getUserId(id))
    },
      onUpdateAddress : (address) => {
        
          dispatch(userAddress(address))
      },
      addNewAddress :(address) =>{
        dispatch(addNewAddress(address))
      }
  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SeacrhLocationContinue)