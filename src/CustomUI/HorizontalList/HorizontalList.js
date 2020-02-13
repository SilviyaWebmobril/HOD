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

    onProductItemHandler = (id,name) => {

         this.props.navigation.navigate("CategoryProduct",{"category_id":id,"name":name});

    }
  

    renderItem(data) {
        let { item, index } = data;

        return (
        
                <View  key={item.id} >
                    <TouchableHighlight  onPress={()=>this.onProductItemHandler(item.id,item.name) }>
                        <View>
                            <Image source={{uri:"http://webmobril.org/dev/hod/"+item.cat_img}} 
                            style={styles.cardView}/>
                            <View  style={styles.topImageStyle}>
                                <Image source={require('../../Assets/overlay.png')} resizeMode="contain"  style={{width:122,height:130,borderRadius:20}} />
                            </View>
                            <Text  numberOfLines={3} style={styles.textStyle}>{item.name}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
          
       
        ) 
      }

    
    render(){
    
        return(
            <View style={{marginTop:10}}>
                
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

    cardView:{
        alignItems:"center",
        width:120,
        height:130,
        borderRadius:10,
        marginLeft:10,
        marginRight:8,
        marginTop:10,
        marginBottom:10,
        borderColor:"#E8E8E8",
         borderWidth:1

    },
    topImageStyle:{
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        width:100,
        height:130,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        marginLeft:10,
        marginRight:8,
       
    },
    textStyle:{
        fontFamily:"roboto-bold",
        fontSize:17,
        position: 'absolute',
        alignSelf:"center",
        marginTop:10,
        lineHeight:20,
        marginLeft:35,
        alignItems:"center",
        justifyContent:"center",
        color:'white'
    }



});