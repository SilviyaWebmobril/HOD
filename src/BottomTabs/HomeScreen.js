import React,{ Component } from 'react';
import { View , Text ,StyleSheet} from  'react-native';
import CustomTopHeader  from './CustomTopHeader';
import { ScrollView } from 'react-native-gesture-handler';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import Banners from '../Banners/Banner';
import HorizontalList from '../CustomUI/HorizontalList/HorizontalList';



 export default class HomeScreen extends  Component {

    constructor(props){
        super(props);
        this.state={
            images:[
                '../../Assets/img2.jpg',
                '../../Assets/img4.jpeg',
              
            ]
        }
    }


    render(){
        return(
            <FullSCreenSpinnerAndDismissKeyboardView style={styles.container}>
            
                <ScrollView>
                <View >
                    <CustomTopHeader />
                    <Banners images={this.state.images}/>
                    <HorizontalList />
                    
               
                </View>


                </ScrollView>
                
            </FullSCreenSpinnerAndDismissKeyboardView>
            
        );
    }
 }

 const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#ffffff',
      //  margin:20

    },
    

 });