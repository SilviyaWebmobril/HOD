import React from 'react';
import {View ,Image,StyleSheet} from 'react-native';

const CustomLogo  = (props) => {
    return(
        <View style={[logoStyle.logoTop , props.customLogoStyle]}>
            <Image source={require('../../../Assets/logo1.png')}/>
        </View>
    );
}

export default CustomLogo ;


const logoStyle = StyleSheet.create({

    logoTop:{
        marginTop:40,
        marginBottom:40,
        width:'100%',
        height:150,
        justifyContent: 'center',
        alignItems: 'center',
      
      },


});
