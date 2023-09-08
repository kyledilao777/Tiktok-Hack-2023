import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useNavigation } from "expo-router";

export default function IndivCheckout() {
  const navigation = useNavigation();
  const [ownProducts, setOwnProducts] = useState([]);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: indivProducts, error } = await supabase
          .from("products")
          .select("name, quantity, price")
          .eq("group", false);

        if (error) {
          console.error("Error while fetching products:", error);
          return;
        }

        setOwnProducts(indivProducts);
      } catch (error) {
        console.error("Error during fetchProducts:", error);
      }
    };

    const fetchGroup = async () => {
      try {
        const { data: groupPurchase, error } = await supabase
          .from("products")
          .select("name, quantity, price")
          .eq("group", true);

        if (error) {
          console.error("Error while fetching group products:", error);
          return;
        }

        setGroup(groupPurchase);
      } catch (error) {
        console.error("Error during fetchGroup:", error);
      }
    };

    fetchProducts();
    fetchGroup();
  }, []);

  const totalPrice = ownProducts.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  const handleOwnPay = async () => {
    if (ownProducts && ownProducts.length > 0) {
      try {
        for (const product of ownProducts) {
          const { error: updateError } = await supabase
            .from("products")
            .update({ status: true })
            .eq("name", product.name);

          if (updateError) {
            console.error("Error while updating status:", updateError);
          }
        }
      } catch (error) {
        console.error("Error during group pay:", error);
      }
    }
  };

  const handleGroupPay = async () => {
    if (group && group.length > 0) {
      try {
        for (const product of group) {
          const { error: updateError } = await supabase
            .from("products")
            .update({ status: true })
            .eq("name", product.name);

          if (updateError) {
            console.error("Error while updating status:", updateError);
          }
        }
      } catch (error) {
        console.error("Error during group pay:", error);
      }
    }
  };

  const goBackToMainPage = () => {
    navigation.navigate("index");
  };

  return (
    <View className="flex-1 bg-black/80">
      <ScrollView>
        <View className="bg-neutral-600 m-3 rounded-lg">
          <View className="m-2 p-2">
            <View className="flex flex-row justify-between">
              <Text className="font-lato text-lg text-white">Product</Text>
              <Text className="font-lato text-lg text-white">Quantity</Text>
              <Text className="font-lato text-lg text-white">Total Price</Text>
            </View>
            {ownProducts.map((product, index) => (
              <View
                key={index}
                style={styles.product}
                className="justify-between"
              >
                <View style={styles.productInfo}>
                  <Text className="text-white font-lato mt-3">
                    {product.name}
                  </Text>
                </View>
                <View style={styles.groupOrder}>
                  <Text className="text-white font-lato mt-3">
                    {product.quantity}
                  </Text>
                </View>
                <View style={styles.payment}>
                  <Text className="text-white font-lato ml-8 mt-3">
                    ${product.quantity * product.price}
                  </Text>
                </View>
              </View>
            ))}
            <View>
              <TouchableOpacity
                className="rounded-md w-24 h-6 flex-end mt-5"
                style={{
                  alignSelf: "flex-end",
                  borderColor: "#EE1D52",
                  backgroundColor: "#EE1D52",
                }}
                onPress={handleOwnPay}
              >
                <Text className="text-white font-calibri item-center mx-auto my-auto">
                  Pay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.header2}>
          <Text className="text-white font-calibri text-xl">
            Pending Group Order Purchase
          </Text>
        </View>

        <View className="bg-neutral-600 m-3 rounded-lg">
          <View className="m-2 p-2">
            <View className="flex flex-row justify-between">
              <Text className="font-lato text-lg text-white">Product</Text>
              <Text className="font-lato text-lg text-white">Quantity</Text>
              <Text className="font-lato text-lg text-white">Total Price</Text>
            </View>
            {group.map((product, index) => (
              <View key={index} style={styles.product}>
                <View style={styles.productInfo}>
                  <Text className="text-white font-lato mt-3">
                    {product.name}
                  </Text>
                </View>
                <View style={styles.groupOrder}>
                  <Text className="text-white font-lato mt-3">
                    {product.quantity}
                  </Text>
                </View>
                <View style={styles.payment}>
                  <Text className="text-white font-lato ml-8 mt-3">
                    ${product.quantity * product.price}
                  </Text>
                </View>
              </View>
            ))}
            <View>
              <TouchableOpacity
                className="rounded-md w-24 h-6 flex-end mt-5"
                style={{
                  alignSelf: "flex-end",
                  borderColor: "#EE1D52",
                  backgroundColor: "#EE1D52",
                }}
                onPress={handleGroupPay}
              >
                <Text className="text-white font-calibri item-center mx-auto my-auto">
                  Pay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  header2: {
    marginTop: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  product: {
    flexDirection: "row",
  },
  productInfo: {
    flex: 1,
    color: "black",
  },
  groupOrder: {
    flex: 0.5,
    alignItems: "center",
    marginRight: 50,
  },
  payment: {
    flex: 0.5,
    alignItems: "flex-end",
    marginRight: 34,
  },
  button: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },
  totalPrice: {
    marginTop: 30,
    alignItems: "flex-end",
    marginRight: 20,
  },
});
