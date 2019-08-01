import React ,{ Component}  from 'react';
import { View ,Text, Image,FlatList,Dimensions}   from 'react-native';
import {images} from './imageUri';

const SCREEN_WIDTH = Dimensions.get('window').width;
import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const sliderWidth = viewportWidth;


export default  class HorizontalList extends  Component {

    constructor(props){
        super(props);
        console.log("i am ahere",images);
        this.state = {
            images : [...images]
        }

       
    }

     wp (percentage) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }

    renderItem(data) {
        let { item, index } = data;

        return (
          <View  key={item.id}>
            <Image source={item.image_url} style={{width:100,height:100}}/>
          </View>
        ) 
      }

      _renderItem ({item, index}) {
        return (
            <View  key={item.id}>
                <Image source={item.image_url} />
          </View>
        );
    }

    render(){
        const slideWidth = this.wp(75);
        const itemHorizontalMargin = this.wp(2);
        const itemWidth = slideWidth + itemHorizontalMargin * 2;
        return(
            <View>
                <FlatList
                    horizontal  
                    data={this.state.images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem.bind(this)}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    style={{width: SCREEN_WIDTH + 5, height:'100%'}}

                />
                {/* <Carousel
                    layout={'default'}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.images}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    /> */}
            </View>
        );
    }
}