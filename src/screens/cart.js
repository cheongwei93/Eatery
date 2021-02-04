import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

import AsyncRetrieve from '../components/AsyncRetrieve';
import axios from 'axios';
import pic from '../../images/Sushi/004.jpg';

const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;




const cart = function(){

    const [render, setRender] = useState(true);
    const [data, setData] = useState([]);

    useEffect(()=>{
        if(render === true){
            getOrderItem();
        }
    });

    const getOrderItem = async function(){
        
        let ID = await AsyncRetrieve();
        let buildhttp = 'http://192.168.43.13:3303/order/' + ID;
        axios.get(buildhttp)
        .then((res)=>{
            setData(res.data.result);
            setRender(false);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const showOrderItem = function(){
        let key = 0;
        return data.map(item => {
            key = key + 1;
            return buildCard(key, item.foodName, item.foodPrice, item.userID, item.imgLocation, item.ID);
        })
    }

    const buildCard = function(key, name, price, userID, imgLocation, ID){
        return(
            <View style={styles.card} key={key}>
                <Image source={{uri: imgLocation}} style={styles.image}/>
                <Text style={styles.food}>{name}</Text>
                <Text style={styles.price}>{price}</Text>

                <TouchableOpacity onPress={()=>{deleteOrder(ID)}}>
                    <View style={styles.icon}>
                        <Fontisto name={"trash"} size={30} color="white"/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const deleteOrder = async function(ID){
        let buildhttp = 'http://192.168.43.13:3303/order/delete/' + ID;
        axios.delete(buildhttp)
        .then((res)=>{
            Alert.alert('Item Removed', '', [
                { text: 'Continue' }
            ]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const orderConfirmed = async function(){
        
        console.log(data.length);
        let ID = await AsyncRetrieve();
        axios.put('http://192.168.43.13:3303/order/update', {
            userID: ID
        });

        Alert.alert('Orders Confirmed', '', [
            { text: 'Continue' }
        ]);
    }

    return(
        <ScrollView>
            <View style={styles.container}>

                {showOrderItem()}
                
                <TouchableOpacity style={styles.button} onPress={()=>{orderConfirmed()}}>
                    <View>
                        <Text style={styles.text}>
                            CONFIRM ORDER
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    image: {
        height: 150,
        width: 150,
        margin: 10
    },
    card: {
        height: windowsHeight / 4,
        width: windowsWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#d3d3d3'
    },
    food: {
        fontSize: 30,
        marginTop: 20,
        marginLeft: 170,
        fontWeight: 'bold',
        color: '#FA4B3E',
        position: 'absolute'
    },
    price: {
        marginTop: 80,
        marginLeft: 170,
        fontSize: 25,
        color: '#FA4B3E',
        position:'absolute'
    },
    icon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#CD0000',
        borderRadius: 50,
        marginLeft: 150,
        marginTop: 100,
        
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#FA4B3E',
        height: 60,
        width: windowsWidth / 1.2,
        borderRadius: 20,
        marginVertical: 40
    },
    text: {
        alignSelf: 'center',
        paddingTop: 12,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default cart;