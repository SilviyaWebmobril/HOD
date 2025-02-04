import React,{Component} from 'react';
import {
    
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Slider,
    SafeAreaView
  } from 'react-native';
import CardView from 'react-native-cardview';
import CustomSchedule from './CustomSchedule_copy';
import { connect } from 'react-redux';
import * as ScheduleAction from '../../redux/store/actions/SchedulerAction';
import * as cartActions from '../../redux/store/actions/cartAction';

class ScheduleModalCopy extends Component{

    constructor() {
        super();
        this.state = {
          customSchedule:false
        };
      }

      customSchedule = () =>{

        this.setState({customSchedule:true})
      }

      addCustomSchedule =() =>{
        this.props.onAddCustomSchedule("5")
      }
      addSchedule=(value)=>{
        this.props.onAddSchedule(value);
        this.props.onAdd(this.props.product_id,this.props.price,value,this.props.user.user_id,0)
      }

      onDismissModal = () =>{
        console.log("hi on cancel");
        this.props.onCancelSchedule();
      }
      
    render(){
        return(
          <TouchableOpacity 
          onPress={()=>this.onDismissModal()}>
            <View style={{margin:20}}>

            {!this.state.customSchedule ?
             

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
                        <Text style={styles.title}>Deliver these items on:</Text>
                      </View>
                      
                      <View style={styles.titleView}>
                        <TouchableOpacity
                        //onPress={()=>this.addSchedule("1")}
                        >
                            <Text style={styles.scheduleTextStyle}>Alternate Days</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity
                        //onPress={()=>this.addSchedule("2")}
                        >
                            <Text style={styles.scheduleTextStyle}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        //onPress={()=>this.addSchedule("3")}
                        >
                            <Text style={styles.scheduleTextStyle}>Weekdays</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        //onPress={()=>this.addSchedule("4")}
                        >
                            <Text style={styles.scheduleTextStyle}>Weekends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        //onPress={()=>this.customSchedule()}
                        >
                            <Text style={styles.scheduleTextStyle}>Custom Schedule</Text>
                        </TouchableOpacity>
                        
                      </View>
                      
                    </View>
                  </CardView>

            
             

            
            :

            <CustomSchedule addSchedule={this.addCustomSchedule.bind(this)}/>
            }
          


        </View>
        </TouchableOpacity>
      
        
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
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ScheduleModalCopy);



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
      width: 400
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