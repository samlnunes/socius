import styled from "styled-components/native";

interface UserPhotoProps {
  focused: boolean;
}

export const UserPhoto = styled.Image<UserPhotoProps>`
  border-radius: 15px;
  border-width: ${(props) => props.focused ? "1px" : 0};
  border-color: ${(props) => props.focused ? props.theme.color : "transparent"};
`;
