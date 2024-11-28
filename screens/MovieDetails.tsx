import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import movieService from "../services/movieService";
import {
  Actor,
  ListScreenStackParamLst,
  MovieTopDetails,
} from "../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LARGE_POSTER_URL } from "../utils/constants";
import { convertMinutesToHours } from "../utils/helpers";
import { Button, Text, useTheme } from "react-native-paper";
import ActorList from "../components/ActorList";
import useMovieStore from "../hooks/useStore";
import { useSQLiteContext } from "expo-sqlite";

type Props = NativeStackScreenProps<ListScreenStackParamLst, "MovieDetails">;

const MovieDetails = ({ route }: Props) => {
  const { movieId } = route.params;
  const isSaved = useMovieStore((state) =>
    state.movies.find((m) => m.movie_id === movieId)
  );
  const saveMovie = useMovieStore((state) => state.saveMovie);
  const removeMovie = useMovieStore((state) => state.removeMovie);
  const setMovieAsWatched = useMovieStore((state) => state.setMovieAsWatched);
  const [actors, setActors] = useState<Actor[]>();
  const [movie, setMovie] = useState<MovieTopDetails>();
  const db = useSQLiteContext();
  const theme = useTheme();

  useEffect(() => {
    const fetchActors = async () => {
      const data = await movieService.getCastOfMovie(movieId);
      if (data) {
        setActors(data.cast.slice(0, 15));
      }
    };
    const fetchMovie = async () => {
      const data = await movieService.findOneById(movieId);
      setMovie(data);
    };
    fetchActors();
    fetchMovie();
  }, []);

  const handleListStatus = () => {
    if (!isSaved) {
      saveMovie(db, movieId, false);
    } else {
      removeMovie(db, movieId);
    }
  };

  const handleWatchStatus = () => {
    if (isSaved) {
      if (isSaved.has_watched === 0) {
        setMovieAsWatched(db, movieId);
      } else {
        removeMovie(db, movieId);
      }
    } else {
      saveMovie(db, movieId, true);
    }
  };

  if (movie && actors) {
    const formattedReleaseDate = new Date(
      movie.release_date
    ).toLocaleDateString("fi-FI");
    const duration = convertMinutesToHours(movie.runtime);

    return (
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={styles.container}>
          <Text variant="titleMedium" style={styles.title}>
            {movie.title}
          </Text>
          <View style={styles.detailsContainer}>
            <Image
              source={{ uri: `${LARGE_POSTER_URL}/${movie.poster_path}` }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text variant="bodyMedium">"{movie.overview}"</Text>
              <Text variant="bodyMedium">
                Release date: {formattedReleaseDate}
              </Text>
              <Text variant="bodyMedium">
                Total duration: {duration.hours} hours {duration.minutes}{" "}
                minutes
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {(!isSaved || isSaved.has_watched === 0) && (
              <Button mode="contained" onPress={handleListStatus}>
                {!isSaved ? "Add to watchlist" : "Remove from watchlist"}
              </Button>
            )}
            <Button mode="contained" onPress={handleWatchStatus}>
              {!isSaved || isSaved.has_watched === 0
                ? "Mark as watched"
                : "Mark as unwatched"}
            </Button>
          </View>
          <ActorList actors={actors} />
        </View>
      </ScrollView>
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
  title: {
    alignSelf: "center",
  },
  textContainer: {
    flexShrink: 1,
    gap: 5,
  },
  image: {
    borderRadius: 1,
    width: 150,
    height: "auto",
    aspectRatio: 2 / 3,
  },
  buttonContainer: {
    gap: 10,
  },
});

export default MovieDetails;
