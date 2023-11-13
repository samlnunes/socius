import styled from "styled-components/native";
import { KeyboardAvoidingView } from "react-native";  

export const Container = styled(KeyboardAvoidingView).attrs({
  behavior: "padding",
})`
  background-color: ${(props) => props.theme.background};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  height: 100px;
  width: 300px;
  margin-bottom: 20px;
`;

export const Form = styled.View`
  display: flex;
  gap: 10px;
  padding: 0 20px;
`;
