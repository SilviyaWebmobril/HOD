import React ,{Component} from 'react';
import {StyleSheet,View,Text,Picker} from 'react-native';
import * as HOC from '../../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import AsyncStorage from '@react-native-community/async-storage';
import CustomTextInput from '../../../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../../../CustomUI/CustomButton/CustomButton';


export default class UpdateProfileContinue extends Component{

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Update Profile",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      });

      constructor(props){
          super(props);
          this.state ={
            vegetarian:[
                {"0":"Yes",},
                {"1":"No"}
            ]
            
          }
      }
    

    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView>

                <View style={{margin:"5%",}}>  
                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>Family Members</Text>
                    </View>
                    <CustomTextInput 
                        inputType="family"
                        placeholder="Enter Family Members"
                        placeholderTextColor='#898785'
                        returnkeyType={"next"}
                        />
                </View>

                <View style={styles.labelTextView}>
                    <Text style={styles.labelText}>Vegetarian</Text>
                </View>
                <View style={{alignSelf:"center",marginBottom:20,height: 50, width:"90%",marginTop:10,borderRadius: 1, 
                    borderWidth: 1, 
                    padding:0,
                    borderColor: 'black',
                    overflow: 'hidden'}}>
                    <Picker
                        selectedValue={this.state.vegetarian}
                        style={{marginLeft:10}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({vegetarian: itemValue})
                        }>
                        <Picker.Item label="No" value="No" />
                        <Picker.Item label="Yes" value="Yes" />
                    </Picker>
                </View>

                <CustomButton 

                    customButttonStyle={{backgroundColor:"#FD8D45", marginTop:20}}
                    customTextStyle={{ color:'#48241e'}} 
                    text="SUBMIT"/>
                   
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}

const styles =  StyleSheet.create({

    labelTextView:{
        width:'90%',
        marginLeft:20,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    labelText:{
        color:'#808080',
        fontWeight: 'bold',
        fontSize: 17,
    }

});