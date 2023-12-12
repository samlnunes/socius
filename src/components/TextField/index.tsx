import React from "react";
import { TextInputProps, useColorScheme } from "react-native";
import { TextInputCustom } from "./styles";
import themes from "../../styles/themes";

interface TextFieldProps extends TextInputProps {
  onChange: any;
  value: any;
  background?: string;
  height?: number;
}

const TextField: React.FC<TextFieldProps> = ({
  onChange,
  value,
  background,
  height,
  ...rest
}) => {
  const deviceTheme = useColorScheme();

  return (
    <TextInputCustom
      {...rest}
      onChangeText={onChange}
      value={value}
      background={background}
      height={height}
      selectionColor={deviceTheme ? themes[deviceTheme].color : "auto"}
    />
  );
};

export default TextField;
