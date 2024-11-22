import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lists from "./Lists";
import { ListScreenStackParamLst } from "../../utils/types";
import MovieDetails from "../MovieDetails";

const Stack = createNativeStackNavigator<ListScreenStackParamLst>();

const ListScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lists"
        component={Lists}
        options={{ title: "My Lists" }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
};

export default ListScreen;
