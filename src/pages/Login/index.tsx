import React, { useEffect, useState } from "react";

import {
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Container, Logo, Form } from "./styles";
import { Button, TextField } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { getToken, setRefreshToken, setToken, setUserId } from "../../services/authStorage";

const Login: React.FC = () => {
  const navigation = useNavigation();

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const theme = useColorScheme();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitFormHandler = async () => {
    if (!username.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        setToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken)
        setUserId(response.data.accessToken);
        
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
    const token = await getToken();

    if (token) {
      navigation.navigate("mainTabs");
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

          <Button
            label="Entrar"
            isLoading={isLoading}
            onPress={onSubmitFormHandler}
          />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Login;
