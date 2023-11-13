import { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Container } from "./styles";
import axios from "axios";
import { Post } from "../../components";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const baseUrl = "https://socius-company-api.azurewebsites.net/";

  const onRefresh = useCallback(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(`${baseUrl}/posts`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzb2NpdXMtYXBpIiwic3ViIjoic2FtbnVuZXMiLCJleHAiOjE2OTk3NzU5NDV9.zdK4gAvUx4SFQTy0VvOJz7iLS5Tso8cF1PEJ9yKqJxQ`,
        },
      });

      if (response.status === 200) {
        setPosts(response.data.content);
      }
    } catch (e) {
      console.log(e);
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
