import React ,{ Component } from 'react';
import { View,Image,Dimensions ,Animated, Easing ,ImageBackground} from 'react-native';
const {width, height} = Dimensions.get("window");

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
        this.interval = setInterval(() => {this.props.navigation.navigate('MyApp');}, 5000);
        

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

            <View style={{flex:1,alignItems:"center",justifyContent:"center",margin:0,}}>
                <ImageBackground source={require('../../Assets/bg.jpg')} style={{lex:1,alignItems:"center",justifyContent:"center",width: '100%', height: '100%'}}>
                    <Image source={require('../../Assets/h.png')} style={{alignSelf:"center", height: height/4.5,width: width/4.5}}  />
                    <Animated.Image   source={require('../../Assets/imgone.png')} style={{alignSelf:"center", height:300,width: 300, position: 'absolute', transform: [{rotate: RotateData}] }}  />
                    <Image  source={require('../../Assets/imgtwo.png')} style={{alignSelf:"center",   position: 'absolute', height: 250,width: 250}}  />
                </ImageBackground>
            </View>

        );
    }


}