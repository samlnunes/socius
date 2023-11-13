import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feed } from "./pages";
import { Header } from "./components";
import { Entypo, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#000", borderTopColor: "transparent" },
        header: (props) => <Header />,
        tabBarActiveTintColor: "#fff",
        tabBarLabelStyle: { display: "none" },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Feed}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Feed}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
