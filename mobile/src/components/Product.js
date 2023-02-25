import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Counter from '../components/Counter';
import { addProduct } from '../redux/features/CartSlice';

const Product = ({ title, description, price, image }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addProduct({ title, description, price, image, quantity }));
      setQuantity(0); // reset the quantity to zero after adding to cart
    }
  };

  return (
    <View style={styles.container}>
      {/* First Box */}
      <View style={styles.box}>
        <View>
          <Image style={styles.images} source={image} />
        </View>
      </View>

      {/* Second Box */}
      <View style={styles.box}>
        <View style={styles.product_text}>
          <Text style={styles.text}>{title}</Text>
          <Counter quantity={quantity} setQuantity={setQuantity} />
        </View>
      </View>

      {/* third Box */}
      <View style={styles.box}>
        <View style={styles.product_text}>
          <Text style={styles.product_price}>{price}.00 dhs</Text>
          <TouchableOpacity style={styles.add_btn} onPress={handleAddToCart}>
            <Text style={styles.btn_text}>Add To Cart</Text>
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
    justifyContent: 'space-between',
  },
  images: {
    width: 110,
    height: 110,
    backgroundColor: '#EEC4C4',
    borderRadius: 6,
    marginTop: 25,
    marginLeft: 5,
  },
  box: {
    width: 250,
    height: 150,
    margin: 5,
    flex: 1,
  },
  product_title: {},
  product_text: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'poppins',
    color: 'black',
  },
  add_btn: {
    backgroundColor: '#54B435',
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 6,
    width: 120,
  },
  btn_text: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  product_price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default Product;
