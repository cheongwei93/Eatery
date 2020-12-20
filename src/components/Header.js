import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const windowWidth = Dimensions.get('window').width;
const header = function(){
    return(
        <View style={styles.header}>
            
            <Text style={styles.headerText}>Eatery</Text>
            <SimpleLineIcons name={'basket'} size={25} color={'#FA4B3E'} style={styles.icon}/>
            
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        marginBottom: 20,
    },
    headerText:{
        color: '#FA4B3E',
        fontSize: 20,
        position: 'absolute',
        marginLeft: windowWidth / 2.72,
        fontWeight: 'bold',
        letterSpacing: 2
        
    },
    contain:{
        flexDirection: 'row',

    },
    icon: {
        marginLeft: windowWidth / 1.2,
        position: 'absolute',
        
    }
});

export default header;