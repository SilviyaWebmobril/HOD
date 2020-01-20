import React ,{Component} from 'react';
import {StyleSheet,View,Text,Picker,Alert, Platform} from 'react-native';
import * as HOC from '../../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import { CheckBox } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import CustomTextInput from '../../../CustomUI/CustomTextInput/CustomTextInput';
import CustomButton from '../../../CustomUI/CustomButton/CustomButton';
import Axios from 'axios';
import ApiUrl from '../../../Api/ApiUrl';
import {connect} from 'react-redux';
import { userData } from '../../../redux/store/actions/userDataAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import DeviceInfo from 'react-native-device-info';

class UpdateProfileContinue extends Component{

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Update Profile",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
        fontSize: 17,
        },
        headerTintColor: 'white'
      });

      constructor(props){
          super(props);
          this.state ={
            vegetarian:1,
            vegitarianData:[{label:"NO",value:1},{label:"YES",value:2}],
            terms:false,
            isLoading:false
            
          }
      }

      componentDidMount(){

        console.log("userdata family_members",this.props.userdata.userdata.user_family_members)
        if(this.props.userdata.userdata.user_family_members !== null && this.props.userdata.userdata.user_family_members !== "null" && this.props.userdata.userdata.user_family_members !== undefined && this.props.userdata.userdata.user_family_members !== ""){
          
            this.refs.family_members.setTextInputValue(this.props.userdata.userdata.user_family_members ,'family_members');
        }
        if(this.props.userdata.userdata.user_vegitarian !== null && this.props.userdata.userdata.user_vegitarian !== "null" && this.props.userdata.userdata.user_vegitarian !== undefined && this.props.userdata.userdata.user_vegitarian !== ""){
            this.setState({vegetarian:this.props.userdata.userdata.user_vegitarian})
        }
      }

      updateProfileHandler = () => {

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
                console.log("gender",this.props.navigation.getParam('gender'));
                console.log("married",this.props.navigation.getParam('married'));
                console.log("dob",this.props.navigation.getParam('dob'));

                var formdata = new FormData();
                formdata.append("user_id",this.props.userdata.userdata.user_id);
                formdata.append("name",this.props.navigation.getParam('name'));
                formdata.append("gender",this.props.navigation.getParam('gender'));
                formdata.append("dob",this.props.navigation.getParam('dob'));
                formdata.append('married',this.props.navigation.getParam('married'));
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
       
      }
    

    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView refreshing={false} spinner={this.state.isLoading} style={styles.container}>
                
                <KeyboardAwareScrollView>

                    {DeviceInfo.isTablet()
                    ?
                    <View style={styles.labelTextViewTab}>
                        <Text style={styles.labelText}>Family Members*</Text>
                    </View>
                    :
                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>Family Members*</Text>
                    </View>
                    }
                   
                    <CustomTextInput 
                        ref="family_members"
                        inputType="family_members"
                        placeholder="Enter Family Members"
                        placeholderTextColor='#898785'
                        returnkeyType={"next"}
                        />
               
               {DeviceInfo.isTablet()
                    ?
                    <View style={styles.labelTextViewTab}>
                        <Text style={styles.labelText}>Vegetarian</Text>
                    </View>
                    :
                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>Vegetarian*</Text>
                    </View>
                    }
                   

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
                            style={{marginLeft:10, marginRight:10,}}
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
                    customButttonStyle={{backgroundColor:"#FD8D45", marginTop:20}}
                    customTextStyle={{ color:'#48241e'}} 
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

const mapStateToProps = (state) => {
    return {
      userdata: state.userdata
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(UpdateProfileContinue)


const styles =  StyleSheet.create({

    container:{
        margin:"5%"
    },

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
        fontFamily:"Roboto-Light",
        color:'#808080',
        fontWeight: 'bold',
        fontSize: 17,
    }

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
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      margin:20,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  