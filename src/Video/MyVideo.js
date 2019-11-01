import React,{Component} from "react";
import {Text,View,StyleSheet,ActivityIndicator,} from "react-native";
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import ApiUrl from '../Api/ApiUrl';
//import VideoPlayer from '../Video/VideoPlayer';
import VideoPlayer from 'react-native-video-controls';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

export default class MyVideo extends Component {


  constructor(props){
    super(props);

    this.state = {
      video_url:"",
      isLoading:true,
      showVideoPlayer: true,
      video_url:"",
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',

    }
  }


  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };
 
  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };
 
  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };
 
  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: true });
  
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
  };
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'content' });
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });


  componentDidMount = async() =>{
    
    
    try {
    //   let value;
    //  value = await AsyncStorage.getItem('user_id');

    //  axios.post(ApiUrl.baseurl+ApiUrl.get_video+value)
    //     .then( (response) => {
    //       console.log(response);
    //       this.setState({isLoading:false});
    //       this.setState({video_url : response.data.video});


    //     })
    //     .catch( (error) =>{
    //       console.log(error);
    //     });



    } catch(e) {
      // read error
    }
  
  }




    render(){
      return(
        // <VideoPlayer source={{uri:"https://www.webmobril.org/dev/hod/siteimages/video/5%20Second%20Countdown%20HD.mp4 "}}
        //  navigator={ this.props.navigator } />
        <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{ uri: 'https://www.webmobril.org/dev/hod/siteimages/video/5%20Second%20Countdown%20HD.mp4' }}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        />
      </View>
      );
      
    
    
  }

}

const styles = StyleSheet.create({
  container:{ flex: 1, },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});