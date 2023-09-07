import {
  TouchableOpacity,
  Text,
  Alert,
  Image,
  View,
  ScrollView,
} from "react-native";
import {
  LogOut,
  ShoppingCart,
  Users,
  ShoppingBasket,
} from "lucide-react-native";
import { supabase } from "../lib/supabase";

export default function CustomHeader() {
  return (
    <View className="h-16 bg-bgred">
      <View className="flex flex-row mt-1 justify-between mx-4">
        <TouchableOpacity className="mt-6" onPress={handleCart}>
          <ShoppingCart color="white" size={22} />
        </TouchableOpacity>
        <Image
          className="w-24 h-7 mt-5"
          source={require("assets/whitetiktok.png")}
        />
        <TouchableOpacity
          className="mt-6"
          onPress={async () => {
            await supabase.auth.signOut();
          }}
        >
          <LogOut color="white" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
