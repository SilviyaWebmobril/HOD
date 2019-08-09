import React ,{ Component } from 'react';
import { View,Image,Text,Dimensions ,Animated, Easing ,ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get("window");
import AsyncStorage from '@react-native-community/async-storage';

export default class Splash extends Component {

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
          const value = await AsyncStorage.getItem('user_id')
          console.log(" i am here",value);
          if(JSON.parse(value)){
           
            this.props.navigation.navigate('Bottomtabs');

          }else{

            this.props.navigation.navigate('MyApp');
          }
        } catch(e) {
            console.log("hello error",e);
          // read error
        }
      
        console.log('Done');
      
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
                
                <View style={{alignItems:"center",justifyContent:"center"}}>
                    
                
                    <Image source={require('../../Assets/h.png')} style={{alignSelf:"center", position: 'absolute', height: height/5.5,width: width/5.5}}  />
                    <Animated.Image   source={require('../../Assets/imgone.png')} style={{alignSelf:"center", height:300,width: 300, position: 'absolute', transform: [{rotate: RotateData}] }}  />
                    <Image  source={require('../../Assets/imgthree.png')} style={{alignSelf:"center",   position: 'absolute', height: 200,width: 200}}  />
                    <Image  source={require('../../Assets/imgtwo.png')} style={{alignSelf:"center",   position: 'absolute', height: 250,width: 250}}  />
                
                </View>
                <View style={{marginTop:150 ,width:'90%',alignSelf:"center"}}>
                    <Image  source={require('../../Assets/name.png')} style={{width:"100%",height:110}}/>
                </View>
        

            {/* </ScrollView> */}
            </ImageBackground>
           

        );
    }


}