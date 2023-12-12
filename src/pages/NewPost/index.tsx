import * as ImagePicker from "expo-image-picker";
import {
  Container,
  Content,
  ContentButton,
  ContentOptions,
  ImageFake,
  OptionUpload,
} from "./styles";
import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Button, TextField, Video } from "../../components";
import { ResizeMode } from "expo-av";
import themes from "../../styles/themes";
import { getUserId } from "../../services/authStorage";
import { uploadMediaS3 } from "../../config/S3Config";
import { api } from "../../services/api";
import { Entypo } from "@expo/vector-icons";

const NewPost: React.FC = () => {
  const deviceTheme = useColorScheme();
  const theme = deviceTheme ? themes[deviceTheme] : themes.dark;

  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [mediaPost, setMediaPost] = useState<ImagePicker.ImagePickerAsset[]>(
    []
  );
  const stylesPagination = styles(theme);

  const handleSnapToItem = (index: number) => {
    setFocusedIndex(index);
  };

  const renderPagination = () => (
    <Pagination
      dotsLength={mediaPost?.length || 0}
      activeDotIndex={focusedIndex}
      containerStyle={stylesPagination.paginationContainer}
      dotContainerStyle={stylesPagination.paginationDotContainer}
      dotStyle={stylesPagination.paginationDot}
      inactiveDotStyle={stylesPagination.paginationInactiveDot}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.8}
    />
  );

  const pickCamera = async () => {
    const newMediaPost = [...mediaPost];

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      result?.assets?.forEach((asset) => newMediaPost.push(asset));
      setMediaPost(newMediaPost);
    }
  };

  const pickImage = async () => {
    try {
      const newMediaPost = [...mediaPost];
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        result?.assets?.forEach((asset) => newMediaPost.push(asset));
        setMediaPost(newMediaPost);
      }
    } catch (error) {
      console.error("Error picking media", error);
    }
  };

  const pickVideo = async () => {
    try {
      const newMediaPost = [...mediaPost];
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });

      if (!result.canceled) {
        result?.assets?.forEach((asset) => newMediaPost.push(asset));
        setMediaPost(newMediaPost);
      }
    } catch (error) {
      console.error("Error picking media", error);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const userId = await getUserId();

      const files = await Promise.all(
        mediaPost.map(async (media) => {
          const response = await fetch(media.uri.replace("file://", ""));
          const blob = await response.blob();
          const type = media.type!;

          return {
            file: blob,
            type: type,
          };
        })
      );

      const responseS3 = await uploadMediaS3(files, userId!.toString());

      const media = responseS3.map((s3Object) => {
        const { Location, Key } = s3Object;

        const type = Key.includes("/videos/") ? "video" : "image";

        return {
          url: Location,
          type,
        };
      });

      const objToSend = {
        content: caption,
        userId: userId,
        media: media,
      };

      await api.post("/posts", objToSend);

      setCaption("")
      setMediaPost([])
    } catch (error) {
      console.log("error new post", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <TextField
        onChange={setCaption}
        value={caption}
        placeholder="Escreva uma legenda..."
        placeholderTextColor="#5e6063"
        background="transparent"
        multiline
        height={160}
      />

      <Content>
        {mediaPost?.length > 0 ? (
          <Carousel
            layout="default"
            data={mediaPost}
            renderItem={({ item, index }) =>
              item.type === "image" ? (
                <Image
                  source={{ uri: item?.uri }}
                  style={{ width: "100%", height: "auto", aspectRatio: 1 }}
                />
              ) : (
                <Video
                  source={{ uri: item?.uri }}
                  style={{ width: "100%", height: "auto", aspectRatio: 1 }}
                  isLooping
                  resizeMode={ResizeMode.COVER}
                  isFocused={focusedIndex === index}
                />
              )
            }
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width}
            onSnapToItem={handleSnapToItem}
          />
        ) : (
          <ImageFake />
        )}

        <ContentOptions>
          <OptionUpload onPress={() => pickImage()}>
            <Entypo name="image" size={30} color="black" />
          </OptionUpload>

          <OptionUpload onPress={() => pickVideo()}>
            <Entypo name="video" size={30} color="black" />
          </OptionUpload>

          <OptionUpload onPress={() => pickCamera()}>
            <Entypo name="camera" size={30} color="black" />
          </OptionUpload>
        </ContentOptions>
      </Content>

      <View
        style={{
          position: "absolute",
          bottom: 90,
          width: "100%",
        }}
      >
        {renderPagination()}
      </View>

      <ContentButton>
        <Button
          onPress={() => onSubmit()}
          label="Publicar"
          isLoading={isLoading}
          style={{ width: 150, minWidth: 100 }}
        />
      </ContentButton>
    </Container>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    paginationContainer: {
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

export default NewPost;
