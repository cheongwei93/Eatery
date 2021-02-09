import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import AsyncRetrieve from '../components/AsyncRetrieve';

let total = 0;

const bill = function () {

    const [render, setRender] = useState(true);
    const [data, setData] = useState([]);
    const [calculate, setCalculate] = useState(false);
    useEffect(() => {
        
        if (render === true) {
            if(calculate === true){
                count();
            }
            TableNumber();
            
        }
    });

    const TableNumber = async function () {
        let ID = await AsyncRetrieve();
        let buildhttp = 'http://192.168.43.13:3303/bill/getTable/' + ID;
        axios.get(buildhttp)
            .then((res) => {
                let result = res.data.result[0].tableNumber;
                checkOrder(result);
            })
    }

    const checkOrder = async function (ID) {
        let buildhttp = 'http://192.168.43.13:3303/bill/getOrder/' + ID;
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

    const count = function () {
        for(let item of data){
            total = total + item.foodPrice;
        }
        setCalculate(false);
    }

    const buildCard = function (key, foodID, foodName, foodPrice) {
        // total = total + foodPrice;
        // console.log(total);
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