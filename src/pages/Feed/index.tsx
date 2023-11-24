import { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Container } from "./styles";
import axios from "axios";
import { Post } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

const Feed: React.FC = () => {
  const apiUrl = "https://socius-company-api.azurewebsites.net/";
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    setRefreshing(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(`${apiUrl}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPosts(response.data.content);
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <Container>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item?.id.toString()}
        renderItem={(item: any) => <Post infos={item?.item} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
};

export default Feed;
