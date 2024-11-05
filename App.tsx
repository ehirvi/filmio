import { NavigationContainer } from "@react-navigation/native";
import { Icon, PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListScreen from "./screens/ListScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = "";
              switch (route.name) {
                case "HomeScreen":
                  iconName = "home";
                  break;
                case "ListScreen":
                  iconName = "view-list";
                  break;
              }
              return <Icon source={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "grey"
          })}
        >
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Tab.Screen
            name="ListScreen"
            component={ListScreen}
            options={{ title: "Lists" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
