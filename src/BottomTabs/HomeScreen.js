import React,{ Component } from 'react';
import { View , Text ,StyleSheet} from  'react-native';
import CustomTopHeader  from './CustomTopHeader';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import * as HOC from '../HOC/mainHoc';
const DismissKeyboardView = HOC.DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = HOC.FullScreenSpinnerHOC(
  DismissKeyboardView
);
import Banners from '../Banners/Banner';
import HorizontalList from '../CustomUI/HorizontalList/HorizontalList';
import CustomTextInputWithIcon from '../CustomUI/CustomTextInput/CustomTextInputWithIcon';
import {images}  from  '../CustomUI/HorizontalList/imageUri';
import ProductItem  from './ProductItem/ProductItem';



 export default class HomeScreen extends  Component {

    constructor(props){
        super(props);
        this.state={
            images: [...images]
        }
    }

    renderItem(data){
        let { item, index } = data;
        return(
            <ProductItem data={item} />
        );
    }

    render(){
        return(
           
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View >
                    <CustomTopHeader />
                    <Banners images={this.state.images}/>
                    <HorizontalList />
                    <CustomTextInputWithIcon placeholder="Search for Products.."/>
                    <FlatList
                      
                        data={this.state.images}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        style={{marginBottom:20}}
                        />
                   

                    
            
                </View>


            </ScrollView>
             
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