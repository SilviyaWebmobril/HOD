import React ,{Component} from 'react';
import {StyleSheet,View,Text,Picker,Alert} from 'react-native';
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


class UpdateProfileContinue extends Component{

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Update Profile",
        headerStyle: { backgroundColor: '#FD8D45' },
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white'
      });

      constructor(props){
          super(props);
          this.state ={
            vegetarian:1,
            terms:false,
            isLoading:false
            
          }
      }


      updateProfileHandler = () => {

        if(this.state.terms){

            this.setState({isLoading:true});
            var family =0;
            if(this.refs.family_members.getInputTextValue("family_members") === "invalid"){
                family =0;
            }else{
                family = this.refs.family_members.getInputTextValue("family_members");
            }

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

                    Alert.alert("Something went wrong! Please try again later.");
                    
                }else{

                    AsyncStorage.setItem('user_id',JSON.stringify(res.data.result.id))
                    AsyncStorage.setItem("user_name", res.data.result.name)
                    AsyncStorage.setItem("user_email", res.data.result.email)
                    AsyncStorage.setItem('user_mobile',res.data.result.mobile)
                   
    
                    let userdata = {};
                    Object.assign(userdata,{"user_id":JSON.stringify(res.data.result.id)});
                    Object.assign(userdata,{"user_name": res.data.result.name});
                    Object.assign(userdata,{"user_email":res.data.result.email});
                    Object.assign(userdata,{"user_mobile":res.data.result.mobile});   
                    Object.assign(userdata,{"user_address":res.data.result.homeaddress});
                    this.props.onUpdateUser(userdata);
    
                    Alert.alert("Profile Updated Successfully!");
                    this.props.navigation.navigate('ViewProfile');
        
                }

              
            }).catch(error => {
                this.setState({isLoading:false});
                console.log("on error",error); 
    
    
            });
    
        }else{
            Alert.alert("Please Accepts Terms and Condition !");
        }
       
      }
    

    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView spinner={this.state.isLoading} style={styles.container}>

             
                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>Family Members</Text>
                    </View>
                    <CustomTextInput 
                        ref="family_members"
                        inputType="family_members"
                        placeholder="Enter Family Members"
                        placeholderTextColor='#898785'
                        returnkeyType={"next"}
                        />
               
                    <View style={styles.labelTextView}>
                        <Text style={styles.labelText}>Vegetarian</Text>
                    </View>
             
                <View style={{alignSelf:"center",marginBottom:10,height: 50, width:"90%",borderRadius: 1, 
                    borderWidth: 1, 
                    padding:0,
                    borderColor: 'black',   
                    marginTop:10,
                    overflow: 'hidden'}}>
                    <Picker
                        selectedValue={this.state.vegetarian}
                        style={{marginLeft:10, marginRight:10,}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({vegetarian: itemValue})
                        }>
                        <Picker.Item label="No" value="1" />
                        <Picker.Item label="Yes" value="1" />
                    </Picker>
                </View>

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
                    text="SUBMIT"/>
                   
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
    labelText:{
        color:'#808080',
        fontWeight: 'bold',
        fontSize: 17,
    }

});