import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Alert, addons } from 'react-native';
import AsyncRetrieve from '../components/AsyncRetrieve';
import axios from 'axios';

const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;

const sushi = function (props) {

    

    // must be top
    const[data, setData] = useState([]);
    const[render, setRender] = useState(true);
    useEffect(() => {
        if(render === true){
            getMenuItem();
        }
    });

    

    const getMenuItem = async function () {
        ID = await AsyncRetrieve();
        let category = "sushi";
        axios.post('http://192.168.43.13:3303/menu/check', {
            category: category
        }).then((res) => {
            setData(res.data.result);
            setRender(false);
            
        }).catch((err) => {
            console.log(err);
        })
    }

    const showMenuItem = function () {
        let key = 0;
        return data.map(item => {
            key = key + 1;
            return menuCard(key, item.name, item.price, item.imgLocation, item.ID);
        })
    }

    const addOrder = async function(name, price, foodID){
        let ID = await AsyncRetrieve();
        let type = "DINE";
        axios.post('http://192.168.43.13:3303/order/add',{
            foodName: name,
            foodPrice: price,
            foodID: foodID,
            userID: ID,
            type: type
        }).then((res)=>{
            console.log(res.data.message);
            Alert.alert('Added to cart',' ',[
                {text: 'Continue'}
            ]);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const menuCard = function (key, name, price, imgLocation, ID) {    
   
        return (
    
            <View style={styles.card} key={key}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: imgLocation}}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {name}
                    </Text>
                    <Text style={styles.price}>
                        {price}
                    </Text>
                    <TouchableOpacity style={styles.addButton} onPress={()=>{addOrder(name, price, ID)}}>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>
                            ADD+
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    
        )
    }

    return (

        <ScrollView>

            <View style={styles.container}>
                {showMenuItem()}
                

            </View>
        </ScrollView>
    )

}






const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        position: 'relative'
    },
    imageContainer: {
    },
    image: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
    card: {
        height: windowsHeight / 3,
        width: windowsWidth,
        marginBottom: 70,
    },
    textContainer: {
        paddingLeft: 20,
        borderBottomWidth: 2,
        marginTop: -30,
        width: '90%',
        alignSelf: 'center',
        borderColor: '#d3d3d3'
    },
    text: {
        fontSize: 30,
        color: '#FA4B3E',
        fontWeight: 'bold'
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 20
    },
    addButton: {
        position: 'absolute',
        left: 300,
        marginTop: 15,
        borderWidth: 2,
        padding: 10,
        borderRadius: 50,
        fontWeight: 'bold',
        backgroundColor: '#FA4B3E',
        color: 'white',
        borderColor: '#FA4B3E'
    }
});

export default sushi;