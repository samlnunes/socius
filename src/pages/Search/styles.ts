import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  flex: 1;
  padding: 0 15px;
`;

export const BoxUser = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

export const UserPhoto = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const Username = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;

export const UserFullName = styled.Text`
  font-size: 12px;
  color: #808080;
`;

export const ContentUsers = styled.View`
  gap: 15px;
  margin-top: 15px;
`;

export const UserInfos = styled.View`
`;
