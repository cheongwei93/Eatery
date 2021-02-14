import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';

import AsyncRetrieve from '../components/AsyncRetrieve';


const bill = function () {

    const [total, setTotal] = useState(0);
    const [render, setRender] = useState(true);
    const [data, setData] = useState([]);
    const [calculate, setCalculate] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState("Pending");
    const [payhttp, setPayHttp] = useState();
    const [tableNumber, setTableNumber] = useState();

    const handleResponse = function (data) {
        if (data.title === 'success') {
            setStatus('Complete');
            deleteSchedule();
            deleteOrders();
            tableAvailable();
            setShowModal(false);
            
        } else if (data.title === 'cancel') {
            setShowModal(false);
            setStatus('Cancel');
        } else {
            return;
        }
    }

    useEffect(() => {

        if (render === true) {
            if (calculate === true) {
                count();
            }
            TableNumber();

        }
    });

    const TableNumber = async function () {
        let ID = await AsyncRetrieve();
        let buildhttp = 'http://192.168.0.115:3303/bill/getTable/' + ID;
        axios.get(buildhttp)
            .then((res) => {
                let result;
                if (!res.data.result[0]) {
                    result = 0;
                } else {
                    result = res.data.result[0].tableNumber;
                    setTableNumber(result);
                }
                checkOrder(result);

            })
    }

    const checkOrder = async function (ID) {
        let buildhttp = 'http://192.168.0.115:3303/bill/getOrder/' + ID;
        axios.get(buildhttp)
            .then((res) => {
                let result = res.data.result;
                setData(result);
                setCalculate(true);
                setRender(false);
            })
    }

    const show = function () {
        let key = 0;
        return data.map(item => {
            key = key + 1;
            return buildCard(key, item.foodID, item.foodName, item.foodPrice);
        })
    }

    const count = async function () {
        let result = total;
        for (let item of data) {
            result = result + item.foodPrice;
        }
        await setTotal(result);
        let temp = "http://192.168.0.115:3303/paypal/paypal/" + result;
        setPayHttp(temp);

        setCalculate(false);
    }

    const deleteSchedule = async function(){
        let buildhttp = 'http://192.168.0.115:3303/schedule/deleteSchedule/' + tableNumber;
        axios.delete(buildhttp)
        .then((res)=>{
            // deleteOrders();
        }).catch((err)=>{
            throw err;
        })
    }

    const deleteOrders = async function(){
        let buildhttp = 'http://192.168.0.115:3303/schedule/deleteOrders/' + tableNumber;
        axios.delete(buildhttp)
        .then((res)=>{
            // tableAvailable();
        }).catch((err)=>{
            throw err;
        })
    }

    const tableAvailable = async function(){
        axios.put('http://192.168.0.115:3303/schedule/tableAvailable',{
            tableNumber : tableNumber
        }).then((res)=>{
            
        }).catch((err)=>{
            throw err;
        })
    }

    const checkBill = function(){
        setRender(true);
    }

    const buildCard = function (key, foodID, foodName, foodPrice) {
        return (
            <View style={styles.card} key={key}>

                <View style={styles.textRow}>
                    <Text style={styles.label}>Food ID: </Text>
                    <Text style={styles.input}> {foodID}</Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Food Name: </Text>
                    <Text style={styles.input}> {foodName}</Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.label}>Price: </Text>
                    <Text style={styles.input}> {foodPrice}</Text>
                </View>

            </View>
        )
    };



    return (
        <ScrollView>
            <View style={styles.container}>
                {show()}

                <View style={styles.price}>
                    <Text style={styles.text}>
                        Total Amount:    {total}
                    </Text>
                </View>

            </View>


            <View>
                <Modal visible={showModal} onRequestClose={() => { setShowModal(false) }}>
                    <WebView
                        source={{ uri: payhttp }}
                        onNavigationStateChange={(data) => { handleResponse(data) }}

                    />
                </Modal>

                <TouchableOpacity onPress={() => { setShowModal(true) }}>
                    <Text>Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{checkBill()}}>
                    <Text>
                        Check Bill
                    </Text>
                </TouchableOpacity>
                <Text>Payment Status: {status}</Text>
            </View>

        </ScrollView>

    );



}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    textRow: {
        flexDirection: 'row',
        marginBottom: 10
    },
    label: {
        fontSize: 20,
        color: '#FA4B3E',
        fontWeight: 'bold'
    },
    input: {
        fontSize: 20,
    },
    card: {
        borderBottomWidth: 2,
        marginTop: 40,
        borderColor: '#d3d3d3'
    },
    price: {
        marginTop: 30
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default bill;