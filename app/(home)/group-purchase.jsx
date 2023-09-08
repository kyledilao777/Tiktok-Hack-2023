import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { View, FlatList } from "react-native";
import { Link, useRouter, useSearchParams } from "expo-router";
import {
  Text,
  TextInput,
  ActivityIndicator,
  Button,
  Modal,
} from "react-native-paper";
import { MediaTypeOptions } from "expo-image-picker";

export default function GroupBuyPage() {
  const minimumOrder = 50;
  const newUserDiscount = 0.9;
  const groupOrderDiscount = 0.95;

  const { productName } = useSearchParams();
  const { productPrice } = useSearchParams();
  const [quantity, setValue] = useState(0);
  const [currentProductPrice, setOutputValue] = useState(productPrice);
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
    setValue(quantity - 1);
    currentGroup[0].quantity = quantity + 1;
  };

  const increaseQuantity = () => {
    setValue(quantity + 1);
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
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 30,
          backgroundColor: "lightgray",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 3,
          marginTop: -30,
        }}
      >
        <Text style={[styles.photoText, { fontSize: 12 }]}>Photo</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={[
          styles.label,
          {
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 20,
            marginLeft: 0,
            textAlign: "center",
          },
        ]}
      >
        User's Group Order
      </Text>

      <Link href="/product" style={{ marginTop: 10, marginLeft: 20 }}>
        <Button
          style={[styles.button, { width: 100 }]}
          mode="contained"
          labelStyle={styles.buttonText}
        >
          Back
        </Button>
      </Link>

      <View style={[styles.photoSquare]}>
        <Text style={styles.photoText}>Add Photo</Text>
      </View>

      <Text
        style={[
          styles.label,
          {
            fontSize: 18,
            fontWeight: "bold",
            marginTop: -160,
            marginLeft: 90,
            textAlign: "center",
          },
        ]}
      >
        Item: {productName}
      </Text>
      <View>
        <Text
          style={[
            styles.label,
            {
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 0,
              marginLeft: 90,
              textAlign: "center",
            },
          ]}
        >
          Unit Price: ${currentProductPrice}
        </Text>
      </View>

      <Text
        style={[
          styles.label,
          { fontSize: 18, marginTop: 20, marginLeft: 120, textAlign: "center" },
        ]}
      >
        {quantity}
      </Text>

      <Button
        style={[
          styles.button,
          {
            marginLeft: 305,
            marginTop: -30,
            width: 10,
            height: 40,
          },
        ]}
        mode="contained"
        labelStyle={styles.buttonText}
        onPress={increaseQuantity}
      >
        +
      </Button>

      <Button
        style={[
          styles.button,
          {
            marginLeft: 185,
            marginTop: -40,
            width: 10,
            height: 40,
            backgroundColor: "lightgrey",
          },
        ]}
        mode="contained"
        labelStyle={styles.buttonText}
        onPress={decreaseQuantity}
      >
        -
      </Button>

      <Text style={[styles.label, { marginTop: 60, fontSize: 14 }]}>
        This product has a minimum order units of {minimumOrder}
      </Text>
      <Text style={[styles.label, { marginTop: 0, fontSize: 14 }]}>
        Current combined order units: {quantity}
      </Text>

      <Button
        style={[
          styles.button,
          {
            marginLeft: 20,
            marginTop: 10,
            width: 200,
          },
        ]}
        mode="contained"
        labelStyle={styles.buttonText}
        onPress={toggleModal}
      >
        Invite Friends
      </Button>

      <Text
        style={[
          styles.label,
          { marginTop: 10, fontSize: 20, fontWeight: "bold" },
        ]}
      >
        Group:
      </Text>

      <View style={{ marginBottom: 10 }}>
        <FlatList
          data={currentGroup}
          renderItem={showInvited}
          keyExtractor={(item) => item.first_name}
        />
      </View>

      <Text style={[styles.label, { marginTop: 0, fontSize: 14 }]}>
        Rewards: {"\n"}
        Invite one new user for an additional 10% discount! {"\n"}
        Spend over $100 for an additional 5% discount!
      </Text>
      {quantity < minimumOrder ? (
        <Button
          style={[
            styles.button,
            {
              width: 200,
              marginLeft: 200,
              marginTop: 10,
              alignSelf: "stretch",
            },
          ]}
          mode="contained"
          labelStyle={styles.buttonText}
          onPress={() => {
            alert("Minimum order value not met.");
          }}
        >
          Confirm Order
        </Button>
      ) : (
        <Button
          style={[
            styles.button,
            {
              width: 200,
              marginLeft: 200,
              marginTop: 10,
              alignSelf: "stretch",
            },
          ]}
          mode="contained"
          labelStyle={styles.buttonText}
          onPress={() => {}}
        >
          <Link href="/product">Confirm Order</Link>
        </Button>
      )}

      <Button
        style={[
          styles.button,
          {
            width: 150,
            marginLeft: 20,
            marginTop: -40,
            height: 42,
            alignSelf: "stretch",
            backgroundColor: "lightgrey",
          },
        ]}
        mode="contained"
        labelStyle={styles.buttonText}
      >
        Delete
      </Button>

      <Modal
        visible={isModalVisible}
        onDismiss={toggleModal}
        dismissable={false}
        style={{ alignItems: "left", marginLeft: 20 }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "gray",
            width: "100%",
          }}
        >
          <Button
            style={[
              styles.button,
              {
                width: 100,
                height: 40,
                borderRadius: 10,
                marginTop: 10,
                marginLeft: 5,
              },
            ]}
            mode="contained"
            labelStyle={styles.buttonText}
            onPress={toggleModal}
          >
            Close
          </Button>

          <Text
            style={[
              styles.label,
              {
                marginTop: 20,
                marginBottom: 10,
                marginLeft: 5,
                fontWeight: "bold",
                fontSize: 30,
              },
            ]}
          >
            Invite Friends
          </Text>
          <Text style={[styles.label, { marginBottom: 10, marginLeft: 5 }]}>
            {" "}
            Suggested Accounts:
          </Text>
          <View>
            {accounts.map((item) => (
              <View key={item.first_name}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: "lightgray",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                    marginTop: 0,
                  }}
                >
                  <Text style={[styles.photoText, { fontSize: 12 }]}>
                    Photo
                  </Text>
                </View>

                <Text
                  style={[
                    styles.label,
                    { marginBottom: 0, marginLeft: 70, marginTop: -45 },
                  ]}
                >
                  {" "}
                  {item.first_name}
                </Text>
                <Text
                  style={[
                    styles.label,
                    { marginBottom: 0, marginLeft: 70, marginTop: 0 },
                  ]}
                >
                  {" "}
                  {item.connection_type}
                </Text>

                <Button
                  style={[
                    styles.button,
                    {
                      width: 100,
                      height: 40,
                      borderRadius: 10,
                      marginBottom: 20,
                      marginTop: -35,
                      marginLeft: 265,
                    },
                  ]}
                  mode="contained"
                  labelStyle={styles.buttonText}
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
                  Invite
                </Button>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = {
  photoSquare: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    backgroundColor: "lightgray", // Placeholder background color
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 0,
    marginBottom: 20, // Adjust the margin as needed
  },
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
