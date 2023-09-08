import { Stack } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { ShoppingCart, LogOut, ArrowLeft } from "lucide-react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="friend-list"
        options={{
          headerTitle: "Find friends",
          headerTintColor: "#FFF",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#303030",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View className="mr-0 flex flex-row">
              <TouchableOpacity
                className="mr-5"
                onPress={() => router.push("view-cart")}
              >
                <ShoppingCart color="white" size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await supabase.auth.signOut();
                }}
              >
                <LogOut color="white" size={22} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="group-purchase"
        options={{
          headerTitle: "Group Purchase",
          headerTintColor: "#FFF",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#303030",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View className="mr-0 flex flex-row">
              <TouchableOpacity
                className="mr-5"
                onPress={() => router.push("view-cart")}
              >
                <ShoppingCart color="white" size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await supabase.auth.signOut();
                }}
              >
                <LogOut color="white" size={22} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <Image
              className="w-24 h-7 mt-1 mr-auto"
              source={require("../../assets/whitetiktok.png")}
            />
          ),
          headerStyle: {
            backgroundColor: "#303030",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View className=" mr-0 flex flex-row">
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => router.push("view-cart")}
              >
                <ShoppingCart color="white" size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await supabase.auth.signOut();
                }}
              >
                <LogOut color="white" size={22} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="product"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#010101",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View className="mr-0 flex flex-row">
              <TouchableOpacity
                className="mr-5"
                onPress={() => router.push("view-cart")}
              >
                <ShoppingCart color="white" size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await supabase.auth.signOut();
                }}
              >
                <LogOut color="white" size={22} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="view-cart"
        options={{
          headerTitle: "Your Cart",
          headerTintColor: "#fff",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#303030",
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View className="mr-0 flex flex-row">
              <TouchableOpacity
                onPress={async () => {
                  await supabase.auth.signOut();
                }}
              >
                <LogOut color="white" size={22} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
