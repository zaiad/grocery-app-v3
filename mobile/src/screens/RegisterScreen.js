import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {AsyncStorage} from 'react-native';

// Now you can access your environment variables like so:

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    if (!name) {
      alert('Please enter your name');
      return;
    }

    if (!email) {
      alert('Please enter your email');
      return;
    }

    if (!password) {
      alert('Please enter your password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    try {
      const response = await axios.post(
        `http://192.168.3.190:1337/api/register`,
        {
          name,
          email,
          password,
        },
      );
      if (response.status === 201) {
        return navigation.navigate('Verify', {email: email});
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert('Email already exist');
      } else {
        alert('Please Refresh The Page');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Input
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
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
      <View style={styles.btncontainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Register"
            onPress={handleRegister}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>
          You already have an account ? Login Here
        </Text>
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

export default RegisterScreen;
