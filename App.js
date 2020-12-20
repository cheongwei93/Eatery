import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import loading from './src/screens/loadingScreen';
import Login2 from './src/screens/login2';
import Register from './src/screens/register';
import Base from './src/screens/base';

import homeHeader from './src/components/Header';

// import test from './src/testing';
// import loginTest from './src/failed/loginTest';
// import Login from './src/failed/login';
// import tabScreen from './src/components/TabScreen';
// import HomeScreen from './src/bottomTab/homeScreen';
// import card from './src/components/Card';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'loading'}>
        <Stack.Screen
          options={{ headerShown: false}}
          name='loading'
          component={loading}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name='login2'
          component={Login2}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            headerStyle: styles.headerstyle,
          }}
          name='register'
          component={Register}
        />

        <Stack.Screen
          options={{ 
            headerShown: true,
            headerTitle: ()=> homeHeader(),
            headerLeft: null
          }}
          
          name='base'
          component={Base}
        />

        

        

        {/* <Stack.Screen options={{ headerShown: false }} name='tab' component={tabScreen} />
        <Stack.Screen options={{ headerShown: false }} name='login' component={Login} />
        <Stack.Screen options={{ headerShown: false }} name='test' component={test} /> */}

      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
