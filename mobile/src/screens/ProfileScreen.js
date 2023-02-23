import * as React from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen({navigation}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogout = async () => {
    setIsLoading(true);

    await AsyncStorage.removeItem('acces_token');
    await AsyncStorage.removeItem('refresh_token');

    setTimeout(() => {
      navigation.reset({
        routes: [{name: 'Login'}],
      });
    }, 4000);
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginTop: 20}}>
          <ActivityIndicator size={'large'} />
        </Text>
        <Text> Loginout...</Text>
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
