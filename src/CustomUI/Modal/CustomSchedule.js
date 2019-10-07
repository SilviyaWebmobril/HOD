import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,TouchableWithoutFeedback} from 'react-native';
import CardView from 'react-native-cardview';
import {CheckBox} from 'react-native-elements';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import SmallButton from '../CustomButton/SmallButton';
import CustomButton from '../CustomButton/CustomButton';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import * as ScheduleAction from '../../redux/store/actions/SchedulerAction';
import * as cartActions from '../../redux/store/actions/cartAction';
const deviceWidth = Dimensions.get("window").width;


 class CustomSchedule extends Component {


    constructor(props){
        super(props);
        this.state ={
            ondays:true,
            weekdays:false,
            value:"",
            monSelected:false,
            tuesSelected:false,
            wedSelected:false,
            thursSelected:false,
            friSelected:false,
            satSelected:false,
        }
    }

    onDismissModal = () =>{
        console.log("hi on cancel CustomSchedule");
        this.props.onCancelSchedule();
      }

       removeValue = (list, value, separator) =>{
        separator = separator || ",";
        var values = list.split(separator);
        for(var i = 0 ; i < values.length ; i++) {
          if(values[i] == value) {
            values.splice(i, 1);
            return values.join(separator);
          }
        }
        return list;
      }

      monHandler = (mon) =>{
          
        var value =  this.state.value;
        if(this.state.weekdays){

            if(value !== ""){
                var str_to_arr =  value.split(",");
                if(str_to_arr.includes(mon)){

                   var list =  this.removeValue(value,mon , ","); 
                   this.setState({value :list},()=>{
                    console.log("on press after removing",this.state.value);
                    this.setState({monSelected:false});
                   });
                }else{
                    value  =  value  + "," +  mon;
                    this.setState({value:value},()=>{
                        console.log("on press mon",this.state.value);
                        this.setState({monSelected:true});
                    });
                }
               
            }else{
                this.setState({value:mon},()=>{
                    console.log("on press mon",this.state.value);
                    this.setState({monSelected:true});
                });
            }


        }
      }

      tuesHandler = (tues) =>{
          
        var value =  this.state.value;
        if(this.state.weekdays){

            if(value !== ""){

                var str_to_arr =  value.split(",");
                if(str_to_arr.includes(tues)){

                   var list =  this.removeValue(value,tues , ","); 
                   this.setState({value :list},()=>{
                    console.log("on press after removing",this.state.value);
                    this.setState({tuesSelected:false});
                   });
                }else{

                    value  =  value  + "," +  tues;
                    this.setState({value:value},()=>{
                        console.log("on press tues",this.state.value);
                        this.setState({tuesSelected:true});
                    });
                }
               
            }else{
                this.setState({value:tues},()=>{
                    console.log("on press tues",this.state.value);
                    this.setState({tuesSelected:true});
                });
            }


        }
      }
      wedHandler = (wed) =>{
          
        var value =  this.state.value;
        if(this.state.weekdays){

            if(value !== ""){

                var str_to_arr =  value.split(",");
                if(str_to_arr.includes(wed)){

                   var list =  this.removeValue(value,wed , ","); 
                   this.setState({value :list},()=>{
                    this.setState({wedSelected:false});
                    console.log("on press after removing",this.state.value);
                   });

                }else{

                    value  =  value  + "," +  wed;
                    this.setState({value:value},()=>{
                        this.setState({wedSelected:true});
                        console.log("on press wed",this.state.value);
                    });
                }
                
            }else{
                this.setState({value:wed},()=>{
                    console.log("on press wed",this.state.value);
                    this.setState({wedSelected:true});
                });
            }


        }
      }
      thursHandler = (thurs) =>{
          
        var value =  this.state.value;
        if(this.state.weekdays){

            if(value !== ""){

                var str_to_arr =  value.split(",");
                if(str_to_arr.includes(thurs)){

                   var list =  this.removeValue(value,thurs , ","); 
                   this.setState({value :list},()=>{
                    this.setState({thursSelected:false});
                    console.log("on press after removing",this.state.value);
                   });
                   
                }else{

                    value  =  value  + "," +  thurs;
                    this.setState({value:value},()=>{
                        this.setState({thursSelected:true});
                        console.log("on press thurs",this.state.value);
                    });
                }
               
            }else{
                this.setState({value:thurs},()=>{
                    this.setState({thursSelected:true});
                    console.log("on press thurs",this.state.value);
                });
            }


        }
      }
      friHandler = (fri) =>{
          
        var value =  this.state.value;
        if(this.state.weekdays){

            if(value !== ""){

                var str_to_arr =  value.split(",");
                if(str_to_arr.includes(fri)){

                   var list =  this.removeValue(value,fri , ","); 
                   this.setState({value :list},()=>{
                    this.setState({friSelected:false});
                    console.log("on press after removing",this.state.value);
                   });
                   
                }else{

                    value  =  value  + "," +  fri;
                    this.setState({value:value},()=>{
                        this.setState({friSelected:true});
                        console.log("on press fri",this.state.value);
                    });
                }
               
            }else{
                this.setState({value:fri},()=>{
                    this.setState({friSelected:true});
                    console.log("on press fri",this.state.value);
                });
            }


        }
      }
      satHandler = (sat) =>{
          
        var value =  this.state.value;
        if(this.state.weekdays){

            if(value !== ""){

                var str_to_arr =  value.split(",");
                if(str_to_arr.includes(sat)){

                   var list =  this.removeValue(value,sat , ","); 
                   this.setState({value :list},()=>{
                    this.setState({satSelected:false});
                    console.log("on press after removing",this.state.value);
                   });
                   
                }else{
                    value  =  value  + "," +  sat;
                    this.setState({value:value},()=>{
                        this.setState({satSelected:true});
                        console.log("on press sat",this.state.value);
                    });
                }
              
            }else{
                this.setState({value:sat},()=>{
                    this.setState({satSelected:true});
                    console.log("on press sat",this.state.value);
                });
            }


        }
      }
      sunHandler = (sun) =>{
          
        var value =  this.state.value;
        if(this.state.weekdays){

            if(value !== ""){

                var str_to_arr =  value.split(",");
                if(str_to_arr.includes(sun)){

                   var list =  this.removeValue(value,sun , ","); 
                   this.setState({value :list},()=>{
                    this.setState({sunSelected:false});
                    console.log("on press after removing",this.state.value);
                   });
                   
                }else{

                    value  =  value  + "," +  sun;
                    this.setState({value:value},()=>{
                        this.setState({sunSelected:true});
                        console.log("on press sun",this.state.value);
                    });
                }
              
            }else{
                this.setState({value:sun},()=>{
                    this.setState({sunSelected:true});
                    console.log("on press sun",this.state.value);
                });
            }


        }
      }

      confirmSchedule = (id) =>{
          console.log("on confirm",this.refs.no.getInputTextValue("no"));

        var subtype ;
        var no_of_days ;
        if(this.state.ondays){
            if(this.refs.no.getInputTextValue("no") == "invalid"){
                alert("Please Enter no of days.!");
                return;
            }else{
                subtype =  1;
                no_of_days = this.refs.no.getInputTextValue("no") ;
            }
        }else if(this.state.weekdays){
            if(this.state.value == ""){
                alert("Please Select Weekdays.!");
                return;
            }else{
                subtype =  2;
                no_of_days = this.state.value;
            }
        }
            console.log("on confirm subtype",subtype);
            console.log("on confirm no_of_days",no_of_days);
            //this.props.onAddSchedule(id);
           // this.props.onAdd(this.props.product_id,this.props.price,5,subtype,no_of_days,this.props.user.user_id,0)
           this.props.addSchedule(subtype,no_of_days)
        
      }


    render(){
        return(
            <View style={{margin:20}}>
                <Modal
                isVisible={true}
                    deviceWidth={deviceWidth}
                    customBackdrop={
                        <TouchableWithoutFeedback onPress={()=>{this.onDismissModal()}}>
                            <View style={{ backgroundColor:"white",flex:1}} />
                        </TouchableWithoutFeedback>
                    } >
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
                                        checked={this.state.ondays}
                                        onPress={()=>{this.setState({ondays:!this.state.ondays},()=>{
                                            this.setState({weekdays:!this.state.weekdays})
                                        })}}
                                        />

                                        <Text style={styles.textStyle}>Every</Text>

                                        <CustomTextInput 
                                            customMainView={{width:'auto',minWidth:"20%"}}
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
                                        checked={this.state.weekdays}
                                        onPress={()=>{this.setState({weekdays:!this.state.weekdays},()=>{
                                            this.setState({ondays:!this.state.ondays})
                                        })}}
                                        />

                                    <Text style={styles.textStyle}>Every Days Of Week</Text>
                                </View>

                                <View style={styles.rowone}>
                                    <SmallButton buttonText="M" selected = {this.state.monSelected ? styles.buttonViewSeleted : styles.buttonView } onPressHandler={()=>{this.monHandler("1")}}/>
                                    <SmallButton buttonText="T"  selected = {this.state.tuesSelected ? styles.buttonViewSeleted : styles.buttonView } onPressHandler={()=>{this.tuesHandler("2")}}/>
                                    <SmallButton buttonText="W"  selected = {this.state.wedSelected ? styles.buttonViewSeleted : styles.buttonView } onPressHandler={()=>{this.wedHandler("3")}}/>
                                    <SmallButton buttonText="T"  selected = {this.state.thursSelected ? styles.buttonViewSeleted : styles.buttonView } onPressHandler={()=>{this.thursHandler("4")}}/>
                                    <SmallButton buttonText="F"  selected = {this.state.friSelected ? styles.buttonViewSeleted : styles.buttonView } onPressHandler={()=>{this.friHandler("5")}}/>
                                    <SmallButton buttonText="S"  selected = {this.state.satSelected ? styles.buttonViewSeleted : styles.buttonView } onPressHandler={()=>{this.satHandler("6")}}/>                        
                                    <SmallButton buttonText="S"  selected = {this.state.sunSelected ? styles.buttonViewSeleted : styles.buttonView } onPressHandler={()=>{this.sunHandler("7")}}/>

                                </View>

                        
                        </View>
                

                        <View style={styles.rowthree}>
                            <View style={{width:"50%"}}>
                                <TouchableOpacity
                                    onPress={()=>{this.onDismissModal()}}
                                    >
                                    <View style={styles.greyButton}
                                    >   
                                        <Text style={{alignSelf:"center",fontWeight:"bold",color:'white'}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:"50%"}}>
                                <TouchableOpacity
                                onPress={()=> {this.confirmSchedule("5")}}>
                                    <View style={styles.orangeButton}
                                    >   
                                        <Text style={{alignSelf:"center",fontWeight:"bold",color:'white'}}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        
                          
                        </View>

                    </View>


                    
                
                </Modal>
            </View>
        )
    }
}



const mapStateToProps = state =>{
    return{
        user:state.userdata
    }
}
  
const mapDispatchToProps = dispatch =>{

    return{
        onAddSchedule:(id) =>{
        dispatch(ScheduleAction.addSchedule(id));
        },
        onCancelSchedule:() =>{
        dispatch(ScheduleAction.cancelSchedule(0));
        },
       
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomSchedule);


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
      child: {
        width: deviceWidth,
        backgroundColor:"white",
        alignSelf:"center",
        elevation:5
        
  
      },
      buttonViewSeleted:{
        backgroundColor:"#FD8D45",
        padding:7,
        borderColor:"grey",
        borderRadius:2
    },
    buttonView:{
        backgroundColor:"grey",
        padding:7,
        borderColor:"grey",
        borderRadius:2
    },


})