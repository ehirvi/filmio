import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Searchbar, useTheme } from "react-native-paper";
import { MovieSearchResult } from "../../utils/types";
import searchService from "../../services/searchService";
import MovieList from "../../components/MovieList";

const Search = () => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const [searchResultMovies, setSearchResultMovies] =
    useState<MovieSearchResult["results"]>();
  const [searchResultPages, setSearchResultPages] =
    useState<MovieSearchResult["total_pages"]>();
  const theme = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (textInput.length === 0) {
        setSearchResultMovies(undefined);
        setSearchResultPages(undefined);
      } else {
        void fetchResults(textInput);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [textInput]);

  const fetchResults = async (query: string) => {
    setLoading(true);
    const res = await searchService.getResultPage(query, page.current);
    const sortedMovies = [...res.results].sort(
      (a, b) => b.vote_count - a.vote_count
    );
    setLoading(false);
    setSearchResultMovies(sortedMovies);
    setSearchResultPages(res.total_pages);
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
      {searchResultMovies && searchResultPages && searchResultPages > 0 && (
        <MovieList movies={searchResultMovies} />
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
});

export default Search;
