import React ,{Component} from 'react';
import {View ,Text,StyleSheet,TouchableHighlight} from 'react-native';

export default class SmallButton extends Component {


    render(){

        return(

            <View style={styles.container}>

                <TouchableHighlight
                 onPress={this.props.onPressHandler}
                 disabled={this.props.disabled}>

                    <View
                    style={[styles.buttonView,this.props.selected]}>

                        <Text style={styles.text}>
                            {this.props.buttonText}
                        </Text>
                    </View>

                </TouchableHighlight>

            </View>

        )
    }
}


const styles  = StyleSheet.create({


    container:{
        width:"10%",
        height:"7%",
        margin:5,
       
    },
    buttonView:{
        backgroundColor:"grey",
        padding:7,
        borderColor:"grey",
        borderRadius:2
    },
    text:{
        fontFamily:"Roboto-Light",
        fontSize:12,
        color:"black",
        justifyContent:"center",
        alignSelf:"center"

    }

})