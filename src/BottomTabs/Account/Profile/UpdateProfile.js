import React ,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList,Picker,Alert} from 'react-native';
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
            date:this.getFormattedDate(new Date()),
            gender:1,
            Married:1
           
        }
    }       

    getFormattedDate(date){
        return  date.getFullYear()+'-'+"0"+(date.getMonth()+1)+'-'+"0"+date.getDate();
    }

    continueButtonHandler = () =>{

        if(this.refs.name.getInputTextValue("name") !== "invalid" ){

            this.props.navigation.navigate('UpdateProfileContinue',{"name":this.refs.name.getInputTextValue("name"),
                                 
                                    "gender":this.state.gender,
                                    "dob":this.state.date,
                                     "married":this.state.Married});
        }else{
            Alert.alert("All * marked values are compulsory");      
        }

        
     
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
                        ref="name"
                        inputType="name"
                        placeholder="Enter Name"
                        placeholderTextColor='#898785'
                        returnKeyType = { "next" }
                    />
                    {/* <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>
                            Email*
                        </Text>
                    </View> 
                    <CustomTextInput
                        inputType="email"
                        ref="email"
                        placeholder="Enter Email"
                        placeholderTextColor="#898785"
                        returnKeyType={"next"} /> */}

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
                            <Picker.Item label="Male" value="1" />
                            <Picker.Item label="Female" value="2" />
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
                        format="YYYY-MM-DD"
                        maxDate={this.state.date}
                        minDate="1970-01-01"
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
                                this.setState({Married : itemValue})
                            }>
                            <Picker.Item label="NO" value="2" />
                            <Picker.Item label="YES" value="1" />
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