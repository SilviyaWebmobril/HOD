import React ,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { isProgram } from '@babel/types';
import CustomButton from '../CustomUI/CustomButton/CustomButton';
import CustomTextInput from '../CustomUI/CustomTextInput/CustomTextInput';

export default class Search extends Component{


    constructor(props){
        super(props);
        this.state={
            isFocusedSubject:false,
            isFocusedDate:false,
            isFocuseddate:false,
            isFocusedMessage:false,

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
                            onFocus={()=>this.setState({isFocusedSubject:true})}
                            onBlur={()=>this.setState({isFocusedSubject:false})}
                            customTxtInputStyle={[styles.customtxtInput,{
                                borderColor: this.state.isFocusedSubject
                                    ? '#FD8D45'
                                    : 'black',
                                borderWidth: this.state.isFocusedSubject
                                ? 1.5 
                                : 1,
                                }]}
                            placeholder="Enter Subject" placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        />
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Date
                            </Text>
                        </View>
                        <CustomTextInput 
                            onFocus={()=>this.setState({isFocusedDate:true})}
                            onBlur={()=>this.setState({isFocusedDate:false})}
                            customTxtInputStyle={[styles.customtxtInput,{
                                borderColor: this.state.isFocusedDate
                                    ? '#FD8D45'
                                    : 'black',
                                borderWidth: this.state.isFocusedDate
                                ? 1.5 
                                : 1,
                                }]}
                            placeholder="Enter Date" placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        />
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Time
                            </Text>
                        </View>
                        <CustomTextInput 
                            onFocus={()=>this.setState({isFocusedTime:true})}
                            onBlur={()=>this.setState({isFocusedTime:false})}
                            customTxtInputStyle={[styles.customtxtInput,{
                                borderColor: this.state.isFocusedTime
                                    ? '#FD8D45'
                                    : 'black',
                                borderWidth: this.state.isFocusedTime
                                ? 1.5 
                                : 1,
                                }]}
                            placeholder="Enter Time" placeholderTextColor='#898785'
                            returnKeyType = { "next" }
                            //onSubmitEditing={() => {this.thirdTextInput.focus();  }}
                        />
                        <View style={{marginLeft:20,width:'90%',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Text style={{color:'#808080',fontWeight: 'bold',fontSize: 17,}}>
                                Message
                            </Text>
                        </View>
                        <CustomTextInput 
                            onFocus={()=>this.setState({isFocusedMessgae:true})}
                            onBlur={()=>this.setState({isFocusedMessage:false})}
                            customTxtInputStyle={[styles.customtxtInput,{
                                borderColor: this.state.isFocusedMessage
                                    ? '#FD8D45'
                                    : 'black',
                                borderWidth: this.state.isFocusedMessage
                                ? 1.5 
                                : 1,
                                }]}
                            customTxtInputStyle={{height:150}}
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