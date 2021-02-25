import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Card from '../components/Card';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncRetrieve from '../components/AsyncRetrieve';
import axios from 'axios';


// image
import pic1 from '../../images/Sushi/001.jpg'
import pic2 from '../../images/Sushi/002.jpg'
import pic3 from '../../images/Sushi/003.jpg'
import pic4 from '../../images/Sushi/004.jpg'
import pic5 from '../../images/Sushi/005.jpg'
import pic6 from '../../images/Sushi/006.jpg'
import pic7 from '../../images/Sushi/007.jpg'
import pic8 from '../../images/Sushi/008.jpg'
import pic9 from '../../images/Sushi/009.jpg'

const homeScreen = function({navigation}) {

    const [cart, setCart] = useState(0);
    const [render, setRender] = useState(true);

    React.useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', ()=>{
            totalOrders();
        });
        if(render === true){
            return unsubscribe;
        }

    },[navigation]);

    

    

    //get total number of orders
    const totalOrders = async function(){
        let ID = await AsyncRetrieve();
        console.log(ID);
        let buildhttp = 'http://10.0.2.2:3303/order/total/' + ID;
        axios.get(buildhttp)
        .then((res)=>{
            let total = res.data.result[0].TOTAL;
            setCart(total);
            setRender(false);
        })
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>

                <View style={styles.sliderContainer}>
                    <Swiper height={200} autoplay={true} horizontal={true} activeDotColor='white'>
                        <View style={styles.slide}>
                            <Image
                                source={pic1}
                                resizeMode='cover'
                                style={styles.sliderImage}
                            />
                        </View>
                        <View style={styles.slide}>
                            <Image
                                source={pic2}
                                resizeMode='cover'
                                style={styles.sliderImage}
                            />
                        </View>
                        <View style={styles.slide}>
                            <Image
                                source={pic3}
                                resizeMode='cover'
                                style={styles.sliderImage}
                            />
                        </View>

                    </Swiper>
                </View>



            

                <View style={styles.categoryContainer}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Take Away')}}>
                        <View style={styles.categoryIcon}>
                            <MaterialCommunityIcons name={'food-fork-drink'} size={35} color='#FA4B3E'/>
                        </View>
                        <Text style={styles.categoryBtnTxt}>Take Away</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{navigation.navigate('Reservation')}}>
                        <View style={styles.categoryIcon}>
                            <AntDesign name={'calendar'} size={35} color='#FA4B3E' />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Reservation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigation.navigate('Cart')}}>
                        <View style={{position: 'absolute', zIndex: 1}}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {cart}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.categoryIcon}>
                            <SimpleLineIcons name={'basket'} size={35} color={'#FA4B3E'}/>
                        </View>
                        <Text style={styles.categoryBtnTxt}>Cart</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{navigation.navigate('Check In')}}>
                        <View style={styles.categoryIcon}>
                            <FontAwesome5 name={'check-circle'} size={35} color='#FA4B3E' />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Check In</Text>
                    </TouchableOpacity>
                    
                </View>

                



                <Text style={styles.text}>
                    New Products
                </Text>

                <Card
                    imgSource={pic4}
                    foodName='Tempura Udon'
                />

                <Card
                    imgSource={pic5}
                    foodName='Shiro Ramen'
                />

                <Card
                    imgSource={pic6}
                    foodName='Salmon Toro'
                />

                <Text style={styles.text}>
                    Highly Recommneded
                </Text>

                <Card
                    imgSource={pic7}
                    foodName='Tori Katsu Don'
                />

                <Card
                    imgSource={pic8}
                    foodName='Salmon Teriyaki Don'
                />

                <Card
                    imgSource={pic9}
                    foodName='Salmon Dragon Maki'
                />
            </ScrollView>




        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'white'
        
    },
    middle: {
        flex: 1,
        top: '5%'
    },
    sliderContainer: {
        height: 200,
        width: '100%',
        top: '0%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 100
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FA4B3E',
        marginVertical: 10,
        marginLeft: 10,

    },
    productContainer: {
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginTop: 50,
    },
    scroll: {
        
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#fdeae7',
        borderRadius: 50,
        marginHorizontal: 10,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
    },
    badge: {
        height: 25,
        width: 25,
        backgroundColor: 'red',
        borderRadius: 50,
        marginLeft: 50
    },
    badgeText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }



});

export default homeScreen;

// #FA4B3E

