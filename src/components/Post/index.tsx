import { Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
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

interface PostProps {
  infos: any;
}

const Post: React.FC<PostProps> = ({ infos }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [likePost, setLikePost] = useState(false);

  const handleImagePress = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 1) {
      setLikePost(true);
      setClickCount(0);
    } else {
      setTimeout(() => {
        setClickCount(0);
      }, 300);
    }
  };

  const renderPagination = () => (
    <Pagination
      dotsLength={infos.mediaUrls.length}
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
          data={infos.mediaUrls}
          renderItem={(item: any) => (
            <TouchableOpacity onPress={handleImagePress} activeOpacity={1}>
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
