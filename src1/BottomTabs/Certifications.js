import React ,{ Component } from 'react';
import { View ,Text ,StyleSheet,Image,FlatList,RefreshControl,Alert,Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import axios from 'axios';
import ApiUrl from '../Api/ApiUrl';
import {connect} from 'react-redux';
import Banners from '../Banners/Banner';
class Certification extends Component {


    constructor (props){
        super(props);

        this.state ={
            certificates:[],
            isLoading:true,
            isRefreshing:false
        }
    }

    componentDidMount(){

        this.setState({isRefreshing:false})        
        axios.get(ApiUrl.baseurl+ApiUrl.get_all_certificates+this.props.userdata.userdata.user_id).then(res => {

          console.log("response certi..",res.data);
            this.setState({isLoading:false});
          
            this.setState({certificates:res.data.result});





        }).catch( error  => {   
            this.setState({isLoading:false});
            Alert.alert(
                'Error',
                'Check Your Internet connection and again later!',
                [
             
                {text: 'OK', onPress: () => console.log("ok")},
                
                ], 
                { cancelable: false }
                )
          
        });

    }


    
    renderItem(data){
        let { item, index } = data;
    
        let split_images = item.img.split(",");
        let array_img = [];
        split_images.forEach(element => {
           let obj = {
               "img" : element
           }
           array_img.push(obj);
        });
       
        return(
            // <View  key={item.id} >
                  
                  <Banners images={array_img}/>
                   
              
            // </View>
        );
    }

    onRefresh = () =>{

        console.log("calling this function");
        this.setState({isRefreshing:true})
        this.componentDidMount();
    }


    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView style={styles.container} 
            
            onRefresh={this.onRefresh.bind(this)}
            refreshing={this.state.isRefreshing}
            spinner={this.state.isLoading}>
                 <View  style={styles.headerView}>
                    <Text style={styles.textStyle}>Certifications</Text>
                </View>
              
                <FlatList
                      data={this.state.certificates}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem.bind(this)}
                      style={{alignSelf:'center', }}
                     />
               
            </FullSCreenSpinnerAndDismissKeyboardView>
            
        );
    }   
}


const mapStateToProps = (state) => {
    return {
      userdata: state.userdata
    }
  }
  
  export default connect(mapStateToProps,null)(Certification)

const styles =  StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:"center",
        alignItems:'center',
       
    },
    headerView:{
        backgroundColor:"#FD8D45",
        paddingTop:Platform.OS == 'android' ? 0 : 40,
        height:Platform.OS == 'android' ? 60 : 80,
        width:"100%",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignContent:"center",
        justifyContent:"center"

    },
    textStyle:{
        fontSize:20,
        fontWeight:"bold",
        color:"white",
        alignSelf:"center",
        textAlign:"center",
    }
});