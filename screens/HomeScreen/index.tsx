import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreenStackParamlist } from "../../utils/types";
import GenreSelector from "./GenreSelector";
import MovieSwiper from "./MovieSwiper";

const Stack = createNativeStackNavigator<HomeScreenStackParamlist>();

const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="GenreSelector">
      <Stack.Screen
        name="GenreSelector"
        component={GenreSelector}
        options={{ title: "Select genres" }}
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
