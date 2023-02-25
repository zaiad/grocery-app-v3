import React from 'react';
import {
  TouchableOpacity,
  Button,
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

export default function Footer({ navigation }) {
  const products = useSelector(state => state.cart.products);

  const cartCount =  products.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        mouseEnterDelay={1000}
        onPress={() => navigation.navigate('Home')}>
        <Image
          style={styles.images}
          source={require('../assets/icons/home.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        mouseEnterDelay={1000}
        onPress={() => navigation.navigate('Cart')}>
        <View style={{ position: 'relative' }}>
          <Image
            style={styles.images}
            source={require('../assets/icons/cart.png')}
          />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        mouseEnterDelay={1000}
        onPress={() => navigation.navigate('WishList')}>
        <Image
          style={styles.images}
          source={require('../assets/icons/heart.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        mouseEnterDelay={1000}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.images}
          source={require('../assets/icons/user.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    width: 30,
    height: 30,
    tintColor: '#062C30',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
