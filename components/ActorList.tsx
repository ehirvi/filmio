import { FlatList, StyleSheet, Text, View } from "react-native";
import ActorListItem from "./ActorListItem";
import { Actor } from "../utils/types";

interface Props {
  actors: Actor[];
}

const ActorList = ({ actors }: Props) => {
  return (
    <View>
      <Text>Main Cast</Text>
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
};

const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: 10,
    gap: 10,
  },
});

export default ActorList;
