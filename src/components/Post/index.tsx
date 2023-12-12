import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  Container,
  UserInfos,
  Avatar,
  Username,
  ContentText,
  Footer,
  Datetime,
} from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Entypo, Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import { getUserId } from "../../services/authStorage";
import themes from "../../styles/themes";
import { Media, Post as PostType } from "../../types";
import dayjs from "dayjs";
import Video from "../Video";
import { ResizeMode } from "expo-av";

interface PostProps {
  infos: PostType;
}

const Post: React.FC<PostProps> = ({ infos }) => {
  const deviceTheme = useColorScheme();
  const theme = deviceTheme ? themes[deviceTheme] : themes.dark;
  const stylesPagination = styles(theme);
  const opacity = useRef(new Animated.Value(0)).current;

  const [activeSlide, setActiveSlide] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [likePost, setLikePost] = useState(false);

  useEffect(() => {
    verifyLike();
  }, [infos]);

  const verifyLike = async () => {
    const userId = await getUserId();

    const found = Boolean(
      infos.likes?.find((like) => like.id === Number(userId))
    );

    setLikePost(found);
  };

  const handleLikePost = async (postId: string) => {
    if (likePost) {
      setLikePost(false);
    }

    try {
      const response = await api.post(`/posts/${postId}/like`);
      setLikePost(response.data.like);
    } catch (error) {
      console.log("error", error);
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
      dotsLength={infos?.media?.length || 0}
      activeDotIndex={activeSlide}
      containerStyle={stylesPagination.paginationContainer}
      dotContainerStyle={stylesPagination.paginationDotContainer}
      dotStyle={stylesPagination.paginationDot}
      inactiveDotStyle={stylesPagination.paginationInactiveDot}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.8}
    />
  );

  const renderImage = (item: Media) => {
    const onLoadEnd = () => {
      Animated.timing(opacity, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <ImageBackground
        source={{ uri: item?.thumbnail }}
        blurRadius={2}
        style={{ width: "100%", height: "auto", aspectRatio: 1 }}
      >
        <Animated.Image
          source={{ uri: item?.url }}
          onLoadEnd={onLoadEnd}
          style={[
            { width: "100%", height: "auto", aspectRatio: 1 },
            { opacity },
          ]}
        />
      </ImageBackground>
    );
  };

  return (
    <Container>
      <UserInfos>
        <Avatar
          source={{
            uri:
              infos?.user?.profileImageUrl ??
              "https://img.freepik.com/premium-vector/flat-instagram-icons-notifications_619991-50.jpg",
          }}
        />
        <Username>{infos?.user?.username}</Username>
      </UserInfos>

      <>
        <Carousel
          layout="default"
          data={infos?.media}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleImagePress(infos?.id)}
              activeOpacity={1}
            >
              {item?.type === "video" ? (
                <Video
                  source={{ uri: item?.url }}
                  style={{ width: "100%", height: "auto", aspectRatio: 1 }}
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  isFocused={activeSlide === index}
                />
              ) : (
                renderImage(item)
              )}
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Footer>
          <TouchableOpacity onPress={() => handleLikePost(infos.id)}>
            {likePost ? (
              <Entypo name="heart" color="#fe180a" size={25} />
            ) : (
              <Feather name="heart" color={theme.color} size={25} />
            )}
          </TouchableOpacity>

          <>{renderPagination()}</>
        </Footer>
      </>

      <ContentText>
        <Username>{infos?.user?.username} </Username>
        {infos?.content}
      </ContentText>

      <Datetime>{dayjs(infos?.createdAt).format("DD MMMM")}</Datetime>
    </Container>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
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
      backgroundColor: theme.color,
    },
    paginationInactiveDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.color,
      opacity: 0.5,
    },
  });

export default Post;
