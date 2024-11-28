import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Surface } from "react-native-paper";
import { ListScreenStackParamLst, Movie } from "../utils/types";
import { convertMinutesToHours, parseReleaseYear } from "../utils/helpers";
import { MEDIUM_POSTER_URL } from "../utils/constants";
import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  movie: Movie;
}

type ListScreenNavigationProp = NativeStackNavigationProp<
  ListScreenStackParamLst,
  "Lists"
>;

const MovieListItem = memo(
  ({ movie }: Props) => {
    const releaseYear = parseReleaseYear(movie.release_date);
    const navigation = useNavigation<ListScreenNavigationProp>();

    const openDetails = () => {
      navigation.navigate("MovieDetails", { movieId: movie.id });
    };

    return (
      <Pressable onPress={openDetails}>
        <Surface style={styles.container} elevation={1}>
          <Image
            source={{ uri: `${MEDIUM_POSTER_URL}/${movie.poster_path}` }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text>{movie.title}</Text>
            <Text>Released: {releaseYear}</Text>
            <Text>Rating: {movie.vote_average.toFixed(1)}/10</Text>
          </View>
        </Surface>
      </Pressable>
    );
  },
  (prevProps, nextProps) => prevProps.movie.id === nextProps.movie.id
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    gap: 10,
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: "auto",
    aspectRatio: 2 / 3,
  },
  textContainer: {
    flexShrink: 1,
  },
});

export default MovieListItem;
