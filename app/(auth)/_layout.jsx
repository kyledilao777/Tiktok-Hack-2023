import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "login",
};

export default function AuthRoot() {
  return (
    <Stack screenOptions={{ headerShown: false, headerStyle:{backgroundColor: "#EE1D52"}, headerTintColor: "white"}}>
        
    </Stack>
  );
}
