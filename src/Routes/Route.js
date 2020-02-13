import React, { Component } from 'react';
import { createStackNavigator,createBottomTabNavigator,StackActions,addNavigationHelpers ,NavigationActions , createAppContainer, createSwitchNavigator } from 'react-navigation';
import { View ,Image } from  'react-native';
import After_Splash from '../After_Splash/After_Splash';
import Login from '../Login/Login';
import LoginEmail from '../LoginEmail/LoginEmail';
import ForgotPassword from '../LoginEmail/ForgotPassword';
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
import ViewProfile from  '../BottomTabs/Account/Profile/ViewProfile';
import UpdateProfileContinue from  '../BottomTabs/Account/Profile/UpdateProfileContinue';
import UpdateProfile from  '../BottomTabs/Account/Profile/UpdateProfile';
import MyVideo from  '../Video/MyVideo';
import VideoPlayer from  '../Video/VideoPlayer';
import CategoryProduct from '../BottomTabs/screens/CategoryProduct';
import Support from '../BottomTabs/Account/Support';
import CategoryProductDetails from  '../BottomTabs/screens/CategoryProductDetails';
import Cart from '../BottomTabs/screens/Cart';
import TransactionHistory from '../BottomTabs/Account/TransactionHistory/TransactionHistory';
import AboutUs from '../BottomTabs/Account/AboutUs';
import PrivacyPolicy from '../BottomTabs/Account/PrivacyPolicy';
import UpdateMobile from '../BottomTabs/Account/Profile/UpdateMobile';
import SelectAddress from '../SearchLocation/SelectAddress';
import OfferTerms from '../Banners/OfferTerms';

const Bottomtabs = createBottomTabNavigator({

  'HomeScreen':{
    screen: HomeScreen ,
    navigationOptions:{
      header:null,
      headerMode:"none",
      tabBarLabel:'Home',  
      tabBarIcon: ({focused, tintColor }) => {
   
        const image = focused
        ? require('../Assets/home.png')
        : require('../Assets/home-grey.png')

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
      ? require('../Assets/visit.png')
      : require('../Assets/visit-grey.png')
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
        ? require('../Assets/certificate.png') 
        : require('../Assets/certificate-grey.png')
        return (

          <View>  
            <Image style={{width:35,height:35}} source={image}/>  
          </View>
          );
      }
       
    }
  },
  'Seacrh':{
    screen:HomeScreen,
    navigationOptions:{
      tabBarLabel:'Search',  
      tabBarIcon: ({ focused,tintColor }) => {

        const image =  focused
        ? require('../Assets/search2.png') 
        : require('../Assets/search1.png')

        return(

          <View>  
              <Image style={{width:35,height:35}} source={image}/>  
          </View>
      
        );
        
      },  
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        console.log("hi iam in tabbarpress");
       // navigation.navigate('HomeScreen',{iseditable:1})
        const resetAction = StackActions.reset({
          index: 0,
          //key: 'HomeScreen',
          actions: [NavigationActions.navigate({ routeName: 'HomeBottomtabs',
          params: {
            iseditable: 1   // this second parameter is for sending the params
        }  })],
        })
        navigation.dispatch(resetAction);
      }
    
      
    }
    
  },
  'Account':{
    screen:Account,
    navigationOptions:{
      tabBarLabel:'Account',  
      tabBarIcon: ({focused, tintColor }) => {

        const image =  focused
        ? require('../Assets/user.png')
        : require('../Assets/user1.png')


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

// right after declare `MyTabs`
Bottomtabs.navigationOptions = ({ navigation }) => {
  const { routes, index } = navigation.state;
  const navigationOptions = {};
  
 // here's an example, but you can dynamically define title 
 // however you like given `routes` & `index`
  
 if (routes[index].routeName === 'VistOfFarm') {
    navigationOptions.title = 'VistOfFarm'; 

    return navigationOptions;
 }else{
  return null;
 }
  
 
}


const profile = createStackNavigator({
  ViewProfile,
  SearchLocation,
  SearchLocationContinue,
  UpdateProfile,
  UpdateProfileContinue,
  UpdateMobile, 
  OTP,
  
},{

  
});

const search = createStackNavigator({
  SelectAddress,
  SearchLocation,
  SearchLocationContinue,
});

const bottomtabsStack = createStackNavigator({

  HomeBottomtabs:{
    screen:Bottomtabs,
    navigationOptions:{
      header:null
    }
  },
  ViewProfile :{
    screen :profile,
    navigationOptions:{
        header:null
    }

  } ,

  Search :{
    screen:search,
    navigationOptions:{
      header:null
    }
  },
 
  OfferTerms,
  Cart ,
  MyVideo,
  AboutUs,
  PrivacyPolicy,
  CategoryProduct,
  CategoryProductDetails,
  Support,
  TransactionHistory,
  Login, 
  OTP,
  
  

},
{
  initialRouteName: 'HomeBottomtabs',
  transitionConfig: () => fromRight(500),
  navigationOptions: {
    
  }
  
},);



const MyApp = createStackNavigator({
  //   MainLogin,
   
    //  After_Splash , 
     Login, 
     LoginEmail,
     ForgotPassword,
     
     VideoPlayer,
     MyVideo,
     Create_Account,
     SearchLocation,
     SearchLocationContinue,
     OTP,
    
     
    //  Bottomtabs:{
    //   screen:Bottomtabs,
    //   navigationOptions:{
    //     header:null
    //   }
    // },
   },{
     initialRouteName: 'Login',
     transitionConfig: () => fromRight(500),
   },);
 
   
const AppContainer = createSwitchNavigator({
  Splash:Splash,
  MyApp:MyApp,
  Bottomtabs:bottomtabsStack
});



  
export default createAppContainer(AppContainer);
