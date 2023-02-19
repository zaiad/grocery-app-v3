import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import WishListScreen from './src/screens/WishListScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={styles.header} initialRouteName="Login">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{title: 'Shoping Cart'}}
        />
        <Stack.Screen
          name="WishList"
          component={WishListScreen}
          options={{title: 'Wish List'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  header: {
    headerShown: false,

    headerTitleStyle: {alignSelf: 'center', fontWeight: '200'},
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#3EC70B',
    },

    headerTintColor: '#f0ffff',
  },
});
