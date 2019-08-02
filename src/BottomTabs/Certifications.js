import React ,{ Component } from 'react';
import { View ,Text ,StyleSheet,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomTopHeader from './CustomTopHeader';

export default class Certification extends Component {

    render(){
        return(
            <View style={styles.container}>
                 <View  style={styles.headerView}>
                    <Text style={styles.textStyle}>Certifications</Text>
                </View>
                <ScrollView >
                <View style={{ alignItems:"center",justifyContent:"center"}}>
                   
                    <Image source={require('../../Assets/cert1.png')} style={{margin:20}}/>
                    <Image source={require('../../Assets/cert2.png')}  style={{margin:20}}/>
                    <Image source={require('../../Assets/cert3.png')}  style={{margin:20}}/>
                    <Image source={require('../../Assets/cert4.png')}  style={{margin:20}}/>
                    <Image source={require('../../Assets/certi1.png')}  style={{margin:20}}/>
                    <Image source={require('../../Assets/certi6.png')}  style={{margin:20}}/>
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
    }
});