import { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/auth";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function IndivCheckout() {
  const router = useRouter();
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

  return (
    <View className="flex-1 bg-black/80">
      <View className="justify-center align-middle" style={styles.header}>
        <Text className="text-white font-lato text-lg mt-4">Items Ordered</Text>
      </View>
      <View className="mt-10">
        <View style={styles.product} className="">
          <View style={styles.productInfo}>
            <Text
              className="text-white font-lato"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Products
            </Text>
          </View>
          <View style={styles.groupOrder}>
            <Text
              className="text-white font-lato mr-7"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Quantity
            </Text>
          </View>
          <View style={styles.quantityOrdered}>
            <Text
              className="text-white font-lato"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Total Price
            </Text>
          </View>
        </View>
        {ownProducts.map((product, index) => (
          <View key={index} style={styles.product}>
            <View style={styles.productInfo}>
              <Text className="text-white font-lato mt-3">{product.name}</Text>
            </View>
            <View style={styles.groupOrder}>
              <Text className="text-white font-lato mt-3">
                {product.quantity}
              </Text>
            </View>
            <View style={styles.payment}>
              <Text className="text-white font-lato ml-5 mt-3">
                ${product.quantity * product.price}
              </Text>
            </View>
          </View>
        ))}
        <View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 20,
              borderColor: "#69C9D0",
              borderWidth: 2,

              paddingHorizontal: 5,
              paddingVertical: 2,
              width: 95,
              backgroundColor: "#69C9D0",
            }}
            onPress={handleOwnPay}
          >
            <Text className="text-white font-lato"> Pay </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-10">
        <View style={styles.header2}>
          <Text className="text-white font-lato text-lg">
            {" "}
            Pending Group Order Purchase
          </Text>
        </View>

        <View className="mt-10">
          <View style={styles.product}>
            <View style={styles.productInfo}>
              <Text
                className="text-white font-lato"
                style={{ fontWeight: "bold" }}
              >
                Products
              </Text>
            </View>
            <View style={styles.groupOrder}>
              <Text
                className="text-white font-lato mr-7"
                style={{ fontWeight: "bold" }}
              >
                Quantity
              </Text>
            </View>
            <View style={styles.quantityOrdered}>
              <Text
                className="text-white font-lato"
                style={{ fontWeight: "bold" }}
              >
                Total Price
              </Text>
            </View>
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
                <Text className="text-white font-lato ml-5 mt-3">
                  ${product.quantity * product.price}
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 20,
              borderColor: "#69C9D0",
              borderWidth: 2,
              paddingHorizontal: 5,
              paddingVertical: 2,
              width: 95,
              backgroundColor: "#69C9D0",
            }}
            onPress={handleGroupPay}
          >
            <Text className="text-white font-lato"> Pay </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  header2: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  product: {
    flexDirection: "row",
  },
  productInfo: {
    flex: 1,
  },
  groupOrder: {
    flex: 0.5,
    alignItems: "center",
    marginRight: 50,
  },
  payment: {
    flex: 0.5,
    alignItems: "center",
    marginRight: 10,
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
