import { Stack } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { ShoppingCart, LogOut, ArrowLeft } from "lucide-react-native";
import { supabase } from "../../lib/supabase"
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
              fontWeight: "bold"
              },
          }}
      >
      <Stack.Screen name ="friend-list" options={{ headerShown:false }} />
      <Stack.Screen name ="group-purchase" options={{ headerShown:false }} />
      <Stack.Screen name ="index" options={{ 
          headerTitle:"", 
          headerLeft: () => (
            <Image
            className="w-24 h-7 mt-4 mr-auto"
            source={require("../../assets/whitetiktok.png")}
            />
          ),
          headerStyle: {
            backgroundColor: '#303030',
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View style={{ flex:1, flexDirection: "row", justifyContent: "flex-end", marginRight:40, marginTop:20}}>
              <TouchableOpacity style={{marginRight:20,}} onPress={() => router.push("view-cart")}>
                <ShoppingCart color="white" size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={ async () => { await supabase.auth.signOut();}}>
                <LogOut color="white" size={22} />
              </TouchableOpacity>
            </View>
          ),
        }} />
      <Stack.Screen name ="product" options={{ 
          headerTitle:"", 
          headerLeft: () => (
            <TouchableOpacity
              className="mt-6 mr-16"
              onPress={() => router.back()}
            >
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#303030',
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View style={{ flex:1, flexDirection: "row", justifyContent: "flex-end", marginRight:40, marginTop:20}}>
              <TouchableOpacity style={{marginRight:20}} onPress={() => router.push("view-cart")}>
                <ShoppingCart color="white" size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={ async () => { await supabase.auth.signOut();}}>
                <LogOut color="white" size={22} />
              </TouchableOpacity>
            </View>
          ),
        }} />
      <Stack.Screen name ="view-cart" options={{ headerShown:false }} />

      </Stack>
  );
}