import React from 'react';
import {View,StyleSheet,Dimensions,Image,Platform} from 'react-native';
import Carousel from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 170;

const Banner = (props) => {

    
    renderPage = (image, index) =>{
        return (
            <View key={index}>
                <Image style={styles.imageStyle} source={require('../../Assets/img4.jpeg')} />
            </View>
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
                    {props.images.map((image, index) => renderPage(image, index))}
                </Carousel>
                <View style={styles.viewLineBlack}></View>
            </View>
        );
    }

    export default Banner;


    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            marginTop:40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 2,    
           
        },
        viewLineBlack:{
            width:'100%',
            height:1,
            backgroundColor:"#9F9F9F",
            marginTop:8,
            marginBottom:10,
            marginLeft:20,
            marginRight:20
            
        },

        imageStyle: {
            width: "90%",
             height: BannerHeight , 
             alignSelf:"center",
            borderRadius:20,
           
         
          },

    
    });