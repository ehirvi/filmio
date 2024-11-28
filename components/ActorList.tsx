import { FlatList, StyleSheet, View } from "react-native";
import ActorListItem from "./ActorListItem";
import { Actor } from "../utils/types";
import { Text } from "react-native-paper";

interface Props {
  actors: Actor[];
}

const ActorList = ({ actors }: Props) => {
  if (actors.length > 0) {
    return (
      <View>
        <Text variant="bodyLarge">Main Cast</Text>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          horizontal
          data={actors}
          renderItem={({ item }) => <ActorListItem actor={item} />}
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={60}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: 10,
    gap: 10,
  },
});

export default ActorList;
