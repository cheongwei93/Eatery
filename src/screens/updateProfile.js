import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';

import AsyncRetrieve from '../components/AsyncRetrieve';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let AttemptCount = 0;

const updateProfile = function(){

    const[data, setData] = useState([]);
    const[render, setRender] = useState(true);


    const[name, setName] = useState("name");
    const[password, setPassword] = useState("password");
    const[confirmPassword, setConfirmPassword] = useState("confirmpassword");

    useEffect(()=>{
        if(render === true){
            getDetails();
        }
    });

    const getDetails = async function(){
        let ID = await AsyncRetrieve();
        let buildhttp = 'http://192.168.43.13:3303/user/get/' + ID;
        axios.get(buildhttp)
        .then((res)=>{
            setData(res.data.result[0]);
            setRender(false);
        }).catch((err)=>{
            res.send(err);
        })
    }

    const update = async function(){
        AttemptCount = AttemptCount + 1;
        
        if(AttemptCount === 1){
            if(name === "name" || password === "password" || confirmPassword === "confirmpassword"){
                Alert.alert('Please Fill in the Blank', 'Please Try Again', [
                    { text: 'Try Again' }
                ]);
            }
        }else if (name !== "name" || password !== "password" || confirmPassword !== "confirmpassword"){
            if(password !== confirmPassword){
                Alert.alert('Passwords do not match!', 'Please Try Again', [
                    { text: 'Try Again' }
                ]);
            }else if(password === confirmPassword){
                let ID = await AsyncRetrieve();
                axios.put('http://192.168.43.13:3303/user/update', {
                    ID: ID,
                    name: name,
                    password: password
                }).then((res)=>{
                    Alert.alert('Update Success!', ' ', [
                        { text: 'Continue' }
                    ]);
                }).catch((err)=>{
                    res.send(err);
                })
            }

        }
        
    }

    return(
        <View style={styles.container}>
            <Text style={styles.detail}>Name</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    value={data.name}
                    style={styles.input}
                    placeholder={data.name}
                    placeholderTextColor='#666666'
                    onChangeText={text => setName(text)}
                />
            </View>

            <Text style={styles.detail}>Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor='#666666'
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>

            <Text style={styles.detail}>Confirm Password</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor='#666666'
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity style={styles.submit} onPress={()=>{update()}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold',color: '#FFFFFF',}}>
                        Submit
                    </Text>
            </TouchableOpacity>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    inputContainer: {
        height: windowHeight / 15,
        borderColor: '#b9b9b9',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 20,
        color: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detail: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#FA4B3E',
        marginTop: 40
    },
    submit: {
        marginTop: 50,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#FA4B3E',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    back: {
        marginTop: 20,
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

export default updateProfile;