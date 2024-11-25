import { Image, StyleSheet, Text, View } from "react-native";
import { Actor } from "../utils/types";
import { MEDIUM_PROFILE_URL } from "../utils/constants";

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
        <Text>{actor.name}</Text>
        <Text>{actor.character}</Text>
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
