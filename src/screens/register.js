import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-native';

import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'native-base';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const register = function({navigation}) {

    const [username, setusername] = useState("username");
    const [password, setPassword] = useState("password");
    const [password2, setPassword2] = useState("password2");
    const [name, setName] = useState("name");

    const addUser = function(){
        if(username === "username" || password === "password" || password2 === "password2" || name === "name"){
            Alert.alert('Please fill in the blank','',[
                {text: 'Continue'}
            ]);
        }else{
            if(password !== password2){
                Alert.alert('Password not match !','Please Try Again.',[
                    {text: 'Try Again'}
                ]);
            }else{
                axios.post('http://10.0.2.2:3303/user/register', {
                    username: username,
                    password: password,
                    name: name
                }).then(()=>{
                    Alert.alert('Registration Success','',[
                        {text: 'Continue'}
                    ]);
                    navigation.navigate('login2');
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }
        
        
    }


    const checkusername = async function(){
        axios.post("http://10.0.2.2:3303/user/check", {
            username: username
        }).then((res)=>{
            let data = res.data.result;
            if(data.length > 0){
                Alert.alert('username Registered.','Try new username',[
                    {text: 'Try Again'}
                ]);
            }else{
                addUser();
            }
        })
    }

    return (
        <Animatable.View style={styles.container} animation="fadeIn" duration={500}>
            <View style={styles.top}>

            </View>

            <View style={styles.middle}>

            </View>

            <Animatable.View style={styles.bottom} animation="fadeInUpBig" delay={1000}>
                <Text style={styles.signup}>Sign Up</Text>

                <View style={styles.inputContainer}>
                    <AntDesign name={"user"} size={25} color="#666666" style={styles.icon} />
                    <TextInput
                        placeholder="username"
                        numberOfLines={1}
                        fontSize={20}
                        onChangeText={text => setusername(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <AntDesign name={"lock"} size={25} color="#666666" style={styles.icon} />
                    <TextInput
                        placeholder="Password"
                        numberOfLines={1}
                        fontSize={20}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Fontisto name={"locked"} size={23} color="#666666" style={styles.icon2} />
                    <TextInput
                        placeholder="Confirm Password"
                        numberOfLines={1}
                        fontSize={20}
                        onChangeText={text => setPassword2(text)}
                        secureTextEntry={true}
                    />
                </View>



                <View style={styles.inputContainer}>
                    <FontAwesome5 name={"user-tag"} size={23} color="#666666" style={styles.icon2} />
                    <TextInput
                        placeholder="Name"
                        numberOfLines={1}
                        fontSize={20}
                        onChangeText={text => setName(text)}
                    />
                </View>

                <Button style={styles.button} onPress={ ()=>{checkusername()}}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Button>

                <Button style={styles.backButton} onPress={()=>navigation.navigate('login2')}>
                    <Text style={styles.buttonText2}>Back</Text>
                </Button>

            </Animatable.View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#FA4B3E',
        flexDirection: 'column-reverse'
    },
    top: {
        position: 'relative',
        width: '100%',
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'white'
    },
    bottom: {
        backgroundColor: 'white',
        height: 570,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40
    },
    signup: {
        top: '-12%',
        fontSize: 30,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 20
    },
    inputContainer: {
        top: '0%',
        width: '85%',
        height: 50,
        marginLeft: 30,
        borderColor: '#cccccc',
        borderBottomWidth: 1.5,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginVertical: 20
    },
    icon: {
        padding: 10,
        paddingRight: 20

    },
    icon2: {
        paddingVertical: 10,
        paddingLeft: 13,
        paddingRight: 22
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        width: '50%',
        borderRadius: 20,
        backgroundColor: '#FA4B3E',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    backButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        width: '50%',
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: '#FA4B3E',
        borderWidth: 0.5,
    },
    buttonText2: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FA4B3E',
        fontWeight: 'bold'
    }
});

export default register;