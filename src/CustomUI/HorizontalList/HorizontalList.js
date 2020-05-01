import React ,{ Component}  from 'react';
import { View ,Text,StyleSheet, Image,FlatList,Dimensions,TouchableHighlight}   from 'react-native';
import { withNavigation } from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;


class HorizontalList extends  Component {

    constructor(props){
        super(props);
       
        this.state = {
            images : []
        }

       
    }

    onProductItemHandler = (id,name,type,store_address) => {

        let storeAdd = "";
        if(type == 2){
            storeAdd = store_address;
        }

         this.props.navigation.navigate("CategoryProduct",{"category_id":id,"name":name, "type" : type , "store_address" : storeAdd,
         updateProductList:(product_id, quantity)=>this.props.updateProductList(product_id,quantity)
        });

    }
  
    

    renderItem(data) {
        let { item, index } = data;
        return (
        
                <View  key={item.id} >
                    <TouchableHighlight  onPress={()=>this.onProductItemHandler(item.id,item.name,item.type,item.store_address) }>
                        <View style={styles.container}>
                            <View style={styles.backgroundContainer}>
                                <Image source={{uri:"http://webmobril.org/dev/hod/"+item.cat_img}} 
                                
                                style={styles.cardView}/>
                            </View>
                            <View style={{justifyContent:"center", width:"100%",height:"90%",}}>
                                <Image source={require('../../Assets/overlay2.png')} resizeMode="contain"  style={styles.topImageStyle}  />
                                <Text  numberOfLines={3} style={styles.textStyle}>{item.name}</Text>
                            </View>
                           
                        </View>
                    </TouchableHighlight>
                </View>
          
       
        ) 
      }

    
    render(){
    
        return(
            <View style={{marginTop:2,marginLeft:10,marginRight:10}}>
                
                <FlatList
                        
                        horizontal= {true}
                        decelerationRate={0}
                        snapToInterval={SCREEN_WIDTH - 60}
                        snapToAlignment={"center"}
                        data={this.props.products}
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

export default withNavigation(HorizontalList);
const styles = StyleSheet.create({

    backgroundContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },

      container: {
        width:"90%",
        height:150,
        marginLeft:5,
        marginRight:5,
        
      },
    cardView:{
        alignItems:"center",
        width:"100%",
        height:"90%",
        borderRadius:5,
        marginTop:10,
        marginBottom:10,
        borderColor:"#E8E8E8",
         borderWidth:1

    },
    topImageStyle:{
        alignSelf:'center',
    },
    textStyle:{
        textAlign:'left',
        fontFamily:"roboto-bold",
        fontSize:17,
        position: 'absolute',
        alignSelf:"flex-start",
        lineHeight:20,
        marginLeft:35,
        color:'white',
        top:15,
        right:30
    }



});