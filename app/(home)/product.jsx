import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  View,
} from "react-native";
import { Users, ShoppingBasket, PlusCircle } from "lucide-react-native";
import { supabase } from "../../lib/supabase";
import { useNavigation } from "expo-router";
import { useAuth } from "../../contexts/auth";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductList() {
  const router = useRoute();
  const navigation = useNavigation();
  const { productName, uri, price } = router.params;
  const { user } = useAuth();

  const handleSubmit = async () => {
    const { data: existingProducts, error } = await supabase
      .from("products")
      .select("id, name, quantity")
      .eq("name", productName);

    if (error) {
      console.error("Error while fetching products:", error);
      return;
    }

    if (existingProducts && existingProducts.length > 0) {
      const existingProduct = existingProducts[0];
      const newQuantity = existingProduct.quantity + 1;

      const { error: updateError } = await supabase
        .from("products")
        .update({ quantity: newQuantity })
        .eq("id", existingProduct.id);

      if (updateError) {
        console.error("Error while updating quantity:", updateError);
      }
    } else {
      // manually insert data in the database here for DEMO
      const { error: insertError } = await supabase.from("products").insert({
        name: productName,
        buyer: user.user_metadata.phone_number,
        quantity: 1,
        price: price,
        group: false,
      });

      if (insertError) {
        console.error("Error while inserting product:", insertError);
      }
    }

    Alert.alert("Added to Cart!", "", [{ text: "Ok" }]);
  };

  return (
    <SafeAreaView className="flex-1 bg-black/80">
      <View className="mt-4">
        <Image className="h-[500px] w-full mx-auto" source={uri} />

        <View className="flex flex-row justify-between bg-bgred py-4">
          <Text className="text-2xl  text-white font-lato pl-4">
            {productName}
          </Text>
          <Text className="text-2xl  text-white font-lato pr-4">${price}</Text>
        </View>
      </View>

      <View className="flex-row justify-center h-full rounded-b-lg bg-bgblack space-x-12 py-20">
        <TouchableOpacity className="items-center my-2" onPress={handleSubmit}>
          <PlusCircle color="#69C9D0" size={24} />
          <Text className="text-white font-calibri align-middle justify-center pl-1 mt-2">
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center my-2"
          onPress={() => navigation.navigate("friend-list")}
        >
          <Users color="white" size={24} />
          <Text className="text-white font-calibri align-middle justify-center pl-1 mt-2">
            Find Friends
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center my-2"
          onPress={() => navigation.navigate("group-purchase")}
        >
          <ShoppingBasket color="white" size={24} />
          <View className="flex-row mt-2">
            <Text className="text-white font-calibri"> Group Purchase</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
