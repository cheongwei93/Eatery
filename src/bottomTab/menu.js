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


class menu extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Menu
                            imageSource={pic1}
                            categoryName="Sushi"
                        /> */}

                        <View style={styles.menuContainer}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Sushi') }}>
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
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Sashimi')}}>
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
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Donmono')}}>
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
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SpecialMaki')}}>
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
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Yakimono')}}>
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
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Drinks')}}>
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


}

const styles = StyleSheet.create({
    container: {

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