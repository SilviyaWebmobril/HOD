// import React, { PureComponent, Component } from 'react'
// import { View, Image, Dimensions, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
// import ImageViewer from 'react-native-image-zoom-viewer';
// import Video from 'react-native-video-controls';
// import FastImage from 'react-native-fast-image'
// import AppConstant from '../constant/AppConstant';

// var deviceWidth = Dimensions.get('window').width
// var deviceHeight = Dimensions.get('window').height



// class FullView extends React.Component {

//     constructor(props) {
//         super(props);


//         this.state = {
//             isloading: true,
//         };
//     }
//     componentWillMount() {
//         const { navigation } = this.props

//         this.blurSubscription =
//             navigation.addListener(
//                 'willBlur',
//                 () => {
//                     if (this.player != null)
//                         if (!this.player.state.paused) {
//                             this.player.methods.togglePlayPause()
//                         }
//                 }
//             )
//     }

//     componentWillUnmount() {
//         this.blurSubscription.remove()
//     }

//     static navigationOptions = { header: null }

//     render() {
//         const { navigation } = this.props;

//         const name = navigation.getParam('name', 'NO-ID');
//         const image = navigation.getParam('image', 'NO-ID');
//         const avatar = navigation.getParam('avatar', 'NO-ID');
//         const userId = navigation.getParam('userId', 'NO-ID');
//         // const name = navigation.getParam('name', 'NO-ID');




//         return (
//             <View style={{ flex: 1, backgroundColor: '#000' }}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
//                     <TouchableOpacity style={{ marginLeft: 20, backgroundColor: '#000', width: 40 }} onPress={() => this.props.navigation.goBack()}>
//                         <Image source={require('../image/left-arrow.png')} style={{ height: AppConstant.backHeightWidth, width: AppConstant.backHeightWidth }}

//                         />


//                     </TouchableOpacity>
//                     <TouchableOpacity
//                     // onPress={() => 
//                     //     navigation.navigate('ViewUserProfile', { userId: userId })
//                     // }

//                     >

//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             {avatar ? avatar.includes("https") ?
//                                 <View style={{ width: 40, height: 40, borderRadius: 40 / 2, overflow: 'hidden', backgroundColor: '#d6d6d6' }}>

//                                     <FastImage source={{ uri: avatar }}
//                                         style={{ width: 40, height: 40, borderRadius: 20 }} />
//                                 </View>

//                                 : <View style={{ width: 40, height: 40, borderRadius: 40 / 2, overflow: 'hidden', backgroundColor: '#d6d6d6' }}>

//                                     <FastImage source={{ uri: 'https://s3.us-east-1.amazonaws.com/polbol-images/' + avatar }}
//                                         style={{ width: 40, height: 40, borderRadius: 20 }} />
//                                 </View> :
//                                 <Image source={{ uri: 'ic_user_dummy' }}
//                                     style={{ width: 40, height: 40, borderRadius: 40 / 2 }} />

//                             }
//                             <Text style={{ color: '#FFFFFF', marginLeft: 5 }}> {name}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>

//                 {(image.includes("mp4") || image.includes("MP4")) ?

//                     <Video source={{ uri: image }}   // Can be a URL or a local file.
//                         ref={(ref) => {
//                             this.player = ref
//                         }}
//                         disableBack={true}             // Store reference
//                         onBuffer={this.onBuffer}                // Callback when remote video is buffering
//                         onError={this.videoError}               // Callback when video cannot be loaded
//                         style={{
//                             position: 'absolute',
//                             top: 90,
//                             left: 5,
//                             bottom: 50,
//                             width: '97%', height: '80%',
//                             right: 10,
//                         }} />
//                     :
//                     <View style={{ width: deviceWidth, height: deviceHeight - 12}}>
//                         {this.state.isloading ? <ActivityIndicator size="small" color="#A52745" />
//                             : null}


//                         <FastImage source={{ uri: image }}
//                             onProgress={e =>
//                                 console.log(
//                                     'Loading Progress ' +
//                                     e.nativeEvent.loaded / e.nativeEvent.total
//                                 )
//                             }
//                             onLoad={e =>

//                                 this.setState({
//                                     isloading:false
//                                 })
                             
//                             }
//                             resizeMode={FastImage.resizeMode.contain}
//                             style={{ width: deviceWidth, height: deviceHeight - 220, marginTop: 10, marginBottom: 25 }} />
//                     </View>

//                 }


//             </View>


//         )
//     }
// }


// export default FullView