import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from '../components/Footer';

function CheckoutForm({navigation}) {
  return (
    <View style={{flex: 1}}>

    <View style={styles.container}>
      <Text style={styles.heading}>Checkout</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="Enter your phone number" keyboardType="email-address" />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Adress</Text>
        <TextInput style={styles.input} placeholder="Enter your shipping adress" keyboardType="email-address" />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Procces To Payment</Text>
      </TouchableOpacity>
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight:'bold'
  },
});

export default CheckoutForm;
