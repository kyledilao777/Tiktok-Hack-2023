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
import {
  LogOut,
  ShoppingCart,
  Search,
} from "lucide-react-native";

export default function ProductList() {
  const router = useRouter();
  const { user } = useAuth();
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

  const handleNavigation = (productName, uri) => {
    router.push({ pathname:"product", params:{ productName, uri }});
  };

  const displayedProducts = filteredProducts || products;

  const filteredDisplayProducts = displayedProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView className="flex flex-1 bg-black/80">
      <View className="flex flex-row items-center bg-slate-50 mx-4 my-2 rounded-lg h-10 mt-8">
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
              className="bg-bgred h-56 w-[156px] rounded-lg md:h-64 md:w-[160px] xl:h-[270px] xl:w-[180px] lg:w-[165px]"
              onPress={() => handleNavigation(product.productName, product.uri)}
            >
              <Image
                className="w-[156px] h-[180px] xl:h-[243px] xl:w-[190px] md:w-[160px] lg:w-[165px] lg:h-56 md:h-52 mx-auto rounded-t-lg"
                source={product.uri}
              />
              <View className="flex flex-row mt-1 justify-between px-3 lg:mt-3">
                <Text className="text-white font-lato text-[16px]">
                  {product.productName}
                </Text>
                <Text className="text-white font-lato text-[16px]"> 
                  ${product.price}
                </Text>
              </View>
              <View className="flex flex-row justify-between sm:mt-0.5">
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
