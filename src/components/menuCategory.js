import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;

const menuCategory = function({imageSource, categoryName}){
    return(
        

        <View style={styles.menuContainer}>
            <TouchableOpacity>
                <Image
                    source={imageSource}
                    resizeMode='cover'
                    style={styles.image}
                />
                <View style={styles.category}>
                    <Text style={styles.text}>{categoryName}</Text>
                </View>
            </TouchableOpacity>
        </View>


    );
};




const styles = StyleSheet.create({
    menuContainer: {
        height: windowsHeight / 2 - 100,
        width: windowsWidth / 2,
        padding : 5
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


export default menuCategory;