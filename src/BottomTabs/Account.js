import React , { Component } from 'react';
import {View, Text } from 'react-native';
import CustomTopHeader  from './CustomTopHeader';

export default class Account extends Component {

    static navigationOptions = () => {
        return {
            headerLeft: <CustomTopHeader/>
        };
    };


    render(){
        return(

            <View>
                <Text>Account Screen</Text>
            </View>


        );
    }

}