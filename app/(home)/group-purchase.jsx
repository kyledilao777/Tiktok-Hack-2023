import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import { View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Link, useSearchParams, useRouter} from "expo-router";
import { Text, Button, Modal } from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { X } from "lucide-react-native";

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
      details: "Owner",
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

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
    currentGroup[0].quantity = quantity + 1;
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    currentGroup[0].quantity = quantity + 1;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const newUserPresent = currentGroup.some((item) => item.new_user === true);
  const isInvited = async (user) =>
    currentGroup.some((item) => item.first_name === user.first_name);

  const showInvited = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "white" }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginLeft: 60,
          marginTop: 20,
        }}
      >
        {item.first_name}
      </Text>
      <Text style={{ fontSize: 16, marginLeft: 120, marginTop: -20 }}>
        {item.details}
      </Text>
      <Text style={{ fontSize: 16, marginLeft: 190, marginTop: -20 }}>
        Quantity: {item.quantity}
      </Text>
      <Text style={{ fontSize: 16, marginLeft: 290, marginTop: -20 }}>
        Subtotal: ${Math.round(item.quantity * currentProductPrice, 2)}
      </Text>
    </View>
  );

  const handleSubmit = async () => {
    const { error } = await supabase.from('products').insert({
        name: productName,
        buyer: user.user_metadata.phone_number,
        quantity: quantity,
        price: price,
        group: true,
    })
    route.push('view-cart');
  }

  return (
    <View className="bg-bgblack/80 flex-1 ">
      <View className="m-8">
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-lato">{productName}</Text>
            <Text className="text-white font-lato text-3xl">
              ${Math.round(currentProductPrice * quantity, 2)}
            </Text>
          </View>

          <View className="flex flex-row items-center space-x-4">
            <TouchableOpacity
              disabled={quantity <= 1}
              className="w-12 h-8 bg-neutral-400 rounded-lg"
              onPress={decreaseQuantity}
            >
              <Text className="text-white mx-auto text-2xl">-</Text>
            </TouchableOpacity>
            <Text className="text-white font-lato">{quantity}</Text>
            <TouchableOpacity
              className="w-12 h-8 bg-bgred rounded-lg"
              onPress={increaseQuantity}
            >
              <Text className="text-white mx-auto text-xl">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-white mt-8">
          This product has a minimum order units of {minimumOrder}
        </Text>

        <Button
          className="text-white bg-bgred mt-4 rounded-lg"
          mode="contained"
          onPress={toggleModal}
        >
          Invite Friends
        </Button>

        <Text className="text-white font-lato text-2xl mt-16">Group:</Text>

        <View className="flex flex-initial">
          <View style={{ marginBottom: 10 }}>
            {currentGroup.map((item, index) => (
              <View key={index}>
                <View className="flex flex-row justify-between my-4 border-b-2 border-white ">
                  <Text className="text-white text-lg">{item.first_name}</Text>
                  <Text className="text-white text-lg">{item.details}</Text>
                  <Text className="text-white text-lg">
                    Quantity: {item.quantity}
                  </Text>
                  <Text className="text-white text-lg">
                    Subtotal: $
                    {Math.round(item.quantity * currentProductPrice, 2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Text className="text-white">
          Rewards: {"\n"}
          Invite one new user for an additional 10% discount! {"\n"}
          Spend over $100 for an additional 5% discount!
        </Text>

        <View className="flex flex-row justify-between space-x-4">
          <Button
            className="text-white bg-gray-400 mt-4 rounded-lg px-6"
            mode="contained"
          >
            Delete
          </Button>

          {quantity >= minimumOrder && (
            <Button
              className="text-white bg-bgred mt-4 rounded-lg"
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
          <View className="bg-neutral-600 rounded-lg mb-2">
            <View className="m-4 ">
              <View className="flex flex-row justify-between">
                <Text className="font-bold font-lato text-2xl text-white">
                      Invite Your Friends!
                </Text>
                
                <TouchableOpacity
                className="bg-bgred w-6 rounded-full self-end mb-1"
                mode="contained"
                onPress={toggleModal}
              >
                <X size={22} color="white" className="self-center"/>
              </TouchableOpacity>
              </View>
              
              <Text className="text-white text-lg font-lato mb-4 mt-4">
                {" "}
                Suggested Accounts:
              </Text>
              <View className="justify-between">
                {accounts.map((item) => (
                  <View key={item.first_name} className="flex flex-row justify-between mb-3">
                    <Text className="text-white font-lato">
                      {" "}
                      {item.first_name}
                    </Text>
                    <Text className="text-white font-lato">
                      {" "}
                      {item.connection_type}
                    </Text>

                    <TouchableOpacity
                      
                      className="w-28 bg-bgred rounded-lg h-7"
                      onPress={() => {
                        item.details = "Invited";
                        item.quantity = 0;
                        if (currentGroup.indexOf(item) === -1) {
                          currentGroup.push(item);
                          console.log(currentGroup);
                        }
                        setModalVisible(!isModalVisible);
                      }}
                    >
                      <Text className="self-center my-auto text-white font-lato">Invite</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = {
  photoText: {
    fontSize: 16,
    color: "gray",
  },
  label: {
    textAlign: "left",
    alignItems: "center",
    marginLeft: 20,
    fontSize: 16,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#EE1D52",
    marginTop: -20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
};
