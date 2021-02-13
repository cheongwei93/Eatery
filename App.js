import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import loading from './src/screens/loadingScreen';
import Login2 from './src/screens/login2';
import Register from './src/screens/register';
import Base from './src/screens/base';
import Reservation from './src/screens/reservation';
import cart from './src/screens/cart';
import checkin from './src/screens/checkin';
import updateProfile from './src/screens/updateProfile';
import takeAway from './src/screens/takeAway';
import cartTakeAway from './src/screens/cart_TakeAway';
import takeawayBill from './src/screens/takeawayBill';

//menu here
import menuSushi from './src/menu/sushi';
import menuSashimi from './src/menu/sashimi';
import menuDonmono from './src/menu/donmono';
import menuSpecialMaki from './src/menu/specialmaki';
import menuYakimono from './src/menu/yakimono';
import menuDrinks from './src/menu/drinks';
import menu from './src/bottomTab/menu';

//menu2 here
import menu2 from './src/takeaway/menu2';
import sushimenu from './src/takeaway/sushimenu';
import donomonomenu from './src/takeaway/donmonomenu';
import drinksmenu from './src/takeaway/drinksmenu';
import sashimimenu from './src/takeaway/sashimimenu';
import specialmakimenu from './src/takeaway/specialmakimenu';
import yakimonomenu from './src/takeaway/yakimono';

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

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Reservation"
          component={Reservation}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Sushi"
          component={menuSushi}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Sashimi"
          component={menuSashimi}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Donmono"
          component={menuDonmono}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="SpecialMaki"
          component={menuSpecialMaki}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Yakimono"
          component={menuYakimono}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Drinks"
          component={menuDrinks}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Cart"
          component={cart}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Check In"
          component={checkin}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Update Profile"
          component={updateProfile}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Take Away"
          component={takeAway}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Confirm Order"
          component={cartTakeAway}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Menu2"
          component={menu2}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Sushi Menu"
          component={sushimenu}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Donmono Menu"
          component={donomonomenu}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Drinks Menu"
          component={drinksmenu}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Sashimi Menu"
          component={sashimimenu}
          
        />
        
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="SpecialMaki Menu"
          component={specialmakimenu}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Yakimono Menu"
          component={yakimonomenu}
          
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'white'
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#FA4B3E',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 20,
            },
          
          }}
          name="Bill"
          component={takeawayBill}
          
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
  }
});
