import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import Home from "./screens/Home";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    </PaperProvider>
  );
}
