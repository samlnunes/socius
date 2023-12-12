import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feed, NewPost, Profile, Search } from "./pages";
import { Header } from "./components";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getUserId } from "./services/authStorage";
import { api } from "./services/api";
import { UserPhoto } from "./styles/globalStyle";
import { useColorScheme } from "react-native";
import themes from "./styles/themes";

const Tab = createBottomTabNavigator();

const Routes: React.FC = () => {
  const deviceTheme = useColorScheme();
  const theme = deviceTheme ? themes[deviceTheme] : themes.dark;
  const [userProfilePhoto, setUserProfilePhoto] = useState("#");

  const getUserData = async () => {
    try {
      const userId = await getUserId();
      const response = await api.get(`/users/${userId}`);

      setUserProfilePhoto(response.data.profileImageUrl);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: "transparent",
        },
        header: () => <Header />,
        tabBarActiveTintColor: theme.color,
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
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={NewPost}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        initialParams={{ userId: "" }}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <UserPhoto
              source={{
                uri:
                  userProfilePhoto ??
                  "https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg",
              }}
              width={size}
              height={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Routes;
