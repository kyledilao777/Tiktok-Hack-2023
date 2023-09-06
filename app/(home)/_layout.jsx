import { Stack } from "expo-router";

export default function HomeScreen() {
    return (
        <Stack screenOptions={{ headerShown: true, headerTintColor: "white", headerStyle: {backgroundColor: "#EE1D52"}}}>
            <Stack.Screen name="index" options={{ title: "Main Page" }} />
            <Stack.Screen name="list" options={{ title: "Friend List" }} />

        </Stack>
    );
}
