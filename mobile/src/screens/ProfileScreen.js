import * as React from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExitApp from 'react-native-exit-app';

function ProfileScreen({navigation}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogout = async () => {
    setIsLoading(true);

    await AsyncStorage.removeItem('acces_token');
    await AsyncStorage.removeItem('refresh_token');

    setTimeout(() => {
      ExitApp.exitApp(); // Add this line to close the app
    }, 2000);
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginTop: 20}}>
          <ActivityIndicator size={'large'} />
        </Text>
        <Text> Logout...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

export default ProfileScreen;
