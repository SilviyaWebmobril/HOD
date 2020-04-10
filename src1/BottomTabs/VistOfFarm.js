import React ,{Component} from 'react';
import {View,Text,StyleSheet, Alert,Picker, Platform} from 'react-native';
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
import RNPickerSelect from 'react-native-picker-select';
import capitilize from '../utility/helpers';
const today = new Date();
 
class VisitOfFarm extends Component{

   

    constructor(props){
        super(props);
        this.state={
            isFocusedSubject:false,
            isFocusedDate:false,
            isFocuseddate:false,
            isFocusedMessage:false,
            date: this.formatDate(new Date()),
            time : today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            isLoading:false,
            farm_address:"",
            addressData:[],
            selected_address:"",

        }
    }

    formatDate =(date)=>{

        var newmonth;
        var new_date =  new Date(date);
        var day = new_date.getDate();
        var month = new_date.getMonth();
        var year = new_date.getFullYear();
        if(month <10){
            newmonth = "0"+(month+1);
        }else{
            newmonth = month+1;
        }
        console.log(year+"-"+newmonth+"-"+day);
        return year+"-"+newmonth+"-"+day;

    }

    componentDidMount(){

        this.setState({isLoading:true});
        Axios.get(ApiUrl.baseurl+ApiUrl.get_farm_address)
            .then(response => {

                this.setState({isLoading:false});
               
                if(response.data.status){

                    let address=[];
                    let obj;
                    response.data.data.forEach(element => {
                       
                        obj = Object.assign({},{label:element.address,value:element.id})
                        address.push(obj);
                    });

                     this.setState({addressData:address,selected_address:address[0].value})
                }else{
                    this.setState({farm_address:"This feature is unavialable for now. Sorry for the inconvienence!"})
                }

            }).catch(error =>{
                this.setState({isLoading:false});
                Alert.alert(
                    'Visit Of Farm Error',
                    'Something Went Wrong ! Please Try Again Later.',
                    [
                 
                    {text: 'OK', onPress: () => {console.log("ok")}},
                    ], 
                    { cancelable: false }
                    )

            })
    }


    onVisitHandler = async() =>{

        console.log("selected_address",this.state.selected_address);

       if(this.refs.message.getInputTextValue("message") !== "invalid" && this.refs.subject.getInputTextValue("subject") !== "invalid"){
            this.setState({isLoading:true});
            var formdata = new FormData();
            formdata.append("user_id",this.props.user.userdata.user_id);
            formdata.append("date",this.state.date);
            formdata.append("time",this.state.time);
            formdata.append("address_id",this.state.selected_address)
            formdata.append("message",this.refs.message.getInputTextValue("message"));
            formdata.append("subject",this.refs.subject.getInputTextValue("subject"));
            console.log("formdata visit",formdata);

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
                'Visit Of Farm',
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
            <>
                <View  style={styles.headerView}>
                    <Text style={styles.headerTextStyle}>Visit Our Farm</Text>
                </View> 
                {/* <View style={styles.addressView}>
                    <Text style={styles.textAddressStyle} numberOfLines={2}>Our Address: {this.state.farm_address}</Text>
                </View> */}
                <FullSCreenSpinnerAndDismissKeyboardView 
                style={styles.container} 
                refreshing={false} 
                spinner={this.state.isLoading}
                >
                    {this.state.addressData.length > 0 
                    ?
                    (
                    <>
                    <Text style={styles.textStyle}>Subject *</Text>
                    <CustomTextInput 
                        inputType="subject"
                        placeholder="Enter Subject" placeholderTextColor='#898785'
                        ref="subject"
                        returnKeyType = { "next" }
                        //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                    />
                    <Text style={styles.textStyle}>Date *</Text>
                    <DatePicker
                        style={{width: "95%",alignSelf:"flex-start",marginTop:10,borderColor:"black",marginBottom:10}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={this.state.date}
                        // maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('../Assets/calendar2.png')}
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
                     <Text style={styles.textStyle}>Time *</Text>
                     <DatePicker
                        style={{width: "95%",alignSelf:"flex-start",marginTop:10,borderColor:"black",marginBottom:10}}
                        date={this.state.time}
                        mode="time"
                        placeholder="Select Time"
                        minTime={this.state.time}
                        // maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('../Assets/calendar2.png')}
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
                        onDateChange={(time) => {this.setState({time: time})}}
                    />
                      <Text style={styles.textStyle}>Select Address * </Text>

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
                                selectedValue={(this.state && this.state.selected_address)}
                                style={{marginLeft:5}}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({selected_address : itemValue})
                                }>
                                    {
                                        this.state.addressData.map(element => {
                                            return  <Picker.Item label={capitilize(element.label)} value={element.value} />
                                        })
                                    }
                               
                                
                            </Picker>
                        </View>

                        :

                        <RNPickerSelect

                        value={(this.state && this.state.selected_address) || 1}
                        onValueChange={(itemValue) => this.setState({selected_address: itemValue})}
                        items={this.state.addressData}
                        style={
                        pickerSelectStyles
                        }
                        />

                            
                        }
                    <Text style={styles.textStyle}>Message *</Text>
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
                        customButttonStyle={{marginBottom:40, }}
                        customTextStyle={{ color:'white'}} 
                    />
                    </>
                    )
                    

                    :
                    
                    (this.state.farm_address ?
                    <View style={styles.addressView}>
                    <Text style={styles.textAddressStyle} numberOfLines={2}>{this.state.farm_address}</Text>
                    </View> 
                    :
                    <View/>

                    )
                    }
                    


                  
              
                </FullSCreenSpinnerAndDismissKeyboardView>
            </>
        );
    }
}


const styles =  StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginLeft:0,
        marginRight:0,
        marginTop:15,
       
    },
    headerView:{
        backgroundColor:"#FD8D45",
        paddingTop:Platform.OS == 'android' ? 0 : 40,
        height:Platform.OS == 'android' ? 60 : 80,
        width:"100%",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignContent:"center",
        justifyContent:"center"

    },
    headerTextStyle:{
        fontFamily:'roboto-bold',
        fontSize:20,
        color:"white",
        alignSelf:"center",
        textAlign:"center",
    },
    textStyle:{
        fontFamily:'roboto-light',
        fontSize:17,
        color:"grey",
        marginLeft:15
       
    },
    addressView:{
        flex:1,
        height:null,
        width:"100%",
        flexDirection:"column",
        backgroundColor:"#ececec",
        alignContent:"center",
        justifyContent:"center"

    },
    textAddressStyle:{
        fontFamily:'roboto-medium',
        fontSize:14,
        color:"grey",
        textAlign:"center",
        alignSelf:"center",
        lineHeight:20,
        margin:20
        

    },
    scrollView:{
        margin:10
    },
    headingView:{

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
  


mapStateToProps = (state) =>{

    return{
        user:state.userdata,
    }
    
}

export default connect(mapStateToProps,null)(VisitOfFarm);