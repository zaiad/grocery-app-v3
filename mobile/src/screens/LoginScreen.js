import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button, Input} from 'react-native-elements';
import dotenv from 'dotenv';
dotenv.config();

// Now you can access your environment variables like so:

const LoginScreen = ({navigation}) => {
  const IP = process.env.IP;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://${IP}:1337/api/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    color: '#000',
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  forgotPassword: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    color: '#008080',
  },
};

export default LoginScreen;
