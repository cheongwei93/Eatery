import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

import pic1 from  '../../images/menu/001.jpg';
import pic2 from '../../images/menu/002.jpg';
import pic3 from '../../images/menu/003.jpg';
import pic4 from '../../images/menu/004.jpg';
import pic5 from '../../images/menu/005.jpg'; 

import Menu from '../components/menuCategory';

const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;


class menu extends Component{
    render(){
        return(
            
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        <Menu
                            imageSource={pic1}
                            categoryName="Sushi"
                        />

                        <Menu
                            imageSource={pic2}
                            categoryName="Sashimi"
                        />

                    </View> 

                    <View style={{flexDirection: 'row'}}>
                        <Menu
                            imageSource={pic3}
                            categoryName="Donmono"
                        />

                        <Menu
                            imageSource={pic4}
                            categoryName="Special Maki"
                        />

                    </View> 

                    <View style={{flexDirection: 'row'}}>
                        <Menu
                            imageSource={pic5}
                            categoryName="Yakimono"
                        />


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
   
});

export default menu;