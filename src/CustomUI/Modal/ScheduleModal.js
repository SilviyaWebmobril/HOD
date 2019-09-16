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

export  default class ScheduleModal extends Component{

    constructor() {
        super();
        this.state = {
         
        };
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
                <Text style={styles.title}>Deliver these items on:</Text>
              </View>
              
              <View style={styles.titleView}>
                <TouchableOpacity>
                    <Text style={styles.scheduleTextStyle}>Alternate Days</Text>
                </TouchableOpacity> 
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
      
        
        );

    }
}



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
      width: 300
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