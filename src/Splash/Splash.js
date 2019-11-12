import React ,{ Component } from 'react';
import { View,Image,Text,Dimensions ,Animated, Easing ,ImageBackground,Alert, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get("window");
import AsyncStorage from '@react-native-community/async-storage';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import {connect} from 'react-redux';
import { userData,userAddress,getUserId } from '../redux/store/actions/userDataAction';
import * as  cartActions from '../redux/store/actions/cartAction';
import { NavigationActions, StackActions } from 'react-navigation';
import RNExitApp from 'react-native-exit-app';
import NetInfo from "@react-native-community/netinfo";
  

class Splash extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props);
        state = {
          isConnected: true
        };
        
            this.RotateValueHolder = new Animated.Value(0);
 
        
    }

    componentDidMount(){
       NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.StartImageRotateFunction();

        this.interval = setInterval(() => {

          if (this.state.isConnected) {
            this.getMyValue();
          }else{

            Alert.alert(
              'Error',
              'Check Your Internet connection and again later!',
              [
           
              {text: 'OK', onPress: () => RNExitApp.exitApp()},
              
              ], 
              { cancelable: false }
              )
          }
          
        
        }, 3000);
        

    }
    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
      this.setState({ isConnected });
    };


    getMyValue = async () => {
        try {
          values = await AsyncStorage.getItem('user_id');


         
            this.props.onUpdateUserId(values);
              if(JSON.parse(values)){
            
                this.props.navigation.navigate('Bottomtabs');
              // return setTimeout(this.props.navigation.dispatch.bind(null,resetAction1),500);
    
              }else{
    
                this.props.navigation.navigate('MyApp');
              // return  setTimeout(this.props.navigation.dispatch.bind(null,resetAction),500);
              }
           
          
         
         
        } catch(e) {
          
            console.log("on splash",e);
          // read error
        }
      
      
    }

  
   

    StartImageRotateFunction () {

        this.RotateValueHolder.setValue(0)
        
        Animated.timing(
          this.RotateValueHolder,
          {
            toValue: 1,
            duration: 9000,
            easing: Easing.linear
          }
        ).start(() => this.StartImageRotateFunction())
      
      }


    render(){

        const RotateData = this.RotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          });
      
        return(
            <ImageBackground source={require('../../Assets/bg.jpg')} style={{alignItems:"center",justifyContent:"center",flex:1}}>
            {/* <ScrollView style={{flex:1}}> */}
                
                <View style={{alignItems:"center",justifyContent:"center",marginLeft:10,marginRight:10,alignSelf:"center",position:'absolute',top:Dimensions.get('window').height * 0.33}}>
                    
                    {Platform.OS  ===  'android'
                    ?
                    <Image source={require('../../Assets/h_new.png')} style={{alignSelf:"center", position: 'absolute', height: height/5.8,width: width/5.8,margin:20}}  />
                    :
                    <Image source={require('../../Assets/h_newone.png')} style={{alignSelf:"center", position: 'absolute', height:100,width: 50,margin:40}}  />
                    }
                    <Animated.Image   source={require('../../Assets/imgone.png')} style={{alignSelf:"center", height:300,width: 300, position: 'absolute', transform: [{rotate: RotateData}] }}  />
                    <Image  source={require('../../Assets/imgthree.png')} style={{alignSelf:"center",   position: 'absolute', height: 200,width: 200}}  />
                    <Image  source={require('../../Assets/imgtwo.png')} style={{alignSelf:"center",   position: 'absolute', height: 250,width: 250}}  />
                
                </View>
                {Platform.OS  ===  'android'
                ?
                <View style={{marginTop:200 ,width:'100%',alignSelf:"center",marginLeft:60,marginRight:60,top:30}}>
                  <Image  source={require('../../Assets/name_new.png')} style={{alignSelf:"center",width:"90%",height:windowH/6.0}}/>
                </View>
                :
                <View style={{marginTop:200 ,width:'100%',alignSelf:"center",marginLeft:60,marginRight:60}}>
                  <Image  source={require('../../Assets/name_new.png')} style={{alignSelf:"center",width:"90%",height:windowH/4.5}}/>
                </View>
                }
               
        

            {/* </ScrollView> */}
            </ImageBackground>
           

        );
    }


}



const mapDispatchToProps = dispatch => {
  return {
    onUpdateUserId: (id) => {
      dispatch(getUserId(id))
    },
    onUpdateAddress: (address) => {
      dispatch(userAddress(address))
    },
 
  }
}


export default connect(null,mapDispatchToProps)(Splash)


