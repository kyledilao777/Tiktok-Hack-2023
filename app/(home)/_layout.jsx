import { Stack } from "expo-router";

export default function HomeScreen() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="list" options={{ title: "Friend List" }} />
        </Stack>
    );
}
