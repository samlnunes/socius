import React from "react";
import { TextInputProps } from "react-native";
import { TextInputCustom } from "./styles";

interface TextFieldProps extends TextInputProps {
  onChange: any;
  value: any;
}

const TextField: React.FC<TextFieldProps> = ({
  onChange,
  value,
  ...rest
}) => {
  return (
    <TextInputCustom
    {...rest}
      onChangeText={onChange}
      value={value}
    />
  );
};

export default TextField;
