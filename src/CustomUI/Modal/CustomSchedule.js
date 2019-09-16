import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import CardView from 'react-native-cardview';
import {CheckBox} from 'react-native-elements';
import CustomTextInput from '../CustomTextInput/CustomTextInput';


export default class CustomSchedule extends Component {


    constructor(props){
        super(props);
        this.state ={
            checked:true,
        }
    }


    render(){
        return(
            <View>
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

                        <TouchableOpacity>
                    <Text style={styles.scheduleTextStyle}>Daily</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.scheduleTextStyle}>Weekdays</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.scheduleTextStyle}>Weekends</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.scheduleTextStyle}>Custom Schedule</Text>
                </TouchableOpacity>
                       
                       </View>
                    
                    </View>
                </CardView>


            </View>
        )
    }
}


const styles = StyleSheet.create({

    rowone:{
        flexDirection:"row"
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