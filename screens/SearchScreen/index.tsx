import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./Search";
import MovieDetails from "../MovieDetails";
import { SearchScreenStackParamList } from "../../utils/types";

const Stack = createNativeStackNavigator<SearchScreenStackParamList>();

const SearchScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
};

export default SearchScreen;
