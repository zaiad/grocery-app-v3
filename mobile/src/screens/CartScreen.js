import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import CartItem from '../components/CartItem';
import Footer from '../components/Footer';
import Line from '../components/Line';
import Product from '../components/Product';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({navigation}) {
  const [totalCart, settotalCart] = useState(0);
  
  const goToCheckout = () => {
    navigation.navigate('Checkout');
  };

  React.useEffect(() => {
    saveToCart = async () => {
      await AsyncStorage.setItem('cart', JSON.stringify(product));
    };
    saveToCart();
  }, [product]);

  const product = useSelector(state => state.cart.products);

  React.useEffect(() => {
    const cartTotal = product.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    settotalCart(cartTotal);
  }, [product]);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{backgroundColor: '#F7F7F7'}}>
        <View>
          {product.map((p, index) => {
            return (
              <View style={styles.container} key={index}>
                <CartItem
                  id={p.id}
                  title={p.title}
                  descreption={p.descreption}
                  price={`${p.price}.00 DH`}
                  image={p.image}
                  quantity={p.quantity}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.place_oredr_container}>
        <Text style={styles.total_price}>Total: {totalCart}.00 Dhs</Text>
        <TouchableOpacity onPress={goToCheckout} style={styles.place_order_btn}>
          <Text style={styles.text_place_order}>Place Order</Text>
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    shadowColor: '#6B728E',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
    backgroundColor: 'white',
  },
  place_order_btn: {
    backgroundColor: '#54B435',
    padding: 15,
    width: 370,
    height: 55,
    fontSize: 40,
    borderRadius: 5,
  },
  place_oredr_container: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 10,
    alignSelf: 'center',
  },
  text_place_order: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  total_price: {
    backgroundColor: '#E8E2E2',
    padding: 15,
    width: 370,
    fontSize: 19,
    borderRadius: 5,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
});
