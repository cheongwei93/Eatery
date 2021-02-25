import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncRetrieve from '../components/AsyncRetrieve';

const windowsWidth = Dimensions.get('window').width;

const checkin = function () {

    const [checkinID, setCheckInID] = useState('Enter Booking ID');
    const [modalVisible, setModalVisible] = useState(false);
    const [tableNumber, setTableNumber] = useState("?");

    useEffect(()=>{
        checkTableNumber();
    });


    const checkin = async function () {
        if(checkinID === "Enter Booking ID"){
            Alert.alert('Please Enter Booking ID', ' ', [
                { text: 'Continue' }
            ]);
        }else{
            let ID = await AsyncRetrieve();
            await checkTableNumber();
            axios.put('http://10.0.2.2:3303/schedule/checkin', {
                ID: checkinID,
                userID: ID,
                tableNumber: tableNumber
            }).then((res) => {
                if(res.data.result.affectedRows === 0){
                    Alert.alert('Try Again', ' ', [
                        { text: 'Continue' }
                    ]);
                }else{
                    tabletaken();
                    Alert.alert('Checked In', ' ', [
                        { text: 'Continue' }
                    ]);
                }
                
            }).catch((err) => {
                res.send(err);
            })
        }
        
    }

    const checkTableNumber = async function () {
        axios.get('http://10.0.2.2:3303/schedule/table')
        .then((res) => {
            setTableNumber(res.data.result[0].id);
        })

    }

    const tabletaken = async function(){
        axios.put('http://10.0.2.2:3303/schedule/notavailable',{
            ID: tableNumber
        });
    }

    return (
        <View>
            <View style={styles.table}>
                <Text style={styles.text}>Table Number</Text>
                <Text style={styles.number}>{tableNumber - 1}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(true) }}>
                <View>
                    <Text style={styles.buttonText}>
                        CHECK IN
                    </Text>
                </View>
            </TouchableOpacity>

            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={{ alignSelf: 'center', fontSize: 30, marginTop: 150, color: '#FA4B3E', fontWeight: 'bold' }}>
                            Check In
                        </Text>
                        <View style={{ borderBottomWidth: 2, borderColor: '#FA4B3E', marginTop: 40, marginBottom: 40, alignSelf: 'center', width: '80%' }}>
                            <TextInput
                                keyboardType='number-pad'
                                placeholder='Enter Booking ID'
                                placeholderTextColor='#BEBEBE'
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 25
                                }}
                                onChangeText={text => setCheckInID(text)}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                            <TouchableOpacity style={styles.checkButton} onPress={() => { setModalVisible(false) }}>
                                <AntDesign name={"close"} size={40} color='white' style={styles.cancelButton} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkButton} onPress={() => { checkin() }}>
                                <Entypo name={"check"} size={40} color='white' style={styles.checkIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        height: 200,
        borderWidth: 2,
        borderColor: '#FA4B3E',
        width: windowsWidth / 2,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 20,
        backgroundColor: '#FA4B3E',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white'
    },
    number: {
        fontSize: 100,
        alignSelf: 'center',
        color: 'white'
    },
    button: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 60,
        width: windowsWidth / 1.2,
        borderRadius: 20,
        marginVertical: 40,
        borderColor: '#FA4B3E',
        borderWidth: 2
    },
    buttonText: {
        alignSelf: 'center',
        paddingTop: 12,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FA4B3E'
    },
    modal: {
        backgroundColor: '#000000aa',
        flex: 1
    },
    modalContent: {
        backgroundColor: '#ffffff',
        margin: 20,
        padding: 40,
        borderRadius: 10,
        flex: 1
    },
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#CD0000',
        borderRadius: 50,
        padding: 10
    },
    checkIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#00cc00',
        borderRadius: 50,
        padding: 10,

    },

});


export default checkin;