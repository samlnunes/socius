import React from "react";

import { TouchableHighlightProps, Text } from "react-native";
import { ButtonCustom, ButtonText } from "./styles";

interface ButtonCustomProps extends TouchableHighlightProps {
  label: string;
}

const Button: React.FC<ButtonCustomProps> = ({ label, ...rest }) => {
  return (
    <ButtonCustom {...rest}>
      <ButtonText>{label}</ButtonText>
    </ButtonCustom>
  );
};

export default Button;
