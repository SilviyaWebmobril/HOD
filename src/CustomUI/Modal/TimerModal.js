import React ,{useEffect,useState} from 'react';
import {View ,Text,StyleSheet, Dimensions} from 'react-native';


TimerModal = (props) => {

    const [totalSeconds, setTotalSeconds ] = useState(120);
    const [min ,setMins] = useState('');
    const [secs,setSecs] = useState('');
    let interval;


    useEffect(() => {
        interval = setInterval(() => this.tick(), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    tick =() => {
        totalSeconds >0? (this.calcMinSec(totalSeconds)): (console.log("clearing"),props.cancelTimerInterVal(),clearInterval(interval));
    }

    calcMinSec =(totalSeconds) => {

        var minutes = Math.floor(totalSeconds / 60);
        var seconds = (totalSeconds - minutes * 60);
        setTotalSeconds(totalSeconds - 1);
        console.log("get total secs",totalSeconds);
        setMins(minutes);
        setSecs(seconds);

    }

    

    return(
        <View style={styles.mainView}>

          <Text style={styles.textStyle}> Checking your address is available for delivery... </Text>
    <Text style={styles.timerStyle}>{min} : {secs} </Text>

        </View>
    )

}

const styles = StyleSheet.create({

    mainView :{
        width:Dimensions.get('window').width * 0.8,
        height:null,
        elevation:5,
        backgroundColor:'white',
        borderRadius:4,
        padding:25

        
    },
    textStyle:{
        fontFamily:'roboto-medium',
        fontSize:14,
        textAlign:'center',

    },
    timerStyle:{
        fontFamily:'roboto-medium',
        fontSize:17,
        textAlign:'center',
        marginTop:10

    }

})

export default TimerModal ;