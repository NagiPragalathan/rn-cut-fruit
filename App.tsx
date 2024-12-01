import "./global.css";
import React from "react";
import HomestayPage from "./kitchensink-components/HomestayPage"; // Your Home screen component
import { SafeAreaView, Button, Text } from "react-native";
import { GluestackUIProvider } from "./components/ui";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileEdit from './kitchensink-components/profile/EditProfile';
// Default theme setting
let defaultTheme: "dark" | "light" = "light";

Linking.getInitialURL().then((url: any) => {
  let { queryParams } = Linking.parse(url) as any;
  defaultTheme = queryParams?.iframeMode ?? defaultTheme;
});

// Theme Context setup
type ThemeContextType = {
  colorMode?: "dark" | "light";
  toggleColorMode?: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

// Create a Stack Navigator
const Stack = createStackNavigator();

// HomeScreen component
const   HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")} // Navigate to Details page
      />
    </SafeAreaView>
  );
};

// Main App Component
export default function App() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(defaultTheme);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      <NavigationContainer>
        <GluestackUIProvider mode={colorMode}>
          <SafeAreaView
            style={{
              backgroundColor: colorMode === "light" ? "#E5E5E5" : "#262626",
            }}
          />
          <SafeAreaView
            style={{
              backgroundColor: colorMode === "light" ? "#FFFFFF" : "#171717",
              flex: 1,
            }}
          >
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: colorMode === "light" ? "#E5E5E5" : "#262626",
                },
                headerTintColor: colorMode === "light" ? "#000" : "#fff",
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Details" options={{headerShown:false}} component={ProfileEdit} />
            </Stack.Navigator>
          </SafeAreaView>
        </GluestackUIProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
