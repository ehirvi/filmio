import { Card, Surface } from "react-native-paper";
import { MoviesFilteredByGenre } from "../utils/types";
import { Image, StyleSheet, Text } from "react-native";
import { POSTER_URL } from "../utils/constants";

interface Props {
  movie: MoviesFilteredByGenre["results"][number];
}

const MovieCard = ({ movie }: Props) => {
  const releaseYear = movie.release_date.slice(0, 4);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Surface elevation={3}>
          <Image
            source={{ uri: `${POSTER_URL}/${movie.poster_path}` }}
            style={styles.image}
          />
        </Surface>
      </Card.Content>
      <Card.Title title={`${movie.title} (${releaseYear})`} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 30,
    marginHorizontal: "auto",
    padding: 5,
  },
  image: {
    width: 270,
    height: "auto",
    aspectRatio: 2 / 3,
  },
});

export default MovieCard;
