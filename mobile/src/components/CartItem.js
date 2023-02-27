import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteProduct} from '../redux/features/CartSlice';

const CartItem = props => {
  const dispatch = useDispatch();

  const deleteFromCart = () => {
    dispatch(deleteProduct(props.id));
  };
  return (
    <View style={styles.container}>
      {/* First Box */}
      <View style={styles.box}>
        <View>
          <Image style={styles.images} source={require('../assets/images/products/potato.png')} />
        </View>
      </View>

      {/* Second Box */}
      <View style={styles.box}>
        <View style={styles.product_text}>
          <Text style={styles.text}>{props.title}</Text>
          <Text style={styles.qnt}>Quantity: {props.quantity}</Text>
        </View>
      </View>

      {/* third Box */}
      <View style={styles.box}>
        <View style={styles.product_text}>
          <Text style={styles.product_price}>{props.price} / Kg</Text>
          <TouchableOpacity style={styles.add_btn} onPress={deleteFromCart}>
            <Text style={styles.btn_text}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  images: {
    width: 70,
    height: 70,
    backgroundColor: '#EEC4C4',
    borderRadius: 6,
  },
  box: {
    width: 200,
    height: 69,
    margin: 10,
    flex: 1,
  },
  product_text: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'poppins',
    color: 'black',
    marginStart: 9,
  },
  add_btn: {
    backgroundColor: 'red',
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 6,
    width: 100,
  },
  btn_text: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  product_price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  qnt: {
    fontSize: 14,
    marginStart: 9,
  },
});
export default CartItem;
