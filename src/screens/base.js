import { Tab } from 'native-base';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Tabscreen from '../components/TabScreen'; 

class base extends Component{

    static navigationOptions={
        headerLeft: null
    }

    render(){
        return(
            <View style={styles.container}>
                
                <Tabscreen/>
            </View> 
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    }
});

export default base;