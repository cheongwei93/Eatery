import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Materiallcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Profile from '../bottomTab/profile';
import Menu from '../bottomTab/menu';
import Order from '../bottomTab/order';
import Home from '../bottomTab/homeScreen';

const Tab = createMaterialBottomTabNavigator();



class tabScreen extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={styles.bar}
        activeColor="#FA4B3E"

      >

        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            tabBarLabel: 'Order',
            tabBarIcon: ({ color }) => (
              <Foundation name="clipboard-notes" color={color} size={24} />
            )
          }}
          
        />

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" color={color} size={24} />
            )
          }}
        />

        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarLabel: 'Menu',
            tabBarIcon: ({ color }) => (
              <Materiallcons name="restaurant" color={color} size={24} />
            )
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <EvilIcons name="user" color={color} size={29} />
            )
          }}
        />

      </Tab.Navigator>
    );

  }

}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'white',

  }
});

export default tabScreen;