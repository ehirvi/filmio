import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const Lists = () => {
  const [listType, setListType] = useState("");

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={listType}
        onValueChange={setListType}
        buttons={[
          {
            value: "watch",
            label: "I want to watch",
          },
          {
            value: "seen",
            label: "I have watched",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
})

export default Lists;
