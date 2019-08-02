import React ,{ Component}  from 'react';
import { View ,Text,StyleSheet, Image,FlatList,Dimensions}   from 'react-native';
import {images} from './imageUri';
import { ScrollView } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default  class HorizontalList extends  Component {

    constructor(props){
        super(props);
        console.log("i am ahere",images);
        this.state = {
            images : [...images]
        }

       
    }

  

    renderItem(data) {
        let { item, index } = data;

        return (
        
                <View  key={item.id} >
                    <Image source={item.image_url} style={styles.cardView}/>
                    <Image source={require('../../../Assets/overlay.png')} style={styles.topImageStyle} />
                    <Text  numberOfLines={3} style={styles.textStyle}>{item.text}</Text>
                </View>
          
       
        ) 
      }

    
    render(){
    
        return(
            <View >
                
                <FlatList
                        
                        horizontal= {true}
                        decelerationRate={0}
                        snapToInterval={SCREEN_WIDTH - 60}
                        snapToAlignment={"center"}
                        contentInset={{
                        top: 0,
                        left: 30,
                        bottom: 0,
                        right: 30,
                        }}
                        data={this.state.images}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem.bind(this)}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        legacyImplementation={false}
                      

                    />

           
            </View>
        );
    }
}

const styles = StyleSheet.create({

    cardView:{
        alignItems:"center",
        width:120,
        height:130,
        borderRadius:10,
        marginLeft:10,
        marginRight:8,
        marginTop:5,
        marginBottom:10

    },
    topImageStyle:{
        position: 'absolute',
        width:120,
        height:130,
        borderRadius:10,
        marginLeft:10,
        marginRight:8,
        marginBottom:10
    },
    textStyle:{
        fontSize:17,
        position: 'absolute',
        alignSelf:"center",
        marginTop:10,
        lineHeight:20,
        marginLeft:35,
        alignItems:"center",
        justifyContent:"center",
        fontWeight:"bold",
        color:'white'
    }



});