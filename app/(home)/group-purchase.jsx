import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button, Modal } from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { X, PlusCircle } from "lucide-react-native";

export default function GroupBuyPage() {
  const minimumOrder = 50;
  const newUserDiscount = 0.9;
  const groupOrderDiscount = 0.95;
  const router = useRoute();
  const route = useRouter();
  const { productName, price } = router.params;
  const [quantity, setQuantity] = useState(1);
  const [currentProductPrice, setOutputValue] = useState(price);
  const [currentGroup, setCurrentGroup] = useState([
    {
      first_name: "You",
      // details: "Owner",
      quantity: quantity,
      new_user: false,
    },
  ]);
  const [accounts, setUsers] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("first_name, connection_type, new_user");
        if (error) {
          console.error("Error while fetching profiles:", error);
          return;
        }
        setUsers(profiles);
      } catch (error) {
        console.error("Error during fetchProfiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const { data: discount, error } = await supabase
          .from("discounts")
          .select("discount_name, discount_multiplier");
        if (error) {
          console.error("Error while fetching discounts:", error);
          return;
        }
        setDiscounts(discount);
      } catch (error) {
        console.error("Error during fetchDiscounts:", error);
      }
    };

    fetchDiscounts();
  }, []);

  useEffect(() => {
    const setDiscounted = async () => {
      if (quantity === 50) {
        setOutputValue(currentProductPrice * groupOrderDiscount);
      } else {
        setOutputValue(currentProductPrice);
      }
    };

    setDiscounted();
  }, [quantity]);

  useEffect(() => {
    const setNewUserDiscount = async () => {
      if (newUserPresent) {
        setOutputValue(currentProductPrice * newUserDiscount);
      } else {
        setOutputValue(currentProductPrice);
      }
    };

    setNewUserDiscount();
  }, [newUserPresent]);

  const decreaseQuantity = (i) => {
    setQuantity(quantity - 1);
    currentGroup[i].quantity = quantity + 1;
  };

  const increaseQuantity = (i) => {
    setQuantity(quantity + 1);
    currentGroup[i].quantity = quantity + 1;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const newUserPresent = currentGroup.some((item) => item.new_user === true);
  // const isInvited = async (user) =>
  //   currentGroup.some((item) => item.first_name === user.first_name);

  const handleSubmit = async () => {
    const { error } = await supabase.from("products").insert({
      name: productName,
      buyer: user.user_metadata.phone_number,
      quantity: quantity,
      price: price,
      group: true,
    });
    route.push("view-cart");
  };

  return (
    <ScrollView className="bg-bgblack/80 flex-1 ">
      <View className="m-8">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-white text-3xl font-lato">{productName}</Text>
          <Text className="text-white font-lato text-3xl">${price}</Text>
        </View>

        <Text className="text-white mt-4">
          Group purchase for this product has a minimum order units of{" "}
          {minimumOrder}
        </Text>

        <View className="mt-16">
          <Text className="text-white font-lato text-2xl">Your group</Text>
        </View>
        <TouchableOpacity
          className="items-center flex flex-row space-x-2 my-4"
          onPress={toggleModal}
        >
          <PlusCircle className="text-bgred" size={24} />
          <Text className="text-white text-lg pb-1">Invite friends</Text>
        </TouchableOpacity>

        <View className="mb-2.5">
          {currentGroup.map((item, index) => (
            <View key={index}>
              <View className="flex flex-row justify-between my-4 ">
                <Text className="text-white text-lg">{item.first_name}</Text>
                <Text className="text-white text-lg">{item.details}</Text>
                <View className="flex flex-row items-center space-x-4">
                  <TouchableOpacity
                    disabled={item.quantity <= 1}
                    className="w-10 h-8 bg-neutral-400 rounded-lg"
                    onPress={decreaseQuantity(index)}
                  >
                    <Text className="text-white mx-auto text-2xl">-</Text>
                  </TouchableOpacity>
                  <Text className="text-white font-lato">{item.quantity}</Text>
                  <TouchableOpacity
                    className="w-10 h-8 bg-bgred rounded-lg"
                    onPress={increaseQuantity(index)}
                  >
                    <Text className="text-white mx-auto text-xl">+</Text>
                  </TouchableOpacity>
                </View>
                <Text className="text-white text-lg">
                  ${Math.round(item.quantity * currentProductPrice, 2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="w-full h-0.5 bg-white"></View>
        <Text className="text-white mt-4">
          Rewards: {"\n"}
          Invite one new user for an additional 10% discount! {"\n"}
          Spend over $100 for an additional 5% discount!
        </Text>

        <View className="flex flex-row justify-end space-x-4">
          {quantity >= minimumOrder && (
            <Button
              className="text-white bg-bgred mt-8 rounded-lg"
              mode="contained"
              onPress={handleSubmit}
            >
              Confirm Order
            </Button>
          )}
        </View>

        <Modal
          visible={isModalVisible}
          onDismiss={toggleModal}
          dismissable={false}
        >
          <View className="bg-neutral-600 rounded-lg mt-32">
            <View className="m-4 ">
              <View className="flex flex-row justify-between">
                <Text className="font-bold font-lato text-2xl text-white">
                  Invite Your Friends!
                </Text>

                <TouchableOpacity
                  className="w-6 self-end mb-1"
                  mode="contained"
                  onPress={toggleModal}
                >
                  <X size={22} color="white" className="self-center" />
                </TouchableOpacity>
              </View>

              <Text className="text-white text-lg font-lato mb-4 mt-4">
                {" "}
                Suggested Accounts:
              </Text>
              <View className="justify-between space-y-2">
                {accounts.map((item) => (
                  <View
                    key={item.first_name}
                    className="flex flex-row justify-between mb-3 items-center"
                  >
                    <Text className="text-white font-lato">
                      {" "}
                      {item.first_name}
                    </Text>
                    <Text className="text-white font-lato">
                      {" "}
                      {item.connection_type}
                    </Text>

                    <TouchableOpacity
                      className="w-24 bg-bgred rounded-lg h-7 mt-1"
                      onPress={() => {
                        // item.details = "Invited";
                        item.quantity = 0;
                        if (currentGroup.indexOf(item) === -1) {
                          currentGroup.push(item);
                          console.log(currentGroup);
                        }
                        setModalVisible(!isModalVisible);
                      }}
                    >
                      <Text className="self-center my-auto text-white font-lato">
                        Invite
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
