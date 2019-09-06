import React ,{ Component } from 'react';
import { View ,Text ,StyleSheet,Image,FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import axios from 'axios';
import ApiUrl from '../Api/ApiUrl';
import {connect} from 'react-redux';

class Certification extends Component {


    constructor (props){
        super(props);

        this.state ={
            certificates:[],
            isLoading:true,
        }
    }

    componentDidMount(){

        axios.get(ApiUrl.baseurl+ApiUrl.get_all_certificates+this.props.userdata.userdata.user_id).then(res => {

          
            this.setState({isLoading:false});
          
            this.setState({certificates:res.data.result});





        }).catch( error  => {   
            this.setState({isLoading:false});
            console.log("on error",error); 


        });

    }


    
    renderItem(data){
        let { item, index } = data;
        console.log("certi","http://webmobril.org/dev/hod/"+item.img)
        const uri = "http://webmobril.org/dev/hod/"+item.img;
        return(
            <View  key={item.id} >
                  
                    <Image source={{uri:"http://webmobril.org/dev/hod/"+item.img}} style={{width:200,height:200,marginTop:30}} />
                   
              
            </View>
        );
    }


    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView style={styles.container} 
            spinner={this.state.isLoading}>
                 <View  style={styles.headerView}>
                    <Text style={styles.textStyle}>Certifications</Text>
                </View>
             
                <View style={{ alignItems:"center",justifyContent:"center"}}>
                <FlatList
                      
                      data={this.state.certificates}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem.bind(this)}
                      style={{marginBottom:20}}
                      />
                </View>
           
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
       
    },
    headerView:{
        backgroundColor:"#FD8D45",
        height:60,
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