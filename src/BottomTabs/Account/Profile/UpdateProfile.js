import React ,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList,Picker,Alert,Platform} from 'react-native';
import * as HOC from '../../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import { CheckBox } from 'react-native-elements'
import CustomTextInput from '../../../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../../../CustomUI/CustomButton/CustomButton';
var { height } = Dimensions.get('window');
import DatePicker from 'react-native-datepicker';
import Create_AccountStyle from '../../../Create_Account/Create_AccountStyle';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ApiUrl from '../../../Api/ApiUrl';
import RNPickerSelect from 'react-native-picker-select';
import Axios from 'axios';
import { userData } from '../../../redux/store/actions/userDataAction';




 class UpdateProfile extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Update Profile",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: {  color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        fontSize: 17,
        },
        headerTintColor: 'white',
        headerTitleContainerStyle: {
            left: 0, // THIS RIGHT HERE
          },
      });
    


    constructor(props){
        super(props);

        this.state= {
            date:this.getFormattedDate(new Date()),
            gender:1,
            Married:1,
            genderData:[{label:"Male",value:1},{label:"Female",value:2}],
            marriedData:[{label:"YES",value:1},{label:"NO",value:2}],

            vegetarian:1,
            vegitarianData:[{label:"NO",value:1},{label:"YES",value:2}],
            terms:false,
            isLoading:false
           
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

        if(this.props.user.userdata.user_family_members !== null && this.props.user.userdata.user_family_members !== "null" && this.props.user.userdata.user_family_members !== undefined && this.props.user.userdata.user_family_members !== ""){
          
            this.refs.family_members.setTextInputValue(this.props.user.userdata.user_family_members ,'family_members');
        }
        if(this.props.user.userdata.user_vegitarian !== null && this.props.user.userdata.user_vegitarian !== "null" && this.props.user.userdata.user_vegitarian !== undefined && this.props.user.userdata.user_vegitarian !== ""){
            this.setState({vegetarian:this.props.user.userdata.user_vegitarian})
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

    updateProfileHandler = () => {

        if(this.refs.name.getInputTextValue("name") !== "invalid" &&  this.refs.email.getInputTextValue("email")){
        

            if(this.state.terms){

            
                var family = "";
                if(this.refs.family_members.getInputTextValue("family_members") === "invalid"){
                    family = "";
                    Alert.alert(
                        'Update Profile',
                        'Please Enter Family Members',
                        [
                    
                        {text: 'OK', onPress: () => {console.log("ok")}},
                        ], 
                        { cancelable: false }
                        )    
                }else{
                    this.setState({isLoading:true});
                    family = this.refs.family_members.getInputTextValue("family_members");
                
                    var formdata = new FormData();
                    formdata.append("user_id",this.props.user.userdata.user_id);
                    formdata.append("email",this.refs.email.getInputTextValue("email"));
                    formdata.append("name",this.refs.name.getInputTextValue("name"));
                    formdata.append("gender",this.state.gender);
                    formdata.append("dob",this.state.date);
                    formdata.append('married',this.state.Married);
                    formdata.append("family_members",family);
                    formdata.append("vegitarian",this.state.vegetarian);
                    Axios.post(ApiUrl.baseurl+ApiUrl.update_profile,formdata).then(res => {
                        
                        console.log("response data update profile continue",res)
                        this.setState({isLoading:false});
        
                        if(res.data.error){
        
                        
                            Alert.alert(
                                'Update Profile',
                                'Something went wrong! Please try again later.',
                                [
                            
                                {text: 'OK', onPress: () => {console.log("ok")}},
                                ], 
                                { cancelable: false }
                                )    
                            
                        }else{
        
                        
                        
                            let userdata = {};
                            Object.assign(userdata,{"user_id":JSON.stringify(res.data.result.id)});
                            Object.assign(userdata,{"user_name": res.data.result.name});
                            Object.assign(userdata,{"user_email":res.data.result.email});
                            Object.assign(userdata,{"user_mobile":res.data.result.mobile});   
                            Object.assign(userdata,{"user_gender":res.data.result.gender});
                            Object.assign(userdata,{"user_dob":res.data.result.dob});
                            Object.assign(userdata,{"user_married":res.data.result.married});
                            Object.assign(userdata,{"user_family_members":res.data.result.family_members});
                            Object.assign(userdata,{"user_vegitarian":res.data.result.vegitarian});
                        
            
        
                            
                            this.props.onUpdateUser(userdata);
            
                        
                            Alert.alert(
                                'Update Profile',
                                'Profile Updated Successfully!',
                                [
                            
                                {text: 'OK', onPress: () => {console.log("ok")}},
                                ], 
                                { cancelable: false }
                                )    
                            this.props.navigation.navigate('ViewProfile');
                
                        }
        
                    
                    }).catch(error => {

                        this.setState({isLoading:false});
                        Alert.alert(
                            'Error',
                            'Check Your Network Connection!',
                            [
                        
                            {text: 'OK', onPress: () => {console.log("ok")}},
                            ], 
                            { cancelable: false }
                            )    
                        console.log("on error",error); 
            
            
                    });
                }

            
        
            }else{
                
                Alert.alert(
                    'Update Profile',
                    'Please Accepts Terms and Condition !',
                    [
                
                    {text: 'OK', onPress: () => {console.log("ok")}},
                    ], 
                    { cancelable: false }
                    )    
            }
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
            <FullSCreenSpinnerAndDismissKeyboardView refreshing={false} style={styles.container} spinner={this.state.isLoading}>
                <KeyboardAwareScrollView>

                    <Text style={styles.labelText}>Name * </Text>
                    <CustomTextInput
                        ref="name"
                        inputType="name"
                        placeholder="Enter Name"
                        placeholderTextColor='#898785'
                        returnKeyType = { "next" }
                    />
                     <Text style={styles.labelText}>Email * </Text>
                     <CustomTextInput
                        inputType="email"
                        ref="email"
                        placeholder="Enter Email"
                        placeholderTextColor="#898785"
                        returnKeyType={"next"} />

                    <Text style={styles.labelText}>Gender * </Text>
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
                                style={{marginLeft:5}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({gender: itemValue})
                                }>
                                <Picker.Item label="Male" value={1} />
                                <Picker.Item label="Female" value={2} />
                            </Picker>
                        </View>)


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
                    }
                    <Text style={styles.labelText}>Date Of Birth * </Text>
                    <DatePicker
                        style={{width: "95%",alignSelf:"flex-start",marginTop:10,borderColor:"black",marginBottom:10}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        maxDate={this.state.date}
                        minDate="1970-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('../../../Assets/calendar2.png')}
                        customStyles={{
                          
                        dateIcon: {
                            width:25,
                            height:25,
                           
                        },
                        dateInput: {
                            marginLeft: 20,
                            borderColor:'black',
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <Text style={styles.labelText}>Married * </Text>

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
                            style={{marginLeft:5}}
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

                    <Text style={styles.labelText}>Family Members * </Text>
                    <CustomTextInput 
                        ref="family_members"
                        inputType="family_members"
                        placeholder="Enter Family Members"
                        placeholderTextColor='#898785'
                        returnkeyType={"next"}
                        />

                    <Text style={styles.labelText}>Vegetarian*</Text>
                    {Platform.OS === 'android'
                    ?
                        <View style={{alignSelf:"center",marginBottom:10,height: 50, width:"90%",borderRadius: 1, 
                            borderWidth: 1, 
                            padding:0,
                            borderColor: 'black',   
                            marginTop:10,
                            overflow: 'hidden'}}>
                            <Picker
                                selectedValue={(this.state && this.state.vegetarian) || 1}
                                style={{marginLeft:5, marginRight:0,textAlign:"center",paddingLeft:10}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({vegetarian: itemValue})
                                }>
                                <Picker.Item label="No" value={1} />
                                <Picker.Item label="Yes" value={2} />
                            </Picker>
                        </View>
                    :

                        <RNPickerSelect
                        placeholder={{}}
                        value={(this.state && this.state.vegetarian) || 1}
                        onValueChange={(itemValue) => this.setState({vegetarian: itemValue})}
                        items={this.state.vegitarianData}
                        style={
                        pickerSelectStyles
                        }
                        />

                    }    

                <View style={{marginLeft:10,marginRight:10}}>
                    <CheckBox
                        title='You specifically understand and agree  that by using APP you authorize House Of Desi and its affiliates & Partners to contact you in case.'
                        checked={this.state.terms}
                        onPress={() => this.setState({terms: !this.state.terms})} />
                </View>
              
               
                <CustomButton 
                     onPressHandler={()=> this.updateProfileHandler()}
                    customButttonStyle={{marginBottom:40,marginTop:20}}
                    customTextStyle={{ color:'white'}} 
                    text="  SUBMIT  "/>
               






             


                </KeyboardAwareScrollView>
            </FullSCreenSpinnerAndDismissKeyboardView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onUpdateUser: (userdata) => {
        dispatch(userData(userdata))
      }
    }
  }


const mapStateToProps = state => {
    return {
      user: state.userdata,
    
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
const styles =  StyleSheet.create({


    container:{
        flex:1,
        backgroundColor:'#fff',
        marginLeft:0,
        marginRight:0,
        marginTop:15,
       
    },

   
    labelText:{
        fontFamily:"roboto-light",
        color:'grey',
        fontSize: 17,
        marginLeft:15
    },
    inputIOS: {
        fontFamily:"roboto-light",
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
      width:"95%",
      marginRight:20,
      alignSelf:"center",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      margin:10,
      width:"95%",
      paddingHorizontal: 10,
      paddingVertical:0,
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
  