import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Keyboard, TouchableOpacity} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {storeUserToken} from '../../utils/store.token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateLogin} from '../../utils/validator.js';
import {IP} from '@env';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState({password: '', email: ''});

  const handleLogin = async () => {
    let errors = validateLogin(email, password);
    if (errors?.password || errors?.email) {
      setError(errors);
      return;
    }

    try {
      const response = await axios.post(`http://${IP}:1337/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const {acces_token} = response.data;
        const {refresh_token} = response.data;

        await storeUserToken(acces_token, refresh_token);
        navigation.navigate('Home');
      }
    } catch (error) {
      alert(error.response.data.message);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        errorMessage={err.email}
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
        errorMessage={err.password}
      />
      <View style={styles.btncontainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Login"
            onPress={handleLogin}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
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
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
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
  btncontainer: {
    flex: 1,
    justifyContent: 'row',
  },
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },

  buttonTitle: {
    fontSize: 18,
  },
};

export default LoginScreen;
