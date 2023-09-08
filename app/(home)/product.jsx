import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  View,
} from "react-native";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/auth";
import { useRoute } from "@react-navigation/native";

export default function ProductList() {
  const router = useRoute();
  const { productName, uri } = router.params;
  const { user } = useAuth();
  const [productName2, setProductName] = useState("Hand Wash");

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
        price: 8,
        group: false,
      });

      if (insertError) {
        console.error("Error while inserting product:", insertError);
      }
    }

    Alert.alert("Added to Cart!", "", [{ text: "Ok" }]);
  };

  const handleCart = async () => {
    router.push("checkout/indivcart");
  };

  console.log(productName);

  return (
    <SafeAreaView className="justify-center align-middle flex-1 bg-black/80">
      <View className="">
        <View className="">
          <Image className="w-[200px] h-[400px] mx-auto" source={uri} />
        </View>

        <View>
          <Text className="text-xl  text-white font-calibri">
            {" "}
            {productName}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-center ml-7">
        <View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 10,
              borderColor: "white",
              borderWidth: 2,
              paddingHorizontal: 5,
              paddingVertical: 2,
              width: 95,
            }}
            onPress={() =>
              router.push({
                pathname: "list",
                params: { productName: productName },
              })
            }
          >
            <Text className="text-white font-calibri align-middle justify-center pl-1">
              {" "}
              Find friends{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 10,
              borderColor: "white",
              borderWidth: 2,
              paddingHorizontal: 5,
              paddingVertical: 2,
              width: 95,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleSubmit}
          >
            <Text className="text-white font-calibri"> Add to Cart </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 10,
              borderColor: "white",
              borderWidth: 2,
              paddingHorizontal: 5,
              paddingVertical: 2,
              width: 95,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "",
            }}
            className="text-white"
            onPress={handleCart}
          >
            <Text className="text-white font-calibri"> View Cart </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            marginRight: 20,
            marginTop: 10,
            borderColor: "white",
            borderWidth: 2,
            paddingHorizontal: 5,
            paddingVertical: 2,
            width: 95,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 251,
          }}
          onPress={async () => {
            await supabase.auth.signOut();
          }}
        >
          <Text className="text-white font-calibri">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
