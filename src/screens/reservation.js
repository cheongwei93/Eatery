import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';


import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncRetrieve from '../components/AsyncRetrieve';
import ScheduleTime from '../components/ScheduleTime';

let AttemptCount = 0;
let delAttemptCount = 0;
let ID;
const booking = function () {

    const [render, setRender] = useState(true);

    const [time, setTime] = useState('Time');
    const [modalVisible, setModalVisible] = useState(false);
    const [deletemodalVisible, setDeleteModalVisible] = useState(false);

    const [day, setDay] = useState('Day');
    const [month, setMonth] = useState('Month');
    const [year, setYear] = useState('Year');
    const [opacity, setOpacity] = useState('Opacity');
    const [deleteOrderID, setDeleteOrderID] = useState('Enter Order ID');

    const [data, setData] = useState([]);

    useEffect(() => {
        if(render === true){
            Booked();
        }
    });

    

    const deleteSchedule = async function () {
       
        delAttemptCount = delAttemptCount + 1;
        ID = await AsyncRetrieve();
        let buildhttp = 'http://192.168.43.13:3303/schedule/delete/' + deleteOrderID;
        if (deleteOrderID === '') {
            if (delAttemptCount === 1) {
                Alert.alert('Please Fill in the Blank', 'Please Try Again', [
                    { text: 'Try Again' }
                ]);
            }
        } else {
            console.log(deleteOrderID);
            axios.delete(buildhttp)
            .then((res) => {
                Alert.alert('Schedule Successfully Removed', '', [
                    { text: 'Continue' }
                ]);
                setDeleteModalVisible(false);
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    const Booked = async function () {
        ID = await AsyncRetrieve();
        let buildhttp = 'http://192.168.43.13:3303/schedule/check/' + ID;
        let arr = [];
        axios.get(buildhttp)
        .then((res) => {
            let result = res.data.result;
            setData(result);
            setRender(false);
            getSchedule();
        }).catch((err) => {
            console.log(err);
        })
    }

    const getSchedule = function () {
        let key = 1;
        return data.map(item => {
            key = key + 1;
            return <ScheduleTime key={key} orderID={item.ID} day={item.day} month={" " + item.month} year={" " + item.year} time={item.time} opacity={item.opacity} />
        })
    }

    const addSchedule = async function () {
        AttemptCount = AttemptCount + 1;
        if (AttemptCount === 1) {
            if (time === 'Time' || day === 'Day' || month === 'Month' || year === 'Year' || opacity === 'Opacity') {
                Alert.alert('Please Fill in the Blank', 'Please Try Again', [
                    { text: 'Try Again' }
                ]);
            }
        }
        else if (time !== 'Time' || day !== 'Day' || month !== 'Month' || year !== 'Year' || opacity !== 'Opacity') {
            let ID = await AsyncRetrieve();
            console.log(ID);
            axios.post('http://192.168.43.13:3303/schedule/add', {
                time: time,
                day: day,
                month: month,
                year: year,
                opacity: opacity,
                userID: ID
            }).then((res) => {
                console.log(res.data.message);
                Alert.alert('Success', 'Schedule Added', [
                    { text: 'Back' }
                ]);
            }).catch((error) => {
                console.log(error)
            })

        }

    }


    // looping



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

    const Days = function () {
        var day = [];
        var days = [];
        var special = [];

        let selectedDay;

        var result = [];
        var key = 1;

        for (let x = 1; x < 32; x++) {
            days.push(x);
        }

        for (let x = 1; x < 31; x++) {
            day.push(x);
        }
        for (let x = 1; x < 29; x++) {
            special.push(x);
        }

        if (month === "February") {
            selectedDay = special;
        }
        else if (month === "April" || month === "June" || month === "September" || month === "November") {
            selectedDay = day;
        } else {
            selectedDay = days;
        }


        for (let item of selectedDay) {
            item = item.toString();
            result.push(
                <Picker.Item label={item} value={item} key={key} />
            )
            { key = key + 1 }
        }
        return result;

    }

    const Months = function () {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var result = [];
        var key = 1;

        for (let item of months) {
            result.push(
                <Picker.Item label={item} value={item} key={key} />
            )
            { key = key + 1 }
        }
        if (month) {

        }
        return result;
    }

    const Years = function () {
        var year = ["2021", "2022", "2023"];
        var result = [];
        var key = 1;

        for (let item of year) {
            result.push(
                <Picker.Item label={item} value={item} key={key} />
            )
            { key = key + 1 }
        }
        return result;
    }

    const Amount = function () {
        var result = [];
        var key = 1;

        for (let x = 1; x < 10; x++) {
            x = x.toString();
            result.push(
                <Picker.Item label={x} value={x} key={key} />
            )
            { key = key + 1 }
        }
        return result;
    }




    return (

        <View style={styles.container}>
            <ScrollView>
                <View stlye={styles.middle}>
                    <View style={styles.cardBorder}>
                        {/* <TouchableOpacity>
                            <View style={styles.card}>
                                <Text style={styles.date}>
                                    31/01/2021
                            </Text>
                                <Text style={styles.time}>
                                    Time: 1700 Hours
                            </Text>
                                <Text style={styles.opacity}>
                                    5
                            </Text>
                                <AntDesign name={"user"} size={25} color='#FA4B3E' style={styles.icon} />
                            </View>
                        </TouchableOpacity> */}


                        {getSchedule()}

                        <TouchableOpacity style={styles.reserveButton} onPress={() => { setModalVisible(true) }}>
                            <Fontisto name={"date"} size={25} color='white' style={styles.icon2} />
                            <Text style={styles.buttonText}>MAKE RESERVATION</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelReservation} onPress={() => { setDeleteModalVisible(true) }} >
                            <AntDesign name={"close"} size={25} color='#CD0000' style={{ marginLeft: 10 }} />
                            <Text style={styles.buttonText2}>CANCEL RESERVATION</Text>
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


                                    <View style={[styles.pickerRow, { marginBottom: 30 }]}>
                                        <Entypo name={"calendar"} size={40} color='#FA4B3E' style={styles.icon3} />
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={day}
                                                onValueChange={(itemValue, itemIndex) => { setDay(itemValue) }}
                                            >
                                                <Picker.Item label="Day" />
                                                {Days()}

                                            </Picker>
                                        </View>

                                    </View>

                                    <View style={[styles.pickerRow, { marginBottom: 30 }]}>
                                        <View style={[styles.schedule, { marginTop: -45 }]}>
                                            <Picker
                                                selectedValue={month}
                                                onValueChange={(itemValue, itemIndex) => { setMonth(itemValue) }}
                                            >
                                                <Picker.Item label="Month" />
                                                {Months()}

                                            </Picker>
                                        </View>

                                    </View>



                                    <View style={[styles.pickerRow, { marginBottom: 20 }]}>
                                        <View style={styles.schedule}>
                                            <Picker
                                                selectedValue={year}
                                                onValueChange={(itemValue, itemIndex) => { setYear(itemValue) }}
                                            >
                                                <Picker.Item label="Year" />
                                                {Years()}

                                            </Picker>
                                        </View>

                                    </View>

                                    <View style={styles.pickerRow}>
                                        <Entypo name={"user"} size={40} color='#FA4B3E' style={styles.icon3} />
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={opacity}
                                                onValueChange={(itemValue, itemIndex) => { setOpacity(itemValue) }}
                                                style={{ fontSize: 20, color: 'black' }}
                                            >
                                                <Picker.Item label="Opacity" />
                                                {Amount()}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                                        <TouchableOpacity style={styles.checkButton} onPress={() => { setModalVisible(false) }}>
                                            <AntDesign name={"close"} size={40} color='white' style={styles.cancelButton} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.checkButton} onPress={() => { addSchedule() }}>
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
                                        Cancel Reservation
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
                                            onChangeText={text => setDeleteOrderID(text)}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                                        <TouchableOpacity style={styles.checkButton} onPress={() => { setDeleteModalVisible(false) }}>
                                            <AntDesign name={"close"} size={40} color='white' style={styles.cancelButton} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.checkButton} onPress={() => { deleteSchedule() }}>
                                            <Entypo name={"check"} size={40} color='white' style={styles.checkIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    middle: {
        flex: 1,
    },
    cardBorder: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: 'white'
    },
    card: {
        margin: 10,
        borderRadius: 5,
        borderColor: '#FA4B3E',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 20

    },
    date: {
        color: '#FA4B3E',
        fontSize: 20,
        fontWeight: 'bold',
    },
    time: {
        color: 'black',
        paddingTop: 10,
        fontSize: 18,
    },
    icon: {
        top: '-12%',
        left: '85%'
    },
    opacity: {
        color: 'black',
        position: 'absolute',
        left: '86%',
        top: '66%',
        fontSize: 20,
        color: '#FA4B3E'
    },
    reserveButton: {
        width: '90%',
        backgroundColor: '#FA4B3E',
        alignSelf: 'center',
        marginVertical: 50,
        flexDirection: 'row',
        padding: 20,
        borderRadius: 8
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 40,
    },
    icon2: {
        paddingLeft: 10
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
        marginLeft: 10
    },
    icon3: {
        marginVertical: 22,
        marginRight: 20,
        marginLeft: -10
    },
    text: {
        color: '#FA4B3E'
    },
    icon4: {
        color: '#666666',
        margin: -20
    },
    exit: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        marginLeft: 10,
        marginTop: -10,
        backgroundColor: 'white',
        borderRadius: 50,
    },
    schedule: {
        borderWidth: 2,
        borderColor: '#FA4B3E',
        borderRadius: 5,
        marginLeft: 50,
        marginTop: -30,
        width: '80%'
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
    cancelReservation: {
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: -30,
        marginBottom: 20,
        flexDirection: 'row',
        padding: 20,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#CD0000'
    },
    buttonText2: {
        fontSize: 20,
        color: '#CD0000',
        fontWeight: 'bold',
        marginLeft: 40,
    }


});

export default booking;