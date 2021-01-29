import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const ScheduleTime = function({day, month, year, time, opacity, orderID}){
    return(
        <TouchableOpacity>
            <View style={styles.card}>
               
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.date}>
                        {day}
                         
                    </Text>
                    <Text style={styles.date}>
                        {month}
                    </Text>
                    <Text style={styles.date}>
                        {year}
                    </Text>
                    <Text style={{marginLeft: 100}}>
                        ORDER ID : {orderID}
                    </Text>
                </View>
                <Text style={styles.time}>
                    {time}
                </Text>
                
                <Text style={styles.opacity}>
                    {opacity}
                </Text>
                <AntDesign name={"user"} size={25} color='#FA4B3E' style={styles.icon} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})

export default ScheduleTime;