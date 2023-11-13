import styled from "styled-components/native";

export const TextInputCustom = styled.TextInput`
  background-color: #e8e6e680;
  min-width: 100%;
  border-radius: 8px;
  padding: 0 15px;
  height: 50px;
  color: ${(props) => props.theme.color};
`;
