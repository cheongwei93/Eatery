import React , {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card, CardItem, Tab, Body } from 'native-base';

import pic1 from '../../images/Sushi/001.jpg';



const card = function({imgSource, foodName}){
    return(
        <TouchableOpacity style={styles.card}>
            <Image
                source={imgSource}
                style={styles.cardImage}
            />
            <Text style={styles.cardText}>{foodName}</Text>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardText: {
        fontSize: 20,
        marginLeft: 10,
        marginVertical: 10
    },
    card: {
        backgroundColor: 'white',
        marginBottom: 10,
        width: '100%',
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center'

    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 20
    }
});

export default card;