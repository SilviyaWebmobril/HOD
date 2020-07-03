import React ,{ Component}  from 'react';
import { View ,Text,StyleSheet, Image,FlatList,Dimensions,TouchableHighlight}   from 'react-native';
import { withNavigation } from 'react-navigation';
import ApiUrl from '../../Api/ApiUrl';

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

         this.props.navigation.navigate("CategoryProduct",{"category_id":id,"name":name,
         updateProductList:(product_id, quantity)=>this.props.updateProductList(product_id,quantity)
        });

    }
  
    

    renderItem(data) {
        let { item, index } = data;
        return (
        
                <View  key={item.id} >
                    <TouchableHighlight  
                    style={styles.container}
                    onPress={()=>this.onProductItemHandler(item.id,item.name,item.type,item.store_address) }>
                        <>
                        <Image source={{uri:ApiUrl.image_url+item.cat_img}} 
                        style={styles.cardView}/>
                        <Text  numberOfLines={2} style={styles.textStyle}>{item.name}</Text>
                        </>
                    </TouchableHighlight>
                </View>
          
       
        ) 
      }

    
    render(){
    
        return(
            <View style={{marginTop:10,marginLeft:10,marginRight:10,marginBottom:10}}>
                
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
        width:150,
        height:210,
        borderRadius:7,
        borderColor:"#dcdcdc",
        borderWidth:1,
        marginRight:10,
        elevation:2,
       
        // justifyContent:"center",
        // alignItems:"center"
      },
    cardView:{
       // alignItems:"center",
        //width:"100%",
        height:150,
        borderRadius:7,
        borderColor:"white",
        borderWidth:1,
        marginBottom:5

    },
   
    textStyle:{
       // width:"100%",
        textAlign:'center',
        fontFamily:"roboto-bold",
        fontSize:14,
        marginBottom:10,
        alignSelf:"center",
        lineHeight:20,
        color:'black',
        marginLeft:10,
        marginRight:10
    }



});