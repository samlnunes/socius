import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components";
import themes from "./src/styles/themes";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { useState } from "react";
import { Login } from "./src/pages";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const deviceTheme = useColorScheme();
  const theme = deviceTheme ? themes[deviceTheme] : themes.dark;

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="mainTabs" component={Routes} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
