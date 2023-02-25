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

const HomeScreen = ({ navigation }) => {
  const products = [
    {
      title: 'Tomate',
      description: 'This is tomate description',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
    {
      title: 'Potato',
      description: 'This is potato description',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
    {
      title: 'Carrots',
      description: 'This is carrots description',
      price: '14',
      image: require('../assets/images/products/tomate.png'),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {products.map((product, index) => (
          <View key={index}>
            <Product {...product} />
            <Line />
          </View>
        ))}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};


export default HomeScreen;