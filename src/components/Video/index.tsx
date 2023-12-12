import React, { useState, useRef, useCallback } from "react";
import {
  Audio,
  Video as OriginalVideo,
  VideoProps as OriginalVideoProps,
} from "expo-av";
import { useFocusEffect } from "@react-navigation/native";

const triggerAudio = async (ref: any) => {
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  ref?.current?.playAsync();
};

interface VideoProps extends OriginalVideoProps {
  isFocused?: boolean;
}

const Video: React.FC<VideoProps> = ({ isFocused, ...props }) => {
  const ref = useRef(null);
  const [autoPlay, setAutoPlay] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (isFocused || autoPlay) {
        triggerAudio(ref);
        setAutoPlay(false);
      }

      return () => {
        ref?.current?.stopAsync();
      };
    }, [autoPlay, ref, isFocused])
  );

  return (
    <OriginalVideo
      ref={ref}
      useNativeControls
      shouldPlay={autoPlay}
      {...props}
    />
  );
};

export default Video;
