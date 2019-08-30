import React ,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList,Picker} from 'react-native';
import * as HOC from '../../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import CustomLogo  from '../../../CustomUI/Logo/CustomLogo';
import AsyncStorage from '@react-native-community/async-storage';
import CustomTextInput from '../../../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../../../CustomUI/CustomButton/CustomButton';
var { height } = Dimensions.get('window');
import DatePicker from 'react-native-datepicker';
import Create_AccountStyle from '../../../Create_Account/Create_AccountStyle';


export default class UpdateProfile extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Update Profile",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      });
    


    constructor(props){
        super(props);

        this.state= {
            date:new Date(),
            gender:[
                {"0":"Male",},
                {"1":"Female"}
            ],
            Married:[
                {"0":"Yes",},
                {"1":"NO"}
            ]
        }
    }

    continueButtonHandler = () =>{

        this.props.navigation.navigate('UpdateProfileContinue');
    }
    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView>

                <View style={{margin:"5%",}}>  

                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>
                            Name*
                        </Text>
                    </View> 
                    <CustomTextInput
                        inputType="name"
                        placeholder="Enter Name"
                        placeholderTextColor='#898785'
                        returnKeyType = { "next" }
                    />
                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>
                            Email*
                        </Text>
                    </View> 
                    <CustomTextInput
                        inputType="email"
                        placeholder="Enter Email"
                        placeholderTextColor="#898785"
                        returnKeyType={"next"} />

                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>Gender*</Text>
                    </View>
                    <View style={{alignSelf:"center",marginBottom:20,height: 50, width:"90%",marginTop:10,borderRadius: 1, 
                        borderWidth: 1, 
                        padding:0,
                        borderColor: 'black',
                        overflow: 'hidden'}}>
                        <Picker
                            selectedValue={this.state.gender}
                            style={{marginLeft:10}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({gender: itemValue})
                            }>
                            <Picker.Item label="Male" value="java" />
                            <Picker.Item label="Female" value="js" />
                        </Picker>
                    </View>
                   

                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>Date Of Birth</Text>
                    </View>
                    <DatePicker
                        style={{width: "80%",alignSelf:"center",marginTop:15,marginBottom:15}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate={this.state.date}
                        // maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            right:10,
                            top: 4,
                            marginLeft: 0,
                            marginRight:25
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                     <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>Married</Text>
                    </View>
                    <View style={{alignSelf:"center",marginBottom:20,height: 50, width:"90%",marginTop:10,borderRadius: 1, 
                        borderWidth: 1, 
                        padding:0,
                        borderColor: 'black',
                        overflow: 'hidden'}}>
                        <Picker
                            selectedValue={this.state.Married}
                            style={{marginLeft:10}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({Married: itemValue})
                            }>
                            <Picker.Item label="NO" value="NO" />
                            <Picker.Item label="YES" value="YES" />
                        </Picker>
                    </View>
                   

                        <CustomButton 
                        onPressHandler={()=> this.continueButtonHandler()}
                        customButttonStyle={{backgroundColor:"#FD8D45", marginTop:20}}
                        customTextStyle={{ color:'#48241e'}} 
                        text="CONTINUE"
                    />
                   
                </View>
                


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