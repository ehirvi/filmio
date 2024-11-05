import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lists from "./Lists";

const Stack = createNativeStackNavigator();

const ListScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lists"
        component={Lists}
        options={{ title: "My Lists" }}
      />
    </Stack.Navigator>
  );
};

export default ListScreen;
