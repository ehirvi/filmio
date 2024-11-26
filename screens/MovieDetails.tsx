import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import movieService from "../services/movieService";
import { Actor, ListScreenStackParamLst, Movie } from "../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LARGE_POSTER_URL } from "../utils/constants";
import { convertMinutesToHours } from "../utils/helpers";
import { Button } from "react-native-paper";
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
  const updateWatchStatus = useMovieStore((state) => state.updateWatchStatus);
  const [actors, setActors] = useState<Actor[]>();
  const [movie, setMovie] = useState<Movie>();
  const db = useSQLiteContext();

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
        updateWatchStatus(db, isSaved, true);
      } else {
        removeMovie(db, movieId);
      }
    }
  };

  if (movie && actors) {
    const formattedReleaseDate = new Date(
      movie.release_date
    ).toLocaleDateString("en-GB");
    const duration = convertMinutesToHours(movie.runtime);

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.detailsContainer}>
            <Image
              source={{ uri: `${LARGE_POSTER_URL}/${movie.poster_path}` }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text>"{movie.overview}"</Text>
              <Text>Release date: {formattedReleaseDate}</Text>
              <Text>
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
            {/* <Button mode="contained">
              {isSaved === undefined
                ? "Add to watchlist"
                : isSaved.has_watched === 0
                ? "Remove from watchlist"
                : "Mark as unwatched"}
            </Button>
            {isSaved && isSaved.has_watched === 0 && (
              <Button mode="contained">Mark as watched</Button>
            )} */}
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
    width: 150,
    height: "auto",
    aspectRatio: 2 / 3,
  },
  buttonContainer: {
    gap: 10,
  },
});

export default MovieDetails;
