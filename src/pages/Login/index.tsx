import React, { useEffect, useState } from "react";

import {
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, Logo, Form } from "./styles";
import { Button, TextField } from "../../components";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Config from "react-native-config";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const apiUrl = "https://socius-company-api.azurewebsites.net/";
  const navigation = useNavigation();

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const theme = useColorScheme();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getUserIdFromToken = (token: string) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    } catch (error: any) {
      console.error("Erro ao decodificar o token:", error.message);
      return null;
    }
  };

  const onSubmitFormHandler = async () => {
    if (!username.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.token);
        // await AsyncStorage.setItem(
        //   "userId",
        //   getUserIdFromToken(response.data.token)
        // );
        navigation.navigate("mainTabs");
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getJwt = async () => {
    try {
      const value = await AsyncStorage.getItem("token");

      if (value) {
        navigation.navigate("mainTabs");
      }
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    getJwt();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <Container>
        {theme === "dark" ? (
          <Logo source={require("../../assets/logo-dark.png")} />
        ) : (
          <Logo source={require("../../assets/logo-light.png")} />
        )}

        <Form>
          <TextField
            onChange={setUsername}
            value={username}
            placeholder="Nome de usuário"
            returnKeyType="next"
          />
          <TextField
            onChange={setPassword}
            value={password}
            secureTextEntry
            placeholder="Senha"
            returnKeyType="join"
          />

          <Button label="Entrar" onPress={onSubmitFormHandler} />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Login;
