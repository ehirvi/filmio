import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Genre } from "../utils/types";
import genreService from "../services/genreService";
import testData from "../utils/testData";
import { Button, Chip } from "react-native-paper";

const GenreSelector = () => {
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

  if (genres) {
    return (
      <View style={styles.container}>
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
        <Button mode="contained">Continue</Button>
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
