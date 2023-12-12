import styled from "styled-components/native";

export const Container = styled.View`
  min-width: 100%;
`;

export const ImageCustom = styled.Image`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
`;

export const UserInfos = styled.View`
  width: 100%;
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
`;

export const Avatar = styled.Image`
  height: 35px;
  width: 35px;
  border-radius: 17.5px;
`;

export const Username = styled.Text`
  color: ${(props) => props.theme.color};
  font-weight: 700;
`;

export const ContentText = styled.Text`
  color: ${(props) => props.theme.color};
  margin: 15px 15px 5px 15px;
`;

export const Footer = styled.View`
  max-height: 30px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  justify-content: flex-start;
  position: relative;
  margin: 10px 15px 0 15px;
`;

export const Datetime = styled.Text`
  color: ${(props) => props.theme.color};
  opacity: 0.5;
  font-size: 12px;
  margin: 0 15px;
`;
