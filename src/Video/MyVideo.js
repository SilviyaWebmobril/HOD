import React,{Component} from "react";
import {Text,View,StyleSheet,ActivityIndicator,} from "react-native";
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import ApiUrl from '../Api/ApiUrl';
import VideoPlayer from '../Video/VideoPlayer';

export default class MyVideo extends Component {


  constructor(props){
    super(props);

    this.state = {
      video_url:"",
      isLoading:true,
      showVideoPlayer: true,
      video_url:"",

    }
  }


  componentDidMount = async() =>{
    
    
    try {
      let value;
     value = await AsyncStorage.getItem('user_id');

     axios.post(ApiUrl.baseurl+ApiUrl.get_video+value)
        .then( (response) => {
          console.log(response);
          this.setState({isLoading:false});
          this.setState({video_url : response.data.video});


        })
        .catch( (error) =>{
          console.log(error);
        });



    } catch(e) {
      // read error
    }
  
  }




    render(){
   
    let {showVideoPlayer} = this.state;
    if (showVideoPlayer) {
        return (
            <VideoPlayer video={{uri:"https://www.webmobril.org/dev/hod/"+this.state.video_url}} volume={0.5} />
        );
    } 
    
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