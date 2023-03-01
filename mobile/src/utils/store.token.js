import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeUserToken(accessToken, refreshToken) {

  await AsyncStorage.setItem(
    'acces_token',
    JSON.stringify({
      accessToken,
    }),
  );

  await AsyncStorage.setItem(
    'refresh_token',
    JSON.stringify({
      refreshToken,
    }),
  );
}
