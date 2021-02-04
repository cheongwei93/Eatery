import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const profile = function(){
    return(
        <View style={styles.container}>
            <View>
                <FontAwesome name="user-circle"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({});

export default profile;