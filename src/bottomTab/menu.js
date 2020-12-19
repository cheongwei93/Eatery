import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import pic1 from  '../../images/menu/001.jpg';
import pic2 from '../../images/menu/002.jpg'; 

class menu extends Component{
    render(){
        return(
            <View style={styles.container}>

                <View style={styles.menuContainer}>
                    <View style={styles.menu}>
                        <Image
                            source={pic1}
                            resizeMode='cover'
                            style={styles.image}
                        />
                    </View>
                    <Text>Sushi</Text>
                    
                </View>

                <View style={styles.menuContainer}>
                    <View style={styles.menu}>
                        <Image
                            source={pic2}
                            resizeMode='cover'
                            style={styles.image}
                        />
                    </View>
                    <Text>Sashimi</Text>
                    
                </View>

            </View>
        );

    }

            
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '85%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    menuContainer: {
        width: '50%',
        height: '50%',
        padding: 5
    },
    menu: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
        alignSelf: 'center'
    }
});

export default menu;