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
      id:1,
      title: 'Tomate',
      description: 'This is tomate description',
      price: '12',
      image: require('../assets/images/products/tomate.png'),
    },
    {
      id:2,
      title: 'Potato',
      description: 'This is potato description',
      price: '7',
      image: require('../assets/images/products/potato.png'),
    },
    {
      id:3,
      title: 'Carrots',
      description: 'This is carrots description',
      price: '4',
      image: require('../assets/images/products/carrot.png'),
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