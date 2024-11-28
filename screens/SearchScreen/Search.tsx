import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Movie, MovieSearchResult } from "../../utils/types";
import searchService from "../../services/searchService";
import MovieList from "../../components/MovieList";

const Search = () => {
  const [textInput, setTextInput] = useState("");
  const page = useRef(1);
  const [searchResults, setSearchResults] = useState<MovieSearchResult>();

  useEffect(() => {
    const timeoutId = setTimeout(() => void fetchResults(textInput), 1000);
    return () => clearTimeout(timeoutId);
  }, [textInput]);

  const fetchResults = async (query: string) => {
    const res = await searchService.getResultPage(query, page.current);
    setSearchResults(res);
  };

  const handleSearch = (text: string) => {
    setTextInput(text);
  };

  return (
    <View>
      <Searchbar
        mode="view"
        elevation={4}
        loading={false}
        placeholder="Type..."
        value={textInput}
        onChangeText={(text) => handleSearch(text)}
      />
      {searchResults && <MovieList movies={searchResults.results} />}
    </View>
  );
};

export default Search;
