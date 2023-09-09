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
      <View className="m-4">
        <ScrollView>
          <View className="ml-4">
            <Text className="text-white font-calibri text-xl">
              Individual Order
            </Text>
          </View>
          <View className="m-4 space-y-4">
            {ownProducts.map((product, index) => (
              <View
                key={index}
                className="justify-between items-center flex flex-row bg-neutral-600 rounded-lg p-4"
              >
                <View>
                  <Text className="text-white font-lato text-lg">
                    {product.name}
                  </Text>
                  <Text className="text-white font-lato mt-4 text-[16px]">
                    Quantity: {product.quantity}
                  </Text>
                </View>
                <View className="">
                  <Text className="text-white font-lato self-end text-lg">
                    ${product.quantity * product.price}
                  </Text>
                  <View>
                    <TouchableOpacity
                      className="rounded-md w-[90px] h-6 flex-end mt-4"
                      style={{
                        alignSelf: "flex-end",
                        borderColor: "#EE1D52",
                        backgroundColor: "#EE1D52",
                      }}
                      onPress={handleOwnPay}
                    >
                      <Text className="text-white font-calibri item-center mx-auto my-auto text-[16px]">
                        Pay
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View className="ml-4 mt-8">
            <Text className="text-white font-calibri text-xl">
              Pending Group Purchase
            </Text>
          </View>

          <View className="m-4 space-y-4">
            {group.map((product, index) => (
              <View
                key={index}
                className="justify-between items-center flex flex-row bg-neutral-600 rounded-lg p-4"
              >
                <View>
                  <Text className="text-white font-lato text-lg">
                    {product.name}
                  </Text>
                  <Text className="text-white font-lato mt-4 text-[16px]">
                    Quantity: {product.quantity}
                  </Text>
                </View>
                <View>
                  <Text className="text-white font-lato self-end text-lg">
                    ${product.quantity * product.price}
                  </Text>
                  <View>
                    <TouchableOpacity
                      className="rounded-md w-[90px] h-6 flex-end mt-4"
                      style={{
                        alignSelf: "flex-end",
                        borderColor: "#EE1D52",
                        backgroundColor: "#EE1D52",
                      }}
                      onPress={handleGroupPay}
                    >
                      <Text className="text-white font-calibri text-[16px] item-center mx-auto my-auto">
                        Pay
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
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
    alignItems: "flex-start",
    marginRight: 36,
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
