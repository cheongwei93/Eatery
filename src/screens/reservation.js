import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-community/picker';



import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const booking = function () {

    const [time, setTime] = useState('Select Time');
    const [modalVisible, setModalVisible] = useState(false);

    return (

        <View style={styles.container}>
            <ScrollView>
                <View stlye={styles.middle}>
                    <View style={styles.cardBorder}>

                        <TouchableOpacity>
                            <View style={styles.card}>
                                <Text style={styles.date}>
                                    31/01/2021
                            </Text>
                                <Text style={styles.time}>
                                    Time: 1700 Hours
                            </Text>
                                <Text style={styles.opacity}>
                                    5
                            </Text>
                                <AntDesign name={"user"} size={25} color='#FA4B3E' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.card}>
                                <Text style={styles.date}>
                                    31/01/2021
                            </Text>
                                <Text style={styles.time}>
                                    Time: 1700 Hours
                            </Text>
                                <Text style={styles.opacity}>
                                    5
                            </Text>
                                <AntDesign name={"user"} size={25} color='#FA4B3E' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.card}>
                                <Text style={styles.date}>
                                    31/01/2021
                            </Text>
                                <Text style={styles.time}>
                                    Time: 1700 Hours
                            </Text>
                                <Text style={styles.opacity}>
                                    5
                            </Text>
                                <AntDesign name={"user"} size={25} color='#FA4B3E' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.card}>
                                <Text style={styles.date}>
                                    31/01/2021
                            </Text>
                                <Text style={styles.time}>
                                    Time: 1700 Hours
                            </Text>
                                <Text style={styles.opacity}>
                                    5
                            </Text>
                                <AntDesign name={"user"} size={25} color='#FA4B3E' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.card}>
                                <Text style={styles.date}>
                                    31/01/2021
                            </Text>
                                <Text style={styles.time}>
                                    Time: 1700 Hours
                            </Text>
                                <Text style={styles.opacity}>
                                    5
                            </Text>
                                <AntDesign name={"user"} size={25} color='#FA4B3E' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={styles.card}>
                                <Text style={styles.date}>
                                    31/01/2021
                            </Text>
                                <Text style={styles.time}>
                                    Time: 1700 Hours
                            </Text>
                                <Text style={styles.opacity}>
                                    5
                            </Text>
                                <AntDesign name={"user"} size={25} color='#FA4B3E' style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.reserveButton} onPress={()=>{setModalVisible(true)}}>
                            <Fontisto name={"date"} size={25} color='white' style={styles.icon2} />
                            <Text style={styles.buttonText}>MAKE RESERVATION</Text>
                        </TouchableOpacity>

                        <Modal transparent={true} visible={modalVisible}>

                            <View style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
                                        <View style={styles.exit}>
                                            <AntDesign name={"close"} size={20} style={styles.icon4}/>
                                        </View>
                                        
                                    </TouchableOpacity>
                                   
                                    

                                    <View style={styles.pickerRow}>
                                        <Entypo name={"time-slot"} size={40} color='#FA4B3E' style={styles.icon3} />
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={time}
                                                onValueChange={(itemValue, itemIndex) => { setTime(itemValue) }}
                                            >
                                                <Picker.Item label="SELECT TIME" />
                                                <Picker.Item label="9.00 a.m" value="9.00 a.m" />
                                                <Picker.Item label="10.00 a.m" value="10.00 a.m" />
                                                <Picker.Item label="11.00 a.m" value="11.00 a.m" />
                                            </Picker>
                                        </View>
                                    </View>



                                </View>
                            </View>
                        </Modal>

                    </View>





                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    middle: {
        flex: 1,
    },
    cardBorder: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: 'white'
    },
    card: {
        margin: 10,
        borderRadius: 5,
        borderColor: '#FA4B3E',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 20

    },
    date: {
        color: '#FA4B3E',
        fontSize: 20,
        fontWeight: 'bold',
    },
    time: {
        color: 'black',
        paddingTop: 10,
        fontSize: 18,
    },
    icon: {
        top: '-12%',
        left: '85%'
    },
    opacity: {
        color: 'black',
        position: 'absolute',
        left: '86%',
        top: '66%',
        fontSize: 20,
        color: '#FA4B3E'
    },
    reserveButton: {
        width: '90%',
        backgroundColor: '#FA4B3E',
        alignSelf: 'center',
        marginVertical: 50,
        flexDirection: 'row',
        padding: 20,
        borderRadius: 8


    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 40
    },
    icon2: {
        paddingLeft: 10
    },
    modal: {
        backgroundColor: '#000000aa',
        flex: 1
    },
    modalContent: {
        backgroundColor: '#ffffff',
        margin: 20,
        padding: 40,
        borderRadius: 10,
        flex: 1
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#FA4B3E',
        borderRadius: 5,
        marginVertical: 15,
        width: '80%'

    },
    pickerRow: {
        flexDirection: 'row',
        marginVertical: 20,
        marginLeft: 10
    },
    icon3: {
        marginVertical: 22,
        marginRight: 20,
        marginLeft: -10
    },
    text: {
        color: '#FA4B3E'
    },
    icon4: {
        color: '#666666',
        margin: -20
    },
    exit: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        marginLeft: -10,
        marginTop: -10,
        backgroundColor: 'white',
        borderRadius: 50,
    }

});

export default booking;