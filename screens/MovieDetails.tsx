import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import movieService from "../services/movieService";
import { ListScreenStackParamLst, Movie } from "../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LARGE_POSTER_URL } from "../utils/constants";
import { convertMinutesToHours } from "../utils/helpers";
import { Button } from "react-native-paper";
import ActorList from "../components/ActorList";

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
    const formattedReleaseDate = new Date(
      movie.release_date
    ).toLocaleDateString("en-GB");
    const duration = convertMinutesToHours(movie.runtime);

    return (
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Image
            source={{ uri: `${LARGE_POSTER_URL}/${movie.poster_path}` }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text>{movie.title}</Text>
            <Text>
              Total duration: {duration.hours} hours {duration.minutes} minutes
            </Text>
            <Text>Release date: {formattedReleaseDate}</Text>
            <Text>{movie.overview}</Text>
          </View>
        </View>
        <View>
          <Button mode="contained">Add to watchlist</Button>
        </View>
        <ActorList />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    gap: 15,
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  textContainer: {
    flexShrink: 1,
    gap: 5,
  },
  image: {
    width: 150,
    height: "auto",
    aspectRatio: 2 / 3,
  },
});

export default MovieDetails;
