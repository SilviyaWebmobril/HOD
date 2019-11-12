import React ,{Component} from 'react';
import {View,Text,StyleSheet, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { isProgram } from '@babel/types';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import DatePicker from 'react-native-datepicker'
import ApiUrl from '../Api/ApiUrl';
import * as HOC from '../HOC/mainHoc';
import Axios from 'axios';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
    const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
    const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
    DismissKeyboardView
    );      
const today = new Date();
 
class VisitOfFarm extends Component{

  
    

    constructor(props){
        super(props);
        this.state={
            isFocusedSubject:false,
            isFocusedDate:false,
            isFocuseddate:false,
            isFocusedMessage:false,
            date: new Date(),
            time : today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            isLoading:false,

        }
    }

    formatDate =(date)=>{

        var newmonth;
        var new_date =  new Date(date);
        var day = new_date.getDate();
        var month = new_date.getMonth();
        var year = new_date.getFullYear();
        if(month <10){
            newmonth = "0"+month;
        }else{
            newmonth = month;
        }
        return year+"-"+newmonth+"-"+day;

    }


    onVisitHandler = async() =>{

       if(this.refs.message.getInputTextValue("message") !== "invalid" && this.refs.subject.getInputTextValue("subject") !== "invalid"){
            this.setState({isLoading:true});
            var formdata = new FormData();
            formdata.append("user_id",this.props.user.userdata.user_id);
            formdata.append("date",this.formatDate(this.state.date));
            formdata.append("time",this.state.time);
            formdata.append("message",this.refs.message.getInputTextValue("message"));
            formdata.append("subject",this.refs.subject.getInputTextValue("subject"));
            
            Axios.post(ApiUrl.baseurl + ApiUrl.vist_farm,formdata)
            .then(response => {

              
                this.setState({isLoading:false});
                if(response.data.error){

                    Alert.alert(
                        'Visit Of Farm Error',
                        'Something Went Wrong ! Please Try Again Later.',
                        [
                     
                        {text: 'OK', onPress: () => {console.log("ok")}},
                        ], 
                        { cancelable: false }
                        )
                }else{
                   
                    Alert.alert(
                        'Visit Of Farm',
                        'Request has been sent to the admin.',
                        [
                     
                        {text: 'OK', onPress: () => {this.resetTextInput()}},
                        ], 
                        { cancelable: false }
                        )
                }

            }).catch(error => {
                this.setState({isLoading:false});
                
                Alert.alert(
                    'Error',
                    'Check Your Internet connection and again later!',
                    [
                 
                    {text: 'OK', onPress: () => console.log("ok")},
                    
                    ], 
                    { cancelable: false }
                    )
                console.log("error on Visit",error);
            });
         }else{

          
            Alert.alert(
                'Visit Of Farm Error',
                'All * marked fields are compulsory!',
                [
             
                {text: 'OK', onPress: () => {console.log("ok")}},
                ], 
                { cancelable: false }
                )
         }

       }


       resetTextInput = () =>{

        this.refs.subject.resetTextInput("subject");
        this.refs.message.resetTextInput("message");
        var  date = new Date();
        var time1 = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        this.setState({date:date});
        this.setState({time:time1});


       }
        

    render(){

        return(
            <FullSCreenSpinnerAndDismissKeyboardView style={styles.container} refreshing={false} spinner={this.state.isLoading}>
                 <View  style={styles.headerView}>
                    <Text style={styles.textStyle}>  Visit Our Farm  </Text>
                </View> 
                <KeyboardAwareScrollView>

               
              
                    <View style={{marginBottom:30,}}>
                        
                        <View style={styles.addressView}>
                            <Text style={styles.textAddressStyle}>
                                Our Address: 23-D,N Block,
                            </Text>
                            <Text style={styles.textAddressStyle}>
                                Saket, New Delhi
                            </Text>

                        </View>
                        {DeviceInfo.isTablet()
                        ?
                        <View style={{marginLeft:40,marginTop:30,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 14,}}>   Subject*  </Text>
                        </View>
                        :
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 14,}}>  Subject*  </Text>
                        </View>
                        }

                        
                        <CustomTextInput 
                            inputType="subject"
                            placeholder="Enter Subject" placeholderTextColor='#898785'
                            ref="subject"
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        />
                        {DeviceInfo.isTablet() 
                        ?
                        <View style={{marginLeft:40,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 14,}}>
                                   Date*  
                            </Text>
                        </View>
                        :
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 14,}}>  Date*  </Text>
                        </View>
                        }
                      
                        {/* <CustomTextInput 
                            inputType="name"
                            placeholder="Enter Date" placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        /> */}

                        <DatePicker
                            style={{width: "80%",alignSelf:"center",marginBottom:10}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.date}
                           // maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />

                        {DeviceInfo.isTablet() 
                        ?
                        <View style={{marginLeft:40,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 14,}}>
                                 Time*
                            </Text>
                        </View>
                        :
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 14,}}>  Time*  </Text>
                        </View>
                        }

                        
                        <DatePicker
                            style={{width: "80%",alignSelf:"center",marginBottom:10}}
                            date={this.state.time}
                            mode="time"
                            placeholder="select date"
                            minTime={this.state.time}
                           // maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(time) => {this.setState({time: time})}}
                        />
                        {DeviceInfo.isTablet() 
                        ?
                        <View style={{marginLeft:40,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 14,}}>
                                    Message*     
                            </Text>
                        </View>
                        :
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 14,}}>  Message*  </Text>
                        </View>
                        }
                      
                        <CustomTextInput 
                            inputType="message"
                            customTxtInputStyle={{height:150}}
                            multiline={true}
                            ref="message"
                            placeholder="Enter Message" placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        />
                        <CustomButton text=" SUBMIT " 
                                onPressHandler={()=>this.onVisitHandler()} 
                                customButttonStyle={{backgroundColor:"#FD8D45", }}
                                customTextStyle={{ color:'#48241e'}} 
                            />

                    </View>
              

                </KeyboardAwareScrollView>
                
             
            </FullSCreenSpinnerAndDismissKeyboardView>
            
        );
    }
}


const styles =  StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'#fff',
       
    },
    headerView:{
        backgroundColor:"#FD8D45",
        height:60,
        width:"100%",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignContent:"center",
        justifyContent:"center"

    },
    textStyle:{
        fontSize:20,
        fontWeight:"bold",
        color:"white",
        alignSelf:"center",
        textAlign:"center",
    },
    addressView:{
        height:80,
        width:"100%",
        flexDirection:"column",
        backgroundColor:"#ececec",
        alignContent:"center",
        justifyContent:"center"

    },
    textAddressStyle:{

        fontSize:20,
        fontWeight:"bold",
        color:"grey",
        textAlign:"center",
        alignSelf:"center"

    },
    customtxtInput: {
        marginBottom:-25,
      },
});


mapStateToProps = (state) =>{

    return{
        user:state.userdata,
    }
    
}

export default connect(mapStateToProps,null)(VisitOfFarm);