import styled from "styled-components/native";

interface TextInputCustomProps {
  background?: string;
  height?: number;
}

export const TextInputCustom = styled.TextInput<TextInputCustomProps>`
  background-color: ${(props) => props.background ?? "#e8e6e680"};
  min-width: 100%;
  border-radius: 8px;
  padding: 0 15px;
  height: ${(props) => props.height ?? 50}px;
  color: ${(props) => props.theme.color};
`;
