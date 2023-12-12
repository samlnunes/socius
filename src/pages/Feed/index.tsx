import { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Container } from "./styles";
import { Post } from "../../components";
import { api } from "../../services/api";
import { Post as PostType } from "../../types";
import Skeleton from "./Skeleton";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    getFeed();
  }, []);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    setRefreshing(true);

    try {
      const response = await api.get("/posts");

      if (response.status === 200) {
        setPosts(response.data.content);
      }
    } catch (error: any) {
      console.log("feed", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Container>
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => <Post infos={item} />}
        ListEmptyComponent={() =>
          Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} />)
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
};

export default Feed;
