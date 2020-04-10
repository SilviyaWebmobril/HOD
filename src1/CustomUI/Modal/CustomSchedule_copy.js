import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import CardView from 'react-native-cardview';
import {CheckBox} from 'react-native-elements';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import SmallButton from '../CustomButton/SmallButton';
import CustomButton from '../CustomButton/CustomButton';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default class CustomSchedule extends Component {


    constructor(props){
        super(props);
        this.state ={
            checked:true,
        }
    }


    render(){
        return(
            <View style={{margin:20}}>
                 <CardView
                    style={{
                    backgroundColor: 'white'
                    }}
                    cardElevation={7}
                    cardMaxElevation={7}
                    cornerRadius={1}
                    cornerOverlap={false}
                >
                    
                    <View style={styles.child}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleDeliver}>Deliver these items on:</Text>
                        </View>
                    
                        <View style={styles.titleView}>
                            
                            <Text style={styles.title}>Custom Schedule</Text>
                            <View style={styles.rowone}>

                                <CheckBox
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.checked}
                                    />

                                    <Text style={styles.textStyle}>Every</Text>

                                    <CustomTextInput 
                                        customMainView={{width:"20%"}}
                                        ref="no"
                                        placeHolder="01"
                                        customTextInputView={{width:'70%',marginLeft:10,marginRight:10,height:5,marginTop:10,borderRadius:8}}
                                        returnKeyType = { "next" }
                                        inputType="no"
                                        keyboardType='numeric'
                                        
                                    
                                    />

                                    <Text style={styles.textStyle}>Days</Text>

                            </View>

                            <View style={styles.rowone}>

                                <CheckBox
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.state.checked}
                                    />

                                <Text style={styles.textStyle}>Every Days Of Week</Text>
                            </View>

                            <View style={styles.rowone}>
                                <SmallButton buttonText="M"/>
                                <SmallButton buttonText="T"/>
                                <SmallButton buttonText="W"/>
                                <SmallButton buttonText="T"/>
                                <SmallButton buttonText="F"/>
                                <SmallButton buttonText="S"/>                        
                                <SmallButton buttonText="S"/>

                            </View>

                           
                        </View>
                    
                    </View>


                    <View style={styles.rowthree}>
                        <View style={{width:"50%"}}>
                            <TouchableHighlight
                            
                           >
                                <View style={styles.greyButton}
                                >   
                                    <Text style={{alignSelf:"center",fontWeight:"bold",color:'white'}}>Cancel</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{width:"50%"}}>
                            <TouchableOpacity
                            onPress={()=>this.props.addSchedule()}>
                                <View style={styles.orangeButton}
                                >   
                                    <Text style={{alignSelf:"center",fontWeight:"bold",color:'white'}}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                      
                        {/* <CustomButton  
                        customButttonStyle={{backgroundColor:"grey", marginTop:20,justifyContent:"space-between"}}
                        customTextStyle={{ color:'#f8f8f8',fontWeight:"bold",alignSelf:"center"}} 
                        text="Cancel"/>
                        <CustomButton  customButttonStyle={{backgroundColor:"#FD8D45",justifyContent:"space-between", marginTop:20}}
                        customTextStyle={{ color:'white',fontWeight:"bold",alignSelf:"center"}} 
                        text="Confirm" /> */}
                    </View>

                
                </CardView>


            </View>
        )
    }
}


const styles = StyleSheet.create({

    greyButton:{
        backgroundColor:"#dcdcdc", marginTop:20,
        padding:10,
    },
    orangeButton:{
        backgroundColor:"#FD8D45", marginTop:20,
        padding:10
    },
    rowone:{
        flexDirection:"row"
    }, 
    rowtwo:{
        flexDirection:"row",
        justifyContent:"center"
    }, 
    rowthree:{
        flexDirection:"row",
        justifyContent:"space-between"
    }, 
    titleView: {
        paddingLeft: 25,
        paddingTop:10,
        paddingBottom:5  
        
      },
      titleDeliver:{
        fontSize: 13,
        color: "#FD8D45",
        fontWeight:'bold',
      },
      title: {
        fontSize: 15,
        color: "black",
        fontWeight:'bold',
       
      },
      textStyle: {
        fontSize: 14,
        color: "grey",
        fontWeight:'bold',
        marginTop:17,
      },


})