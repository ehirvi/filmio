import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreenStackParamlist } from "../../utils/types";
import GenreSelector from "./GenreSelector";
import MovieSwiper from "./MovieSwiper";
import { useEffect } from "react";
import useMovieStore from "../../hooks/useStore";
import { useSQLiteContext } from "expo-sqlite";

const Stack = createNativeStackNavigator<HomeScreenStackParamlist>();

const HomeScreen = () => {
  const db = useSQLiteContext();
  const getSavedMovies = useMovieStore((state) => state.getSavedMovies);

  useEffect(() => {
    getSavedMovies(db);
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GenreSelector"
        component={GenreSelector}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="MovieSwiper"
        component={MovieSwiper}
        options={{ title: "Recommended for you" }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
