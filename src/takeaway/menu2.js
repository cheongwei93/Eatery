import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import pic1 from '../../images/menu/001.jpg';
import pic2 from '../../images/menu/002.jpg';
import pic3 from '../../images/menu/003.jpg';
import pic4 from '../../images/menu/004.jpg';
import pic5 from '../../images/menu/005.jpg';
import pic6 from '../../images/menu/006.jpg';


const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;


const menu = function({route, navigation}){
    const {takeawayID} = route.params;
    
    return (

        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row' }}>

                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Sushi Menu', {takeawayID: takeawayID}) }}>
                            <Image
                                source={pic1}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <View style={styles.category}>
                                <Text style={styles.text}>Sushi</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Sashimi Menu', {takeawayID: takeawayID})}}>
                            <Image
                                source={pic2}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <View style={styles.category}>
                                <Text style={styles.text}>Sashimi</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Donmono Menu',{takeawayID: takeawayID})}}>
                            <Image
                                source={pic3}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <View style={styles.category}>
                                <Text style={styles.text}>Donmono</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('SpecialMaki Menu', {takeawayID: takeawayID})}}>
                            <Image
                                source={pic4}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <View style={styles.category}>
                                <Text style={styles.text}>Special Maki</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Yakimono Menu', {takeawayID: takeawayID})}}>
                            <Image
                                source={pic5}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <View style={styles.category}>
                                <Text style={styles.text}>Yakimono</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Drinks Menu', {takeawayID: takeawayID})}}>
                            <Image
                                source={pic6}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <View style={styles.category}>
                                <Text style={styles.text}>Drinks</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>

        </View>
    );

    


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d9d9d9',
        flex: 1,
        position: 'relative',

    },
    menuContainer: {
        height: windowsHeight / 2 - 100,
        width: windowsWidth / 2,
        padding: 10
    },
    image: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 20
    },
    category: {
        position: 'absolute',
        marginLeft: 0,
        marginBottom: 0,
        bottom: 0,
        height: 40,
        width: 100,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        fontSize: 15,
        letterSpacing: 1,
        color: '#FA4B3E',
        fontWeight: 'bold'
    }

});

export default menu;