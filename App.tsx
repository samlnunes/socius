import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import themes from "./src/styles/themes"
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

export default function App() {
  const deviceTheme = useColorScheme();
  const theme = deviceTheme ? themes[deviceTheme] : themes.dark;

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
}
