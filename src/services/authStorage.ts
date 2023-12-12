import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64";
global.atob = decode;

export const setToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

export const setRefreshToken = async (refreshToken: string) => {
  await AsyncStorage.setItem("refresh-token", refreshToken);
};

export const getRefreshToken = async () => {
  const token = await AsyncStorage.getItem("refresh-token");
  return token;
};

export const removeRefreshToken = async () => {
  await AsyncStorage.removeItem("refresh-token");
};

export const setUserId = async (token: string) => {
  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken && decodedToken.userId) {
      await AsyncStorage.setItem("userId", decodedToken.userId.toString());
    } else {
      await AsyncStorage.removeItem("userId");
    }
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
  }
};

export const getUserId = async () => {
  const userId = await AsyncStorage.getItem("userId");
  return userId;
};
