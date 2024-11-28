import { Image, StyleSheet, View } from "react-native";
import { Actor } from "../utils/types";
import { MEDIUM_PROFILE_URL } from "../utils/constants";
import { Text } from "react-native-paper";

interface Props {
  actor: Actor;
}

const ActorListItem = ({ actor }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `${MEDIUM_PROFILE_URL}/${actor.profile_path}` }}
      />
      <View style={styles.textContainer}>
        <Text variant="labelMedium">{actor.name}</Text>
        <Text variant="bodySmall">{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
  },
  image: {
    width: 80,
    height: "auto",
    aspectRatio: 2 / 3,
  },
  textContainer: {
    padding: 2,
  },
});

export default ActorListItem;
