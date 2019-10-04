import React,{Component} from 'react';
import {
    
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Slider,
    Dimensions,
    SafeAreaView,
    TouchableWithoutFeedback
  } from 'react-native';
import CardView from 'react-native-cardview';
import CustomSchedule from './CustomSchedule';
import { connect } from 'react-redux';
import * as ScheduleAction from '../../redux/store/actions/SchedulerAction';
import * as cartActions from '../../redux/store/actions/cartAction';
import Modal from "react-native-modal";
const deviceWidth = Dimensions.get("window").width;

class ScheduleModal extends Component{

    constructor() {
        super();
        this.state = {
          customSchedule:false
        };
      }

      customSchedule = () =>{

        this.setState({customSchedule:true})
      }

      addCustomSchedule =(sub_type , no_of_days) =>{
        this.props.onAddSchedule("5");
        this.props.onAddCustom(this.props.product_id,this.props.price,5,sub_type,no_of_days,this.props.user.user_id,0);
      }
      addSchedule=(value)=>{
        this.props.onAddSchedule(value);
        this.props.onAdd(this.props.product_id,this.props.price,value,this.props.user.user_id,0);
      }

      onDismissModal = () =>{
        console.log("hi on cancel ScheduleModal");
        this.props.onCancelSchedule();
      }
      
    render(){
        console.log("on rendering modal");
        return(
            <View style={{flex:1}}>

                {!this.state.customSchedule ?
                    <Modal isVisible={true}
                    deviceWidth={deviceWidth}
                    customBackdrop={
                        <TouchableWithoutFeedback onPress={()=>{this.onDismissModal()}}>
                            <View style={{ backgroundColor:"white",flex:1}} />
                        </TouchableWithoutFeedback>
                    } 
                    >
                    
                    <View style={styles.child}>
                            <View style={styles.titleView}>
                                <Text style={styles.title}>Deliver these items on:</Text>
                            </View>
                            
                            <View style={styles.titleView}>
                                <TouchableOpacity
                                onPress={()=>this.addSchedule("1")}
                                >
                                    <Text style={styles.scheduleTextStyle}>Alternate Days</Text>
                                </TouchableOpacity> 
                                <TouchableOpacity
                                onPress={()=>this.addSchedule("2")}
                                >
                                    <Text style={styles.scheduleTextStyle}>Daily</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>this.addSchedule("3")}
                                >
                                    <Text style={styles.scheduleTextStyle}>Weekdays</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>this.addSchedule("4")}
                                >
                                    <Text style={styles.scheduleTextStyle}>Weekends</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                onPress={()=>this.customSchedule()}
                                >
                                    <Text style={styles.scheduleTextStyle}>Custom Schedule</Text>
                                </TouchableOpacity>
                                
                            </View>
                            
                            </View>
                    </Modal>

                    :

                    <CustomSchedule  addSchedule={this.addCustomSchedule.bind(this)}/>
                }



            </View>
            
        
        );

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
    onAdd: (product_id,price,subscriptipn_type,user_id,update) => {
      dispatch(cartActions.addOrUpdateSubscriptionToCart(product_id,price,subscriptipn_type,user_id,update))
    },
    onAddCustom: (product_id,price,subscriptipn_type,subtype ,days,user_id,update) => {
      dispatch(cartActions.addOrUpdateCustomSubscriptionToCart(product_id,price,subscriptipn_type,subtype ,days,user_id,update))
      },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ScheduleModal);



const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1
    },
    scheduleTextStyle:{

        fontSize:15,
        fontWeight:'bold',
        margin:5,
        color: "black",
    },
   
    child: {
      width: deviceWidth,
      backgroundColor:"white",
      alignSelf:"center",
      elevation:5
      

    },
    titleView: {
      paddingLeft: 25,
      paddingTop:10,
      paddingBottom:10  
      
    },
    title: {
      fontSize: 15,
      color: "#FD8D45",
      fontWeight:'bold'
    },
  
  });