import React from 'react';
import {View,StyleSheet,Dimensions,Image,Platform,TouchableOpacity} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { withNavigation } from 'react-navigation';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 170;

const Banner = (props) => {

    
    renderPage = (image, index) =>{
      
        return (
            <View key={index}>
                <TouchableOpacity onPress={()=> props.navigation.navigate('OfferTerms',{"banner_id":image.id})}>
                <Image style={styles.imageStyle} source={{uri:"https://www.webmobril.org/dev/hod/"+image.img}} resizeMethod="resize" />
                </TouchableOpacity>
            </View>
        );
    
    }

    renderImage = (image,index) => {

        return(
            <Image key={index} style={styles.imageStyle} source={{uri:"https://www.webmobril.org/dev/hod/"+image.img}} resizeMethod="resize" />
        );

    }
     

        return (
            <View style={styles.container}> 
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {props.images.map((image, index) => props.navigate ? renderPage(image, index) : renderImage(image,index))}
                </Carousel>
                <View style={styles.viewLineBlack}></View>
            </View>
        );
    }

    export default withNavigation(Banner) ;


    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems:"center",
            marginTop:30
            
        },
        viewLineBlack:{
            width:"90%",
            height:1,
            backgroundColor:"#9F9F9F",
             marginTop:10,
            marginBottom:10,
            // marginLeft:10,
            // marginRight:10,

           
            
        },

        imageStyle: {
           width:Dimensions.get('window').width * 0.9,
             height: BannerHeight , 
             alignSelf:"center",
            borderRadius:20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 2,  
            alignSelf:"center"  ,
            marginTop:20
           
           
         
          },

    
    });