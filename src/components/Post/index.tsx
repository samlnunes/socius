import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import {
  Container,
  ImageCustom,
  UserInfos,
  Avatar,
  Username,
  ContentText,
  Footer,
} from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Entypo, Feather } from "@expo/vector-icons";
import Config from "react-native-config";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  user: User;
  likes?: User[] | null;
  mediaUrls?: string[] | null;
}

export interface AuthoritiesEntity {
  authority: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  enabled: boolean;
  authorities?: AuthoritiesEntity[] | null;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}
interface PostProps {
  infos: Post;
}

const Post: React.FC<PostProps> = ({ infos }) => {
  const apiUrl = "https://socius-company-api.azurewebsites.net/";

  const [activeSlide, setActiveSlide] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [likePost, setLikePost] = useState(false);

  const handleLikePost = async (postId: string) => {
    try {
      await axios.post(`${apiUrl}/${postId}/like`);
    } catch (error) {
      console.log("error");
    }
  };

  const handleImagePress = (postId: string) => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 1) {
      setLikePost(true);
      handleLikePost(postId);
      setClickCount(0);
    } else {
      setTimeout(() => {
        setClickCount(0);
      }, 300);
    }
  };

  const renderPagination = () => (
    <Pagination
      dotsLength={infos?.mediaUrls?.length || 0}
      activeDotIndex={activeSlide}
      containerStyle={styles.paginationContainer}
      dotContainerStyle={styles.paginationDotContainer}
      dotStyle={styles.paginationDot}
      inactiveDotStyle={styles.paginationInactiveDot}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.8}
    />
  );

  return (
    <Container>
      <UserInfos>
        <Avatar />
        <Username>{infos?.user?.username}</Username>
      </UserInfos>

      <>
        <Carousel
          layout="default"
          data={infos?.mediaUrls || []}
          renderItem={(item: any) => (
            <TouchableOpacity
              onPress={() => handleImagePress(infos?.id)}
              activeOpacity={1}
            >
              <ImageCustom source={{ uri: item.item }} />
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Footer>
          <TouchableOpacity onPress={() => setLikePost(!likePost)}>
            {likePost ? (
              <Entypo name="heart" color="#fe180a" size={30} />
            ) : (
              <Feather name="heart" color="#fff" size={30} />
            )}
          </TouchableOpacity>

          <>{renderPagination()}</>
        </Footer>
      </>

      <ContentText>
        <Username>{infos?.user?.username} </Username>
        {infos?.content}
      </ContentText>
    </Container>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: "absolute",
    top: -20,
    width: "100%",
  },
  paginationDotContainer: {
    marginHorizontal: 2,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  paginationInactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.56)",
  },
});

export default Post;
