import React from "react";

import { TouchableHighlightProps, ActivityIndicator } from "react-native";
import { ButtonCustom, ButtonText } from "./styles";

interface ButtonCustomProps extends TouchableHighlightProps {
  label: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonCustomProps> = ({ label, isLoading, ...rest }) => {
  return (
    <ButtonCustom {...rest}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <ButtonText>{label}</ButtonText>
      )}
    </ButtonCustom>
  );
};

export default Button;
