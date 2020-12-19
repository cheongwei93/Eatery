import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import bImage from '../../images/logo/logo.png';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';



const app = function () {
    return (
        

        <View style={styles.container}>

            

            <Image
                source={bImage}
                style={styles.logo}
            />
            
            <FormInput
              
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
            />

            <FormInput
         
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                title="Sign In"
                onPress={() => alert('signed in')}
                
            />

            <FormButton
                title="Register"
            />
            

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 100,
        paddingBottom: 175,
        backgroundColor: 'white'
    },

    logo: {
        height: 250,
        width: 250,
        resizeMode: 'cover',
        
    },

    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },

    navButton: {
        marginTop: 15,
    },

    forgotButton: {
        marginVertical: 35,
    },

    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        
    }
});

export default app;