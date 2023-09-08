import {
  TouchableOpacity,
  Text,
  Alert,
  Image,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useState } from "react";
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
  Search,
} from "lucide-react-native";

export default function ProductList() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [productName, setProductName] = useState("Hand Wash"); // ??
  const products = [
    {
      shopName: "Converse",
      productName: "Shoe",
      price: 15,
      uri: require("../../assets/shoes.jpeg"),
    },
    {
      shopName: "H&M",
      productName: "T-Shirt",
      price: 23,
      uri: require("../../assets/tshirt.jpeg"),
    },
    {
      shopName: "Zara",
      productName: "Jacket",
      price: 150,
      uri: require("../../assets/jacket.jpeg"),
    },
    {
      shopName: "Phatek Philippe",
      productName: "Watch",
      price: 4000,
      uri: require("../../assets/watch.jpeg"),
    },
    {
      shopName: "Apple",
      productName: "Airpods",
      price: 300,
      uri: require("../../assets/airpods.jpeg"),
    },
    {
      shopName: "Apple",
      productName: "M2 14-inch",
      price: 300,
      uri: require("../../assets/m2.jpeg"),
    },
    {
      shopName: "Apple",
      productName: "Casing",
      price: 10,
      uri: require("../../assets/casing.jpeg"),
    },
    {
      shopName: "Apple",
      productName: "iPad",
      price: 1500,
      uri: require("../../assets/ipad.jpeg"),
    },
    {
      shopName: "Logitech",
      productName: "Mouse",
      price: 40,
      uri: require("../../assets/mouse.jpeg"),
    },
    {
      shopName: "Samsung",
      productName: "Monitor",
      price: 200,
      uri: require("../../assets/monitor.jpeg"),
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(null);

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

  const handleNavigation = (productName, uri) => {
    navigation.navigate("product", { productName, uri });
  };

  const displayedProducts = filteredProducts || products;

  const filteredDisplayProducts = displayedProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <View className="flex flex-row items-center bg-slate-50 mx-4 my-2 rounded-lg h-10">
        <Search className="ml-4 text-gray-500" size={20} />
        <TextInput
          placeholderTextColor="gray"
          activeUnderlineColor={"transparent"}
          selectionColor="#69C9D0"
          className="h-10 rounded-lg bg-slate-50"
          placeholder="Search for products..."
          defaultValue={searchTerm}
          onChangeText={(newTerm) => setSearchTerm(newTerm)}
        />
      </View>

      <ScrollView className="m-4">
        <View
          style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 30 }}
          className="space-x-0 justify-between"
        >
          {filteredDisplayProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              className="bg-bgred h-56 w-[156px] rounded-lg sm:h-64 sm:w-[170px] md:h-[270px] md:w-[180px]"
              onPress={() => handleNavigation(product.productName, product.uri)}
            >
              <Image
                className="w-[156px] h-[180px] md:h-[243px] md:w-[190px] sm:w-[180px] sm:h-56 mx-auto rounded-t-lg"
                source={product.uri}
              />
              <View className="flex flex-row mt-1 justify-between px-3">
                <Text className="text-white font-lato text-[16px]">
                  {product.productName}
                </Text>
                <Text className="text-white font-lato text-[16px]">
                  <Text className="text-bgblue">$</Text>
                  {product.price}
                </Text>
              </View>
              <View className="flex flex-row justify-between mt-0.5">
                <Text className="text-slate-100 text-[12px] font-regencie pl-3">
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
