import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { Form, Item, Input, Body, CheckBox, Button } from 'native-base';
import logo from '../../images/logo/text.png';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

//AsyncStorage
import store from '../components/AsyncStore';

const login = function ({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const verify = function(){
        if(!email || !password){
            Alert.alert('Please Enter Username or Password !', 'Please Try Again', [
                {text: 'Try Again'}
            ])
        }else{
            axios.post('http://192.168.0.115:3303/user/login', {
                email: email,
                password: password
            }).then((res)=>{
                if(res.data.auth === "FALSE"){
                    Alert.alert('Username or Password incorrect!', 'Please Try Again',[
                        {text: 'Try Again'}
                    ]);
                    
                }else if(res.data.auth === "TRUE"){
                    let result = res.data.result[0].id;
                    result = result.toString();
                    store(result);
                    navigation.navigate('base');
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }




    return (


        // container
        <View style={styles.container}>

            {/* top side */}
            <Animatable.View style={styles.top} animation="fadeInDownBig">
                <Image source={logo} style={styles.image} />
            </Animatable.View>

            {/* middle side */}
            <Animatable.View style={styles.middle} animation="fadeInUpBig">

                <View style={styles.form}>
                    <Text style={styles.signin}>Sign In</Text>
                    <Form style={styles.mainform}>

                        <Item style={styles.formItem}>
                            <Input placeholder="Email" style={styles.Input} onChangeText={text => setEmail(text)} />
                        </Item>
                        <Item style={styles.formItem}>
                            <Input placeholder="Password" style={styles.Input} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
                        </Item>
                        <Button style={styles.button} onPress={()=>{verify()}}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Button>

                        <View style={{
                            flexDirection: 'row',
                            alignSelf: 'center'
                        }}>
                            <Text style={styles.text}>Don't have an account?</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('register')}>
                                <Text style={styles.signup}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                    </Form>

                </View>


            </Animatable.View>

            {/* bottom side */}
            <View style={styles.bottom}>

            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    top: {
        position: 'relative',
        backgroundColor: '#FA4B3E',
        height: 300,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50
    },
    middle: {
        width: '100%',
        height: '100%',
        flex: 1,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'transparent',
        paddingLeft: 26,
        paddingRight: 26

    },
    bottom: {
        position: 'relative',
        width: '100%',
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'white'
    },
    form: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: 'white',
        top: '20%',
        paddingBottom: 40,
        borderRadius: 10,

    },
    signin: {
        top: 0,
        color: 'black',
        fontSize: 24,
        fontFamily: 'Roboto',
        marginBottom: 30,
        position: 'relative',
        top: '8%',
        alignSelf: 'center'
    },
    formItem: {
        marginTop: 15,
        borderBottomColor: 'black',
        marginRight: 20
    },
    button: {
        height: 50,
        marginTop: 60,
        marginBottom: 40,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#FA4B3E',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        alignSelf: 'center',
        width: 200,
        height: 200
    },
    text: {
        marginTop: 20,
        marginBottom: 60,
        fontSize: 18,
        fontFamily: 'Roboto',
        alignSelf: 'center'
    },
    signup: {
        marginTop: 20,
        marginBottom: 60,
        fontSize: 18,
        fontFamily: 'Roboto',
        alignSelf: 'center',
        color: '#1877f2'
    }

});

export default login;