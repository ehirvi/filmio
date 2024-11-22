import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import movieService from "../services/movieService";
import { ListScreenStackParamLst, Movie } from "../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LARGE_POSTER_URL } from "../utils/constants";

type Props = NativeStackScreenProps<ListScreenStackParamLst, "MovieDetails">;

const MovieDetails = ({ route }: Props) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await movieService.findOneById(movieId);
      setMovie(data);
    };
    fetchMovie();
  }, []);

  if (movie) {
    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Image
            source={{ uri: `${LARGE_POSTER_URL}/${movie.poster_path}` }}
            style={styles.image}
          />
          <Text>{movie.title}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {},
  detailsContainer: {
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: "auto",
    aspectRatio: 2 / 3,
  },
});

export default MovieDetails;
