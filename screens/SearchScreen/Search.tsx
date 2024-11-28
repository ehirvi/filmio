import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import { MovieSearchResult } from "../../utils/types";
import searchService from "../../services/searchService";
import MovieList from "../../components/MovieList";

const Search = () => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const [searchResultMovies, setSearchResultMovies] =
    useState<MovieSearchResult["results"]>();
  const theme = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (textInput.length === 0) {
        setSearchResultMovies(undefined);
      } else {
        void fetchResults(textInput);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [textInput]);

  const fetchResults = async (query: string) => {
    setLoading(true);
    const res = await searchService.getResultPage(query, page.current);
    if (res) {
      const sortedMovies = [...res.results].sort(
        (a, b) => b.vote_count - a.vote_count
      );
      setLoading(false);
      setSearchResultMovies(sortedMovies);
    }
  };

  const handleSearch = (text: string) => {
    setTextInput(text);
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Searchbar
        style={styles.searchBar}
        placeholder="Search for any movie..."
        value={textInput}
        onChangeText={(text) => handleSearch(text)}
      />
      {loading && (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          animating={loading}
        />
      )}
      {searchResultMovies && searchResultMovies.length > 0 && (
        <MovieList movies={searchResultMovies} />
      )}
      {searchResultMovies && searchResultMovies.length === 0 && (
        <Text variant="bodyLarge" style={{ ...styles.text }}>
          No results were found
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 10,
  },
  loadingIndicator: {
    margin: "auto",
  },
  text: {
    alignSelf: "center",
  },
});

export default Search;
