import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  flex: 1;
`;

export const OptionUpload = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
`;

export const ContentOptions = styled.View`
  position: absolute;
  flex-direction: row;
  padding: 15px;
  gap: 10px;
`;

export const ContentButton = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  bottom: 25px;
`;

export const ImageFake = styled.View`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  background-color: #898b8f;
`;

export const Content = styled.View`
  margin: 20px 0;
  position: relative;
`;
