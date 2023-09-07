import {
  TouchableOpacity,
  Text,
  Alert,
  Image,
  View,
  SafeAreaView,
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
    { shopName: "asic", productName: "Evan", price: 15, uri: require("../../assets/shoes.jpeg")},
    { shopName: "ucok", productName: "Banana", price: 23, uri: require("../../assets/shoes.jpeg")},
    { shopName: "ew", productName: "Xerud", price: 69, uri: require("../../assets/shoes.jpeg")},
    { shopName: "eheh", productName: "Xerud", price: 69, uri: require("../../assets/shoes.jpeg")},
    {shopName: "kemme", productName: "Xerud", price: 69, uri: require("../../assets/shoes.jpeg")}
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
    router.push("checkout/indivcart");
  };

  const handleSearch = () => {
    products.filter((product) =>
      product.productName.includes(search.toLowerCase())
    );
  };

  

  return (
    <SafeAreaView className="flex flex-1 bg-black/80">
      <View className="h-16">
        <View className="flex flex-row justify-end mx-4">
        <Image
            className="w-24 h-7 mt-5 mr-auto"
            source={require("../../assets/whitetiktok.png")}
          />
          <View className="flex flex-row">
          
            <TouchableOpacity className="mt-6 mr-4" onPress={handleCart}>
                <ShoppingCart color="white" size={22} />
            </TouchableOpacity>
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
      </View>

      <View className="m-4">
        <TextInput className="h-12"></TextInput>
        <View className="flex-row justify-center rounded-b-lg bg-bgred space-x-20 py-2">
          <View className="">
            <TouchableOpacity
              className="items-center my-2"
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
              className="items-center my-2"
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
      <ScrollView className="m-4">
      <View style={{flex: 1, flexDirection:"row", flexWrap:"wrap", gap: 30}} className="space-x-0 justify-between">
        {products.map((product, index) => (
            <TouchableOpacity key={index} className="bg-bgblack/50 justify-center h-56 w-[156px] rounded-lg sm:h-64 sm:w-[170px] md:h-[270px] md:w-[180px]">
              <Image
                      className="w-[156px] sm:w-[170px] h-[180px] md:w-[180px] mx-auto rounded-t-lg"
                      source={product.uri}
                  />
                
                  <View className="flex flex-row mt-1 justify-between px-3">
                      <Text className="text-white font-lato text-[18px]">
                      {product.productName}
                      </Text>
                      <Text className="text-white font-lato text-[18px]">${product.price}</Text>
                  </View>
                  <View className="flex flex-row mt-1 justify-between">
                      <Text className="text-slate-300 text-md font-regencie px-3 pb-1">
                      {product.shopName}
                      </Text>
                  </View>
            
            </TouchableOpacity>
      ))}
      </View>
      </ScrollView>

    </SafeAreaView>
  );
}

