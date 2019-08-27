import React ,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList} from 'react-native';


import * as HOC from '../../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import CustomLogo  from '../../CustomUI/Logo/CustomLogo';
import AsyncStorage from '@react-native-community/async-storage';

var { height } = Dimensions.get('window');


export default class ViewProfile  extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Profile",
    headerStyle: { backgroundColor: '#FD8D45' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white'
  });


    constructor(props){
        super(props);
        this.state = {
            name:"",
            address:"",
            mobile:"",
            email:"",
            addresses:[
              {
                id:1,
                address:"Gardenia Grace , Sector 61 ,Noida",
             
              },
              {
                id:2,
                address:"Sai Mandir, Sector 71,Noida",
              
              },
              {
                id:3,
                address:"WebMobril Technologies, Sector 63,Noida",
               
              },
             
            ]

        }
    }

    getvalues = async () => {

      let values
      try {
        values = await AsyncStorage.multiGet(['user_name','user_email', 'user_mobile','user_address'])
      } catch(e) {
        // read error
      }
      console.log("user profiles",values)

      this.setState({name:values[0][1]});
      this.setState({email:values[1][1]});
      this.setState({mobile:values[2][1]});
     
    
      // example console.log output:
      // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
    }

    componentDidMount() {

      this.getvalues();

    }

    addNewAddresshandler = () =>{

      this.props.navigation.navigate('SearchLocation');
    }

    updateProfileHandler = () =>{
      this.props.navigation.navigate('UpdateProfile');
    }

    renderItem = (data) =>{
      let { item, index } = data;
      console.log("Address",item.address)
      return(

        <View>
          <View style={styles.addressHeadingView}>
              <Text >{item.address}</Text>
              <Text onPress={()=>this.addNewAddresshandler()}
              style={styles.editTextStyle}>Edit</Text>
              
          </View>

          <View style={styles.viewLineBlack}></View>
        </View>
        


      );

    }


    render(){
        return (
            <FullSCreenSpinnerAndDismissKeyboardView>
                <View style={{marginRight:10,marginTop:10}}>
                    <Text onPress={()=>this.updateProfileHandler()}
                     style={styles.updateTextStyle}>UPDATE</Text>
                    <View style={styles.viewLineUpdate}></View>
                </View>
                <CustomLogo />

                <View style={styles.profileViewStyle}>
                  <Text style={styles.profileNameStyles}>{this.state.name}</Text>
                  <Text style={styles.profileEmailMobileStyles}>{this.state.email}</Text>
                  <Text style={styles.profileEmailMobileStyles}>{this.state.mobile}</Text>
                </View>

                <View style={styles.viewAddress}>
                  <View style={styles.addressHeadingView}>
                    <Text style={styles.manageAddressText}>Manage Address</Text>
                    <View style={styles.viewAddressText}>
                      <Text onPress={()=>this.addNewAddresshandler()} style={styles.addAddreesText}>Add New</Text>
                      <View style={styles.viewLine}></View>
                    </View>
                  </View>

                  <FlatList 
                      data={this.state.addresses}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem.bind(this)}
                      style={{marginBottom:20}}/>

                </View>
                



            </FullSCreenSpinnerAndDismissKeyboardView>
            


        )
    }
}

const styles =  StyleSheet.create({

  profileViewStyle:{

    width:"90%",
    justifyContent:"center",
    alignItems:"center",
  },

  profileNameStyles :{

    width:"90%",
    alignSelf:"center",
    lineHeight:30,
    fontSize:20,
    color:"black",
    fontWeight:"bold",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center"



  },
  profileEmailMobileStyles:{
    width:'90%',
    justifyContent:'center',
    fontSize:17,
    lineHeight:30,
    color:"grey",
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center"

  },
  viewAddress:{
    backgroundColor:"#ececec",
    width:"100%",
    height:height/2,
    marginTop:20

  },
  addressHeadingView:{

    flexDirection:"row",
    margin:15,
    justifyContent:"space-between"

  },
  manageAddressText:{

    lineHeight:30,
    fontSize:17,
    color:"black",
    fontWeight:"bold",
    

  },
  viewAddressText:{
    justifyContent:"space-between",
  
  },
  addAddreesText:{
    lineHeight:30,
    fontSize:15,
    color:"#FD8D45",
    fontWeight:"bold",
    justifyContent:"flex-end",
    alignContent:"flex-end",
    alignSelf:"flex-end"
  },
  viewLine:{
    backgroundColor:"#FD8D45",
    height:1,
    width:60,
  },
  viewLineBlack:{
    width:'90%',
    height:1,
    backgroundColor:"#9F9F9F",
    marginLeft:20,
    marginRight:20
  },
  editTextStyle:{
    color:"#FD8D45",
  },
  viewLineUpdate:{
    backgroundColor:"#FD8D45",
    height:1,
    width:54,
  justifyContent:"flex-end",
  alignSelf:"flex-end"
  },
  updateTextStyle:{
    color:"#FD8D45",
    textAlign:"right"
  }
  

});