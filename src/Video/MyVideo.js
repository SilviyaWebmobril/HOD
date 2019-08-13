import React,{Component} from "react";
import {Text,View,StyleSheet} from "react-native";
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';

export default class MyVideo extends Component {


  constructor(props){
    super(props);

    this.state = {
      user_id:"",
    }
  }


  componentDidMount(){

    this.getValues();
  }

  getValues = async () => {

    let value;
    try {
     value = await AsyncStorage.getItem('user_id');
    } catch(e) {
      // read error
    }
  
    this.setState({user_id:value});
    console.log('user_id Done',value)
  
  }

    render(){
    return(
    <View style={styles.container}>
        <Video source={{uri: "http://webmobril.org/dev/hod/api/video?user_id="+this.state.user_id}}   // Can be a URL or a localfile.
        ref={(ref) => {
            this.player = ref
        }}                                      // Store reference
        onBuffer={this.onBuffer}                // Callback when remote video is buffering
        onEnd={this.onEnd}                      // Callback when playback finishes
        onError={this.videoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo} />
    </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{ flex: 1, justifyContent: "center"},
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});