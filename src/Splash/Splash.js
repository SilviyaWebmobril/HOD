import React ,{ Component } from 'react';
import { View,Image,Text,Dimensions ,Animated, Easing ,ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get("window");
import AsyncStorage from '@react-native-community/async-storage';
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import {connect} from 'react-redux';
import { userData,userAddress,getUserId } from '../redux/store/actions/userDataAction';
import * as  cartActions from '../redux/store/actions/cartAction';
import { NavigationActions, StackActions } from 'react-navigation';
  

class Splash extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props);
        
            this.RotateValueHolder = new Animated.Value(0);
 
        
    }

    componentDidMount(){
      
        this.StartImageRotateFunction();

        this.interval = setInterval(() => {

            this.getMyValue();
          
        
        }, 5000);
        

    }



    getMyValue = async () => {
        try {
          values = await AsyncStorage.getItem('user_id');


          const resetAction = StackActions.reset({
            index: 0,
            
            actions: [NavigationActions.navigate({ routeName:"After_Splash" })],
          });
          const resetAction1 = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Bottomtabs' })],
          });
         
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
                
                <View style={{alignItems:"center",justifyContent:"center",marginLeft:10,marginRight:10}}>
                    
                
                    <Image source={require('../../Assets/h_new.png')} style={{alignSelf:"center", position: 'absolute', height: height/6.2,width: width/5.8,margin:20}}  />
                    <Animated.Image   source={require('../../Assets/imgone.png')} style={{alignSelf:"center", height:300,width: 300, position: 'absolute', transform: [{rotate: RotateData}] }}  />
                    <Image  source={require('../../Assets/imgthree.png')} style={{alignSelf:"center",   position: 'absolute', height: 200,width: 200}}  />
                    <Image  source={require('../../Assets/imgtwo.png')} style={{alignSelf:"center",   position: 'absolute', height: 250,width: 250}}  />
                
                </View>
                <View style={{marginTop:200 ,width:'100%',alignSelf:"center",marginLeft:60,marginRight:60}}>
                    <Image  source={require('../../Assets/name_new.png')} style={{alignSelf:"center",width:"90%",height:windowH/6.5}}/>
                </View>
        

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


