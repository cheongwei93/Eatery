import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;


const FormButton = function({title}){
    return(
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#FA4B3E',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        
    }
});

export default FormButton;