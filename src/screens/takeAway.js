import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, Alert, TextInput} from 'react-native';
import { Picker } from '@react-native-community/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import AsyncRetrieve from '../components/AsyncRetrieve';
import axios from 'axios';

let delAttemptCount = 0;

const takeaway = function({navigation}){
    let takeawayID;
    const [time, setTime] = useState('Time');
    const [data, setData] = useState([]);
    const [render, setRender] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [deletemodalVisible, setDeleteModalVisible] = useState(false);
    const [deleteOrderID, setDeleteOrderID] = useState('Enter Order ID');

    useEffect(()=>{
        if(render === true){
            checkTakeAway();
        }
       
    });

    const Time = function () {
        var date = ["09.00 AM", "09.30 AM", "10.00 AM", "10.30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
            "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM"];
        var result = [];
        var key = 1;
        for (let item of date) {
            result.push(
                <Picker.Item label={item} value={item} key={key} />
            );
            { key = key + 1 }
        }
        return result;
    }
  
    const insertTakeAway = async function(){
        let ID = await AsyncRetrieve();
        if(time === "Time"){
            Alert.alert('Please Select Time', '', [
                { text: 'Continue' }
            ]);
        }else{
            axios.post('http://10.0.2.2:3303/takeaway/add', {
                time: time,
                userID: ID
            }).then((res)=>{
                takeawayID = res.data.result.insertId;
                Alert.alert('Time Booked', '', [
                    { text: 'Continue' }
                ]);
                setRender(true);
            })
        }
        
    }   

    const checkTakeAway = async function(){
        let ID = await AsyncRetrieve();
        let buildhttp = 'http://10.0.2.2:3303/takeaway/' + ID;
        axios.get(buildhttp)
        .then((res)=>{
            let result = res.data.result;
            setData(result);
            setRender(false);
        })
    }

    const showTakeAway = function(){
        let key = 0;
        return data.map(item => {
            key = key + 1;
            return buildCard(key, item.time, item.id);
        });
    }
    


    const buildCard = function(key, time, id){
        return(
            <TouchableOpacity key={key} onPress={()=>{navigation.navigate('Confirm Order',{takeawayID: id})}}>
                <View style={styles.card}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.time}>
                            {time}
                        </Text>
                        <Text style={{marginLeft: 200, position: 'absolute'}}>
                            TAKE-AWAY ID : {id}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        
    }

    const deleteTakeAway = async function(){
        delAttemptCount = delAttemptCount + 1;
        let buildhttp = 'http://10.0.2.2:3303/takeaway/' + deleteOrderID;
        if(delAttemptCount === 1){
            if(deleteOrderID === 'Enter Order ID'){
                delAttemptCount = 0;
                Alert.alert('Please Fill in the Blank', 'Please Try Again', [
                    { text: 'Try Again' }
                ]);
            }
        } else {
            axios.delete(buildhttp)
            .then((res) => {
                if(res.data.result.affectedRows === 0){
                    delAttemptCount = 0;
                    Alert.alert('Booking ID not exist', ' ', [
                        { text: 'Continue' }
                    ]);
                }else if(res.data.result.affectedRows > 0){
                    delAttemptCount = 0;
                    Alert.alert('Take Away Successfully Removed', '', [
                        { text: 'Continue' }
                    ]);
                    setRender(true);
                    setDeleteModalVisible(false);
                }
                
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return(
        <View style={styles.container}>
            {showTakeAway()}
            
            <TouchableOpacity style={styles.Button} onPress={()=>{setModalVisible(true)}}>
                <Text style={styles.buttonText}>Add Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancel} onPress={()=>{setDeleteModalVisible(true)}}>
                <Text style={[styles.buttonText, {color: '#CD0000'}]}>Cancel Take Away</Text>
            </TouchableOpacity>

            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>

                        <View style={styles.pickerRow}>
                            <Entypo name={"time-slot"} size={40} color='#FA4B3E' style={styles.icon3} />
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={time}
                                    onValueChange={(itemValue, itemIndex) => { setTime(itemValue) }}
                                    style={{ fontSize: 20, color: 'black' }}
                                >
                                    <Picker.Item label="Time" />
                                    {Time()}
                                </Picker>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                            <TouchableOpacity style={styles.checkButton} onPress={() => { setModalVisible(false) }}>
                                <AntDesign name={"close"} size={40} color='white' style={styles.cancelButton} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkButton} onPress={() => { insertTakeAway() }}>
                                <Entypo name={"check"} size={40} color='white' style={styles.checkIcon} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={deletemodalVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={{ alignSelf: 'center', fontSize: 30, marginTop: 150, color: '#FA4B3E', fontWeight: 'bold' }}>
                            Cancel Take Away
                        </Text>
                        <View style={{ borderBottomWidth: 2, borderColor: '#FA4B3E', marginTop: 40, marginBottom: 40, alignSelf: 'center', width: '80%' }}>
                            <TextInput
                                keyboardType='number-pad'
                                placeholder='Enter Take-Away ID'
                                placeholderTextColor='#BEBEBE'
                                style={{
                                    alignSelf: 'center',
                                    fontSize: 25
                                }}
                                onChangeText={text => setDeleteOrderID(text)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                            <TouchableOpacity style={styles.checkButton} onPress={() => { setDeleteModalVisible(false) }}>
                                <AntDesign name={"close"} size={40} color='white' style={styles.cancelButton} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkButton} onPress={() => { deleteTakeAway() }}>
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
    container:{
        padding: 20,
        paddingTop: 100
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#FA4B3E',
        borderRadius: 5,
        marginVertical: 15,
        width: '80%'

    },
    pickerRow: {
        flexDirection: 'row',
        marginVertical: 10,
        marginTop: 200,
        marginLeft: 10
    },
    icon3: {
        marginVertical: 22,
        marginRight: 20,
        marginLeft: -10
    },
    Button: {
        width: '60%',
        backgroundColor: '#FA4B3E',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 8,
        marginTop: 30
    },
    cancel: {
        width: '60%',
        backgroundColor: 'white',
        borderColor: '#CD0000',
        borderWidth: 2,
        alignSelf: 'center',
        padding: 15,
        borderRadius: 8,
        marginTop: 30
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
        
    },
    card: {
        margin: 10,
        borderRadius: 5,
        borderColor: '#FA4B3E',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 20

    },
    time: {
        color: 'black',
        paddingTop: 10,
        fontSize: 18,
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

export default takeaway;