import { useColorScheme, Text } from "react-native";
import { Container, Logo } from "./styles";

const Header: React.FC = () => {
  const theme = useColorScheme();

  return (
    <Container>
      <>
        {theme === "dark" ? (
          <Logo source={require("../../assets/logo-dark.png")} />
        ) : (
          <Logo source={require("../../assets/logo-light.png")} />
        )}
      </>
    </Container>
  );
};

export default Header;
