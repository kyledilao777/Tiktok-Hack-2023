import {
  TouchableOpacity,
  Text,
  Alert,
  Image,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import {
  LogOut,
  ShoppingCart,
  Users,
  ShoppingBasket,
} from "lucide-react-native";

export default function ProductList() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [productName, setProductName] = useState("Hand Wash");
  const [products, setProducts] = useState([
    { shopName: "asic", productName: "evan", price: 15 },
    { shopName: "ucok", productName: "banana", price: 23 },
    { shopName: "ew", productName: "xerud", price: 69 }
  ]);

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
    router.push("Checkout/indivcart");
  };

  const handleSearch = () => {
    products.filter((product) =>
      product.productName.includes(search.toLowerCase())
    );
  };

  return (
    <ScrollView className="align-middle flex-1 bg-black/80">
      <View className="h-16 bg-bgred">
        <View className="flex flex-row mt-1 justify-between mx-4">
          <TouchableOpacity className="mt-6" onPress={handleCart}>
            <ShoppingCart color="white" size={22} />
          </TouchableOpacity>
          <Image
            className="w-24 h-7 mt-5"
            source={require("../../assets/whitetiktok.png")}
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

      <View className="m-4">
        <TextInput className="h-12"></TextInput>
        <View className="flex-row justify-center rounded-b-lg bg-bgblue space-x-12 py-2">
          <View className="">
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                marginTop: 10,
                borderColor: "#69C9D0",
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
              <Users color="white" size={24} />
              <Text className="text-white font-calibri align-middle justify-center pl-1 mt-2">
                {" "}
                Find Friends{" "}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                marginTop: 10,
                borderColor: "#69C9D0",
                borderWidth: 2,
                paddingHorizontal: 5,
                paddingVertical: 2,
                width: 95,
              }}
              className="text-white"
              onPress={handleCart}
            >
              <ShoppingBasket color="white" size={24} />
              <View className="flex-row mt-2">
                <Text className="text-white font-calibri"> Group </Text>
                <Text className="text-white font-calibri">Purchase</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="grid grid-cols-2 gap-4 m-0">
        {products.map((product, index) => (
            <View key={index} className="bg-bgblue h-44 w-40 rounded-lg">
                <Image
                    className="w-[62px] h-[97px] mx-auto"
                    source={require("../../assets/ucok.png")}
                />
                <View className="flex flex-row mt-1 justify-between">
                    <Text className="text-white font-lato">
                    {product.productName}
                    </Text>
                    <Text className="text-white font-lato">{product.price}</Text>
                </View>
                <View className="flex flex-row mt-1 justify-between">
                    <Text className="text-white text-md font-lato">
                    {product.shopName}
                    </Text>
                </View>  
            </View>
      ))}
      </View>

    </ScrollView>
  );
}