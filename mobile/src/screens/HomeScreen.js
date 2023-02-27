import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Alert, ScrollView, StyleSheet,ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-elements';
import Footer from '../components/Footer';
import Line from '../components/Line';
import Product from '../components/Product';
import {IP} from '@env';

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await axios.get(`http://${IP}:1337/api/product`);
        if (response.status === 200) {
          const allProducts = response.data;
          setProducts(allProducts);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getAllProducts();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <View key={index}>
              <Product {...product} />
              <Line />
            </View>
          ))
        ) : (
          <View style={styles.container}>
            <ActivityIndicator size={'large'} style={styles.text}/>
          </View>
        )}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#7F8487',
  },
});
