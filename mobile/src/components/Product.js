import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import Counter from '../components/Counter';
import {addProduct} from '../redux/features/CartSlice';
import FastImage from 'react-native-fast-image';

const Product = ({_id, title, price}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addProduct({_id, title, price, quantity}));
      
      setQuantity(0);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Product added to cart!</Text>
        </View>
      </Modal>
      {/* First Box */}
      <View style={styles.box}>
        <View>
          <Image style={styles.images} source={require('../assets/images/products/potato.png')} />
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 600,
    marginTop: 20,
    backgroundColor: 'white',
  },

  modalText: {
    fontSize: 22,
    color: '#54B415',
    fontWeight: 'bold',
  },
});
export default Product;
