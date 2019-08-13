import React ,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { isProgram } from '@babel/types';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';
import DatePicker from 'react-native-datepicker'
const today = new Date();
 
export default class Search extends Component{

    

    constructor(props){
        super(props);
        this.state={
            isFocusedSubject:false,
            isFocusedDate:false,
            isFocuseddate:false,
            isFocusedMessage:false,
            date: new Date(),
            time : today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),

        }
    }


    render(){

        return(
            <View style={styles.container}>
                 <View  style={styles.headerView}>
                    <Text style={styles.textStyle}>Visit Our Farm</Text>
                </View> 
                <ScrollView >
                    <View style={{marginBottom:20}}>
                        
                        <View style={styles.addressView}>
                            <Text style={styles.textAddressStyle}>
                                Our Address: 23-D,N Block,
                            </Text>
                            <Text style={styles.textAddressStyle}>
                                Saket, New Delhi
                            </Text>

                        </View>

                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Subject
                            </Text>
                        </View>
                        <CustomTextInput 
                            inputType="name"
                            placeholder="Enter Subject" placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        />
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Date
                            </Text>
                        </View>
                        {/* <CustomTextInput 
                            inputType="name"
                            placeholder="Enter Date" placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        /> */}

                        <DatePicker
                            style={{width: "80%",alignSelf:"center"}}
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
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />

                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Time
                            </Text>
                        </View>
                        <DatePicker
                            style={{width: "80%",alignSelf:"center"}}
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
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Message
                            </Text>
                        </View>
                        <CustomTextInput 
                            inputType="name"
                            customTxtInputStyle={{height:150}}
                            multiline={true}
                            placeholder="Enter Message" placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        />
                        <CustomButton text="SUBMIT" 
                                onPressHandler={()=>this.onCreate_Account()} 
                                customButttonStyle={{backgroundColor:"#FD8D45", }}
                                customTextStyle={{ color:'#48241e'}} 
                            />

                    </View>
              
                </ScrollView>
            </View>
            
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