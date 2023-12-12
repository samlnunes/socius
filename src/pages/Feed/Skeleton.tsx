import React from "react";
import { Skeleton as OriginalSkeleton } from "moti/skeleton";
import { UserInfos } from "../../components/Post/styles";
import { View } from "react-native";

const Skeleton: React.FC = () => {
  return (
    <View style={{ width: "100%" }}>
      <UserInfos>
        <OriginalSkeleton
          colorMode="dark"
          radius="round"
          height={35}
          width={35}
        />

        <OriginalSkeleton colorMode="dark" height={20} width={100} />
      </UserInfos>

      <OriginalSkeleton colorMode="dark" width="100%" height={400} radius={0} />
    </View>
  );
};

export default Skeleton;
