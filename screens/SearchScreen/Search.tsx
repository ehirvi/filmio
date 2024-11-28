import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { MovieSearchResult } from "../../utils/types";
import searchService from "../../services/searchService";
import MovieList from "../../components/MovieList";

const Search = () => {
  const [textInput, setTextInput] = useState("");
  const page = useRef(1);
  const [searchResultMovies, setSearchResultMovies] =
    useState<MovieSearchResult["results"]>();
  const [searchResultPages, setSearchResultPages] =
    useState<MovieSearchResult["total_pages"]>();

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
    const res = await searchService.getResultPage(query, page.current);
    const sortedMovies = [...res.results].sort(
      (a, b) => b.vote_count - a.vote_count
    );
    setSearchResultMovies(sortedMovies);
    setSearchResultPages(res.total_pages);
  };

  const handleSearch = (text: string) => {
    setTextInput(text);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        mode="view"
        loading={false}
        placeholder="Type..."
        value={textInput}
        onChangeText={(text) => handleSearch(text)}
      />
      {searchResultMovies && searchResultPages && searchResultPages > 0 && (
        <MovieList movies={searchResultMovies} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default Search;
