import * as React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen({navigation}) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('acces_token');
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View>
      <Text>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

export default ProfileScreen;
