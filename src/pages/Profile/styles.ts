import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  flex: 1;
`;

export const ProfileImage = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 40px;
`;

export const ImageUser = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const Header = styled.View`
  padding: 15px;
`;

export const FullName = styled.Text`
  color: ${(props) => props.theme.color};
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
`;
