import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';

import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import Counter from '../components/Counter';
import Footer from '../components/Footer';
import Line from '../components/Line';
import Product from '../components/Product';

const HomeScreen = ({navigation}) => {
  const product = [
    {
      title: 'Tomate',
      descreption: 'This is tomte descreption',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
    {
      title: 'Tomate',
      descreption: 'This is tomte descreption',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
    {
      title: 'Tomate',
      descreption: 'This is tomte descreption',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
    {
      title: 'Tomate',
      descreption: 'This is tomte descreption',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
    {
      title: 'Tomate',
      descreption: 'This is tomte descreption',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
    {
      title: 'Tomate',
      descreption: 'This is tomte descreption',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
  ];

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text>Home Page</Text>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;

