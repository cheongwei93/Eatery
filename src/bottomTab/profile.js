import axios from 'axios';
import React, {Component, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncRetrieve from '../components/AsyncRetrieve';

const windowHeight = Dimensions.get('window').height;



const profile = function({navigation}){

    const[data, setData] = useState([]);

    useEffect(()=>{
        getDetails();
    });

    const getDetails = async function(){
        let ID = await AsyncRetrieve();
        let buildhttp = 'http://192.168.43.13:3303/user/get/' + ID;
        axios.get(buildhttp)
        .then((res)=>{
            setData(res.data.result[0]);
        }).catch((err)=>{
            res.send(err);
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <FontAwesome name="user-circle" size={120} style={styles.icon} color="#b9b9b9"/>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                    <Text style={styles.output}>
                       {data.name}
                    </Text>
                    <Text style={styles.label}>Name</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.output}>
                        {data.email}
                    </Text>
                    <Text style={styles.label}>Email</Text>
                </View>
                <TouchableOpacity style={styles.update} onPress={()=>{navigation.navigate('Update Profile')}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold',color: '#FFFFFF',}}>
                            Update Profile
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logout} onPress={()=>{navigation.navigate('login2')}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold',color: '#FA4B3E'}}>
                            Log Out
                        </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: 'white',
        height: 200,
        width: '100%'
    },
    icon: {
        alignSelf: 'center',
        marginTop: 40
    },
    detailsContainer: {
        alignSelf: 'center',
        width: '95%',
        height: 400,
        paddingHorizontal: 30
    },
    detail: {
        marginBottom: 30
    },
    output: {
        fontSize: 25,
        borderBottomWidth: 2,
        borderColor: '#FA4B3E',
        marginBottom: 2,
        paddingBottom: 10,
        color: '#333333'
    },
    label: {
        fontSize: 18,
        color: '#FA4B3E',
        fontWeight: 'bold'
    },
    update: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#FA4B3E',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    logout: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#FA4B3E'
    }
});

export default profile;