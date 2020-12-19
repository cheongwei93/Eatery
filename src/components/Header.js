import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

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
        marginLeft: 150,
        fontWeight: 'bold',
        letterSpacing: 2
        
    },
    contain:{
        flexDirection: 'row',

    },
    icon: {
        marginLeft: 350,
        position: 'absolute',
        
    }
});

export default header;