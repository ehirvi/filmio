import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Chip, Text, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Genre, HomeScreenStackParamlist } from "../../utils/types";
import genreService from "../../services/genreService";

type Props = NativeStackScreenProps<HomeScreenStackParamlist, "GenreSelector">;

const GenreSelector = ({ navigation }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const theme = useTheme();

  console.log(selectedGenres);

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await genreService.getAll();
      setGenres(genres);
    };
    fetchGenres();
  }, []);

  const isSelected = (genre: Genre) => {
    const found = selectedGenres.some((g) => g.id === genre.id);
    return found;
  };

  const hasNotSelectedAny = () => {
    return selectedGenres.length === 0 ? true : false;
  };

  const handlePress = (genre: Genre) => {
    isSelected(genre)
      ? setSelectedGenres((g) => g.filter((g) => g.id !== genre.id))
      : setSelectedGenres((g) => g.concat(genre));
  };

  const handleSubmit = () => {
    if (hasNotSelectedAny()) {
      return;
    }
    navigation.navigate("MovieSwiper", { genres: selectedGenres });
  };

  if (genres) {
    return (
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text variant="bodyLarge" style={styles.text}>
            What type of a movie are you interested in watching? Select one or
            multiple genres and continue
          </Text>
          <View style={styles.genreList}>
            {genres.map((g) => (
              <Chip
                selected={isSelected(g)}
                elevated={true}
                key={g.id}
                onPress={() => handlePress(g)}
                showSelectedOverlay={true}
                selectedColor={theme.colors.primary}
              >
                {g.name}
              </Chip>
            ))}
          </View>
          <Button style={styles.button} mode="contained" onPress={handleSubmit}>
            Continue
          </Button>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    margin: 10,
  },
  genreList: {
    gap: 10,
    margin: 10,
  },
  button: {
    margin: 10,
  },
});

export default GenreSelector;
