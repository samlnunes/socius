import React, { useState } from "react";

import {
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, Logo, Form } from "./styles";
import { Button, TextField } from "../../components";
import axios from "axios";

const Login: React.FC = () => {
  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const theme = useColorScheme();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "https://socius-company-api.azurewebsites.net/";

  const onSubmitFormHandler = async () => {
    if (!username.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.token);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

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
