import React ,{Component} from 'react';
import {View ,StyleSheet,Text} from 'react-native';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import SearchLocationStyle from './SearchLocationStyle';
import * as HOC from '../HOC/mainHoc';

import { ScrollView } from 'react-native-gesture-handler';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);

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



        }
    }

    onSubmitHandler =() => {
        this.props.navigation.navigate('Bottomtabs');
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
                      placeholder="Enter Pincode" placeholderTextColor='#898785'
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


