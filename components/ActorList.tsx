import { FlatList, Text, View } from "react-native";
import testData from "../utils/testData";
import ActorListItem from "./ActorListItem";

const ActorList = () => {
  return (
    <View>
      <Text>Cast</Text>
      <FlatList
        horizontal
        data={testData.actors}
        renderItem={({ item }) => <ActorListItem actor={item} />}
      />
    </View>
  );
};

export default ActorList;
