import { useState } from "react";
import { TextField } from "../../components";
import {
  BoxUser,
  Container,
  ContentUsers,
  UserFullName,
  UserInfos,
  UserPhoto,
  Username,
} from "./styles";
import { api } from "../../services/api";
import { User } from "../../types";
import {
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Search: React.FC = () => {
  const deviceTheme = useColorScheme();
  const navigation = useNavigation();

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const [search, setSearch] = useState("");
  const [usersFind, setUsersFind] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserSearch = async (text: string) => {
    setSearch(text);
    setIsLoading(true);

    if (text.length > 2) {
      try {
        const response = await api.get("/users", { params: { search: text } });
        setUsersFind(response.data.content);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <Container>
        <TextField
          onChange={getUserSearch}
          value={search}
          placeholder="Search"
          background={deviceTheme === "dark" ? "#303030" : "#cfd1d0"}
          height={40}
        />

        <ContentUsers>
          {usersFind?.map((user) => (
            <BoxUser key={user?.id}>
              <UserPhoto
                source={{
                  scale: 0.5,
                  uri:
                    user?.profileImageUrl ??
                    "https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg",
                }}
              />

              <UserInfos>
                <Username>{user?.username}</Username>
                <UserFullName>
                  {user?.name} {user?.lastname}
                </UserFullName>
              </UserInfos>
            </BoxUser>
          ))}
        </ContentUsers>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Search;
