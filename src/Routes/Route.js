import React, { Component } from 'react';
import { createStackNavigator,createBottomTabNavigator,addNavigationHelpers , createAppContainer, createSwitchNavigator } from 'react-navigation';
import { View ,Image } from  'react-native';
import After_Splash from '../After_Splash/After_Splash';
import Login from '../Login/Login';
import LoginEmail from '../LoginEmail/LoginEmail';
import OTP from '../OTP/OTP'
import Create_Account from '../Create_Account/Create_Account';
import SearchLocation from '../SearchLocation/SearchLocation';
import { fromRight } from 'react-navigation-transitions';
import SearchLocationContinue from '../SearchLocation/SearchLocationContinue';
import Splash from '../Splash/Splash';
import HomeScreen from '../BottomTabs/HomeScreen';
import VistOfFarm from '../BottomTabs/VistOfFarm';
import Certification from '../BottomTabs/Certifications';
import Search  from '../BottomTabs/Search';
import Account from '../BottomTabs/Account';
import ViewProfile from  '../BottomTabs/Profile/ViewProfile';
import UpdateProfileContinue from  '../BottomTabs/Profile/UpdateProfileContinue';
import UpdateProfile from  '../BottomTabs/Profile/UpdateProfile';
import MyVideo from  '../Video/MyVideo';
import VideoPlayer from  '../Video/VideoPlayer';

const Bottomtabs = createBottomTabNavigator({

  'HomeScreen':{
    screen: HomeScreen ,
    navigationOptions:{
      tabBarLabel:'Home',  
      tabBarIcon: ({focused, tintColor }) => {
   
        const image = focused
        ? require('../../Assets/home.png')
        : require('../../Assets/home-grey.png')

        return(

          <View>  
            <Image style={{width:35,height:35}} source={image}/>  
          </View>
        
        );
       
      },  
    }
  },
  'VistOfFarm':{
    screen:VistOfFarm,
    navigationOptions:{
      tabBarLabel:'Vist Our Farm',  
      tabBarIcon: ({focused, tintColor }) => {

       const image =  focused
      ? require('../../Assets/visit.png')
      : require('../../Assets/visit-grey.png')
      return(

        <View>  
          <Image style={{width:35,height:35}} source={image}/>  
        </View>
    
      );
      },  
    }

  },
  'Certification':{
    screen:Certification ,
    navigationOptions:{
      tabBarLabel:'Certifications',  
      tabBarIcon: ({focused, tintColor }) => {

        const image =  focused
        ? require('../../Assets/certificate.png') 
        : require('../../Assets/certificate-grey.png')
        return (

          <View>  
            <Image style={{width:35,height:35}} source={image}/>  
          </View>
          );
      }
       
    }
  },
  'Seacrh':{
    screen:Search,
    navigationOptions:{
      tabBarLabel:'Search',  
      tabBarIcon: ({ focused,tintColor }) => {

        const image =  focused
        ? require('../../Assets/search2.png') 
        : require('../../Assets/search1.png')

        return(

          <View>  
              <Image style={{width:35,height:35}} source={image}/>  
          </View>
      
        );
        
      },  
    }
    
  },
  'Account':{
    screen:Account,
    navigationOptions:{
      tabBarLabel:'Account',  
      tabBarIcon: ({focused, tintColor }) => {

        const image =  focused
        ? require('../../Assets/user.png')
        : require('../../Assets/user1.png')


        return(


          <View>  
            <Image style={{width:35,height:35}} source={image}/>  
          </View>
  

        );
        
         
      },  
    }
  },



},

{
  initialRouteName: 'HomeScreen',
  tabBarOptions: {
     activeTintColor:"#FD8D45",
     style: {
      marginBottom:5,
      height: 60,
      borderTopWidth: 1,
      
  },

  },
} 
);

const bottomtabsStack = createStackNavigator({

  HomeBottomtabs:{
    screen:Bottomtabs,
    navigationOptions:{
      header:null
    }
  },
  ViewProfile,
  SearchLocation,
  SearchLocationContinue,
  UpdateProfile,
  UpdateProfileContinue,
  MyVideo,
  

},
{
  initialRouteName: 'HomeBottomtabs',
  transitionConfig: () => fromRight(500),
},);



const MyApp = createStackNavigator({
  //   MainLogin,
   
     After_Splash , 
     Login, 
     LoginEmail,
     VideoPlayer,
     MyVideo,
     Create_Account,
     OTP,
     SearchLocation,
     SearchLocationContinue,
     
    //  Bottomtabs:{
    //   screen:Bottomtabs,
    //   navigationOptions:{
    //     header:null
    //   }
    // },
   },{
     initialRouteName: 'After_Splash',
     transitionConfig: () => fromRight(500),
   },);
 
   
const AppContainer = createSwitchNavigator({
  Splash:Splash,
  MyApp:MyApp,
  Bottomtabs:bottomtabsStack
});

  
export default createAppContainer(AppContainer);
