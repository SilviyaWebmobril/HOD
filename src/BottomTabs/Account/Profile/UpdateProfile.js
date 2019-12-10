import React ,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList,Picker,Alert,Platform} from 'react-native';
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
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IOSPicker from 'react-native-ios-picker';
import RNPickerSelect from 'react-native-picker-select';
import DeviceInfo from 'react-native-device-info';



 class UpdateProfile extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Update Profile",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white',fontSize:17,flex:1 },
        headerTintColor: 'white'
      });
    


    constructor(props){
        super(props);

        this.state= {
            date:this.getFormattedDate(new Date()),
            gender:1,
            Married:1,
            genderData:[{label:"Male",value:1},{label:"Female",value:2}],
            marriedData:[{label:"YES",value:1},{label:"NO",value:2}]
           
        }
    }       


    componentDidMount() {

        console.log("user name ",this.props.user.userdata);

        if(this.props.user.userdata.user_name !== null && this.props.user.userdata.user_name !== "null" && this.props.user.userdata.user_name !== undefined && this.props.user.userdata.user_name !== ""){
  
        this.refs.name.setTextInputValue(this.props.user.userdata.user_name ,'name');
        }
        if(this.props.user.userdata.user_gender !== null && this.props.user.userdata.user_gender !== "null" && this.props.user.userdata.user_gender !== undefined && this.props.user.userdata.user_gender !== ""){
            this.setState({gender:this.props.user.userdata.user_gender})
        }
        if(this.props.user.userdata.user_dob !== null && this.props.user.userdata.user_dob !== "null" && this.props.user.userdata.user_dob !== undefined && this.props.user.userdata.user_dob !== ""){
           this.setState({date:this.props.user.userdata.user_dob})
        }
        if(this.props.user.userdata.user_married !== null && this.props.user.userdata.user_married !== "null" && this.props.user.userdata.user_married !== undefined && this.props.user.userdata.user_married !== ""){
            this.setState({Married:this.props.user.userdata.user_married})
        }

    }

    getFormattedDate(date){
        return  date.getFullYear()+'-'+"0"+(date.getMonth()+1)+'-'+"0"+date.getDate();
    }

    continueButtonHandler = () =>{

        console.log("gender",this.state.gender)
        if(this.refs.name.getInputTextValue("name") !== "invalid" ){

            this.props.navigation.navigate('UpdateProfileContinue',{"name":this.refs.name.getInputTextValue("name"),
                                 
                                    "gender":this.state.gender,
                                    "dob":this.state.date,
                                     "married":this.state.Married});
        }else{
           
            Alert.alert(
                'Update Profile',
                'All * marked fields are compulsory!',
                [
             
                {text: 'OK', onPress: () => {console.log("ok")}},
                ], 
                { cancelable: false }
                )    
        }

        
     
    }
    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView refreshing={false}>
                <KeyboardAwareScrollView>

                <View style={{margin:"5%",}}>  
                    {
                        DeviceInfo.isTablet() 
                        ?
                        <View style={styles.labelTextViewTab}>
                            <Text style={styles.labelText}>
                                Name*
                            </Text>
                        </View> 
                        :
                        <View style={styles.labelTextView}>
                            <Text style={styles.labelText}>  Name*  </Text>
                        </View> 
                    }
                  
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

                    {
                        DeviceInfo.isTablet() 
                        ?
                        <View style={styles.labelTextViewTab}>
                            <Text style={styles.labelText}>  Gender* </Text>
                        </View>

                        :
                        <View style={styles.labelTextView}>
                            <Text style={styles.labelText}>   Gender*  </Text>
                        </View>

                    }

                   
                    {Platform.OS ===  'android'

                        ?

                        (<View style={{alignSelf:"center",marginBottom:20,height: 50,marginTop:10,borderRadius: 1, 
                        borderWidth: 1, 
                        padding:0,
                        width:"90%",
                        borderColor: 'black',
                        overflow: 'hidden'}}>
                            <Picker
                                selectedValue={(this.state && this.state.gender) || 1}
                                style={{marginLeft:10}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({gender: itemValue})
                                }>
                                <Picker.Item label="Male" value={1} />
                                <Picker.Item label="Female" value={2} />
                            </Picker>
                        </View>)

                        //<View/>

                    :

                    <RNPickerSelect
                    placeholder={{}}
                    value={(this.state && this.state.gender) || 1}
                    onValueChange={(itemValue) => this.setState({gender: itemValue})}
                    items={this.state.genderData}
                    style={
                     pickerSelectStyles
                      }
                    />

                    //<View/>
                  


                
                }

                {DeviceInfo.isTablet() 
                    ?
                    <View style={styles.labelTextViewTab}>
                        <Text style={styles.labelText}> Date Of Birth </Text>
                    </View>
                    :
                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>  Date Of Birth*  </Text>
                    </View>

                }
                    


                   
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

                    {DeviceInfo.isTablet() 
                    ?
                    <View style={styles.labelTextViewTab}>
                    <Text style={styles.labelText}>  Married  </Text>
                    </View>
                    :
                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>  Married*  </Text>
                    </View>

                    }
                   
                    {Platform.OS ===  'android'
                    ?

                    <View style={{alignSelf:"center",marginBottom:20,height: 50,marginTop:10,borderRadius: 1, 
                        borderWidth: 1, 
                        padding:0,
                        width:"90%",
                        borderColor: 'black',
                        overflow: 'hidden'}}>
                        <Picker
                            style={{height: 100, width: 100}}
                            selectedValue={(this.state && this.state.Married) || 1}
                            style={{marginLeft:10}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({Married : itemValue})
                            }>
                            <Picker.Item label="NO" value={2} />
                            <Picker.Item label="YES" value={1} />
                        </Picker>
                    </View>

                    :

                    <RNPickerSelect
                    
                    value={(this.state && this.state.Married) || 1}
                    onValueChange={(itemValue) => this.setState({Married: itemValue})}
                    items={this.state.marriedData}
                    style={
                     pickerSelectStyles
                      }
                    />

                        
                    }
                    

                        <CustomButton 
                        onPressHandler={()=> this.continueButtonHandler()}
                        customButttonStyle={{backgroundColor:"#FD8D45", marginTop:20}}
                        customTextStyle={{ color:'#48241e'}} 
                        text="  CONTINUE "
                    />

                    </View>




                </KeyboardAwareScrollView>

               

            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}


const mapStateToProps = state => {
    return {
      user: state.userdata,
    
    }
  }


export default connect(mapStateToProps, null)(UpdateProfile);
const styles =  StyleSheet.create({

    labelTextView:{
        width:'90%',
        marginLeft:20,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    labelTextViewTab:{
        width:'90%',
        marginLeft:40,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    labelText:{
        color:'#808080',
        fontWeight: 'bold',
        fontSize: 17,
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },


});



const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 0,
      color: 'black',
      margin:20,
      marginLeft:20,
      width:"90%",
      marginRight:20,
      alignSelf:"center",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      margin:20,
      width:"90%",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      marginLeft:20,
      marginRight:20,
      alignSelf:"center",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  