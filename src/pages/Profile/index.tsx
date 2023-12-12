import { useCallback, useEffect, useState } from "react";

import { api } from "../../services/api";
import { getUserId } from "../../services/authStorage";
import * as ImagePicker from "expo-image-picker";
import { Container, FullName, Header, ImageUser, ProfileImage } from "./styles";
import { uploadToS3 } from "../../config/S3Config";
import { Post, User } from "../../types";
import { FlatGrid } from "react-native-super-grid";
import { Image, RefreshControl } from "react-native";
import { Video } from "../../components";
import { ResizeMode } from "expo-av";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState<Post[]>();
  const [refreshing, setRefreshing] = useState(false);

  const getUserProfile = async () => {
    try {
      const userId = await getUserId();

      const response = await api.get(`/users/${userId}`);

      setImage(response.data.profileImageUrl);
      setUser(response.data);
    } catch (error) {
      console.log("error profile", error);
    }
  };

  const getPosts = async () => {
    setRefreshing(true);

    try {
      const userId = await getUserId();

      const response = await api.get(`/posts`, {
        params: { userId },
      });

      setPosts(response.data.content);
    } catch (error) {
      console.log("error", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getUserProfile();
    getPosts();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      try {
        const userId = await getUserId();

        if (userId) {
          const fileData = await fetch(
            result.assets[0].uri.replace("file://", "")
          ).then((response) => response.blob());

          const response = await uploadToS3(fileData, userId.toString());

          const s3Url = response.Location;

          await api.post(
            `/users/${userId}/profile-image`,
            encodeURIComponent(s3Url)
          );
        }
      } catch (error) {
        console.log("error image", error);
      }
    }
  };

  const onRefresh = useCallback(() => {
    getPosts();
  }, []);

  return (
    <Container>
      <Header>
        <ProfileImage onPress={() => pickImage()}>
          <ImageUser
            source={{
              uri:
                image ??
                "https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg",
              scale: 0.1,
            }}
            resizeMode="cover"
          />
        </ProfileImage>

        <FullName>
          {user?.name} {user?.lastname}
        </FullName>
      </Header>

      <FlatGrid
        data={posts ?? []}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        spacing={1}
        renderItem={({ item }) =>
          item?.media[0].type === "video" ? (
            <Video
              source={{ uri: item?.media[0].url }}
              style={{ width: "100%", height: "auto", aspectRatio: 1 }}
              resizeMode={ResizeMode.COVER}
              isLooping
            />
          ) : (
            <Image
              source={{ uri: item?.media[0].url }}
              style={{ width: "100%", height: "auto", aspectRatio: 1 }}
            />
          )
        }
      />
    </Container>
  );
};

export default Profile;
