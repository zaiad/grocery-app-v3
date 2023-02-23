import axios from 'axios';

const API_BASE_URL = 'http://172.16.8.112:1337/api';

export const verifyAccessToken = async (accessToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-access-token`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200 && response.data.isValid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    if (response.data.status === 200 && response.data.accessToken) {
      return response.data.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Add more API functions as needed
