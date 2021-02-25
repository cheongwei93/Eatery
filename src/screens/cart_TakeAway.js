import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions,Alert} from 'react-native';
import AsyncRetrieve from '../components/AsyncRetrieve';
import Fontisto from 'react-native-vector-icons/Fontisto';

import axios from 'axios';

const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;

const cartTakeAway = function({route ,navigation}){
    const [render, setRender] = useState(true);
    const [data, setData] = useState([]);
    const {takeawayID} = route.params;
    
    useEffect(()=>{
        if(render === true){
            getOrderItem();
        }
    });

    const getOrderItem = async function(){
        let ID = await AsyncRetrieve();
        axios.post('http://10.0.2.2:3303/order/takeaway',{
            ID: ID,
            takeawayID: takeawayID
        })
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
        let buildhttp = 'http://10.0.2.2:3303/order/delete/' + ID;
        axios.delete(buildhttp)
        .then((res)=>{
            
            Alert.alert('Item Removed', '', [
                { text: 'Continue' }
            ]);setRender(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const orderConfirmed = async function(){
        if(data.length === 0){
            Alert.alert('Orders are Empty', '', [
                { text: 'Try Again' }
            ]);
        }else{
            let ID = await AsyncRetrieve();
            axios.put('http://10.0.2.2:3303/takeaway/update',{
                userID: ID,
                takeawayID: takeawayID
            }).then((res)=>{
                takeawayConfirmed();
                Alert.alert('Order Confirmed', '', [
                    { text: 'Continue' }
                ]);
                
                setRender(true);
            }).catch((error)=>{
                console.log(error);
            })
        }
        
    }

    //takeaway progress confirmed
    const takeawayConfirmed = async function(){
        axios.put('http://10.0.2.2:3303/takeaway/takeawayConfirm',{
            id: takeawayID
        })
    }

    return (
        
        <ScrollView>
            <View style={styles.container}>
                {showOrderItem()}
                <TouchableOpacity style={styles.Button} onPress={()=>{orderConfirmed()}}>
                    <Text style={styles.buttonText}>Confirm Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} onPress={()=>{navigation.navigate('Bill', {takeawayID: takeawayID})}}>
                    <Text style={styles.buttonText}>Bill</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button2} onPress={()=>{navigation.navigate("Menu2", {takeawayID: takeawayID})}}>
                    <Text style={{fontSize: 20, color: '#FA4B3E', fontWeight: 'bold', textAlign: 'center'}}>Browse Menu</Text>
                </TouchableOpacity>
                
            </View>
            
        </ScrollView>    
        )
}

const styles = StyleSheet.create({
    Button: {
        width: '60%',
        backgroundColor: '#FA4B3E',
        alignSelf: 'center',
        marginTop: 20,
        padding: 15,
        borderRadius: 8
    },
    Button2:{
        width: '60%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginVertical: 20,
        padding: 15,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#FA4B3E'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
        
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
    container: {
        flex: 1,
        position: 'relative'
    },
});

export default cartTakeAway;