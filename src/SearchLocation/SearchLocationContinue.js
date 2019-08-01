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
                        onFocus={()=>this.setState({isFocusedHouse:true})}
                        onBlur={()=>this.setState({isFocusedHouse:false})}
                        customTxtInputStyle={[{
                            borderColor: this.state.isFocusedHouse
                                ? '#FD8D45'
                                : 'black',
                            borderWidth: this.state.isFocusedHouse
                            ? 1.5 
                            : 1,
                            marginBottom:-25,
                            }]}
                        placeholder="Enter House" placeholderTextColor='#898785'
                        returnKeyType = { "next" }
                        //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                    />

                    <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Fill the floor No.*
                      </Text>
                    </View>
                    <CustomTextInput 
                      onFocus={()=>this.setState({isFocusedFloor:true})}
                      onBlur={()=>this.setState({isFocusedFloor:false})}
                      customTxtInputStyle={[{
                          borderColor: this.state.isFocusedFloor
                              ? '#FD8D45'
                              : 'black',
                          borderWidth: this.state.isFocusedFloor
                          ? 1.5 
                          : 1,
                          marginBottom:-25,
                          }]}
                      placeholder="Enter Floor No." placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                    <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Pincode*
                      </Text>
                    </View>
                    <CustomTextInput 
                      onFocus={()=>this.setState({isFocusedPincode:true})}
                      onBlur={()=>this.setState({isFocusedPincode:false})}
                      customTxtInputStyle={[{
                          borderColor: this.state.isFocusedPincode
                              ? '#FD8D45'
                              : 'black',
                          borderWidth: this.state.isFocusedPincode
                          ? 1.5 
                          : 1,
                          marginBottom:-25,
                          }]}
                      placeholder="Enter Pincode" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                      //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                    <View style={{width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',marginLeft:0}}>
                      <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                          Landmark
                      </Text>
                    </View>
                    <CustomTextInput 
                      onFocus={()=>this.setState({isFocusedLandmark:true})}
                      onBlur={()=>this.setState({isFocusedLandmark:false})}
                      customTxtInputStyle={[{
                          borderColor: this.state.isFocusedLandmark
                              ? '#FD8D45'
                              : 'black',
                          borderWidth: this.state.isFocusedLandmark
                          ? 1.5 
                          : 1,
                          marginBottom:-25,
                          }]}
                      placeholder="Enter Landmark" placeholderTextColor='#898785'
                      returnKeyType = { "next" }
                     // onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                  />

                <CustomButton 
                   
                   customButttonStyle={{backgroundColor:"#FD8D45", }}
                   customTextStyle={{ color:'#48241e'}} 
                   text="SUBMIT"
                 />
                 




                </View>

            </ScrollView>



            </FullSCreenSpinnerAndDismissKeyboardView>


        )
    }

}


