import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Chip } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Genre, HomeScreenStackParamlist } from "../../utils/types";
// import testData from "../../utils/testData";
import genreService from "../../services/genreService";

type Props = NativeStackScreenProps<HomeScreenStackParamlist, "GenreSelector">;

const GenreSelector = ({ navigation }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  console.log(selectedGenres);

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await genreService.getAll();
      // const genres = testData.genres;
      setGenres(genres);
    };
    fetchGenres();
  }, []);

  const isSelected = (genre: Genre) => {
    const found = selectedGenres.find((g) => g.id === genre.id);
    return found;
  };

  const handlePress = (genre: Genre) => {
    isSelected(genre)
      ? setSelectedGenres((g) => g.filter((g) => g.id !== genre.id))
      : setSelectedGenres((g) => g.concat(genre));
  };

  const handleSubmit = () => {
    navigation.navigate("MovieSwiper", { genres: selectedGenres });
  };

  if (genres) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>What type of movie do you feel like watching?</Text>
        <View style={styles.genreList}>
          {genres.map((g) => (
            <Chip
              key={g.id}
              onPress={() => handlePress(g)}
              selected={isSelected(g) ? true : false}
              showSelectedOverlay
            >
              {g.name}
            </Chip>
          ))}
        </View>
        <Button mode="contained" onPress={handleSubmit}>
          Continue
        </Button>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  genreList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    margin: 10,
  },
});

export default GenreSelector;
