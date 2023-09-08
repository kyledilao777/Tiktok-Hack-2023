import { Tabs } from "expo-router";

export default function HomeScreen() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Todos" }} />
      <Tabs.Screen
        name="indivcart"
        options={{ headerShown: false, title: "Cart" }}
      />
      <Tabs.Screen name="profile" options={{ title: "Checkout" }} />
    </Tabs>
  );
}
