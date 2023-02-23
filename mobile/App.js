import * as React from 'react';
import {Button, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import VerifyOTP from './src/screens/OTP';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import WishListScreen from './src/screens/WishListScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import api from './src/utils/api';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('Login');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('acces_token');
      if (token) {
        const accessToken = JSON.parse(token).accessToken;
        try {
          const response = await axios.post(
            'http://172.16.8.112:1337/api/verify-acces-token',
            null,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
          if (response.status === 200 && response.data.isValid) {
            setInitialRouteName('Home');
            setIsLoading(false);
          }
        } catch (error) {
          if (error.response.data.status === 403) {
            const refreshToken = await AsyncStorage.getItem('refresh_token');
            const parsedRefreshToken = JSON.parse(refreshToken);
            const {refreshToken: currentRefreshToken} = parsedRefreshToken;

            try {
              const response = await axios.post(
                'http://172.16.8.112:1337/api/verify-refresh-token',
                null,
                {
                  headers: {
                    Authorization: `Bearer ${currentRefreshToken}`,
                  },
                },
              );
              if (response.status === 200 && response.data.new_acces_token) {
                const newAccessToken = response.data.new_acces_token;
                const newToken = JSON.stringify({
                  accessToken: newAccessToken,
                });
                await AsyncStorage.setItem('acces_token', newToken);

                const originalRequestConfig = error.config;
                originalRequestConfig.headers.Authorization = `Bearer ${newAccessToken}`;

                const refreshedResponse = await axios(originalRequestConfig);
                setIsLoading(false);

                return refreshedResponse;
              }
            } catch (refreshError) {
              setIsLoading(false);
              console.error(refreshError.response.data.status);
            }
          }
          setInitialRouteName('Login');
        }
      } else {
        setInitialRouteName('Login');
      }
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.isloading}>
          <ActivityIndicator size={'large'} />
        </Text>
        <Text> Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={styles.header}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Verify" component={VerifyOTP} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="WishList" component={WishListScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </Provider>
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
  isloading: {
    marginTop: 20,
  },
});
