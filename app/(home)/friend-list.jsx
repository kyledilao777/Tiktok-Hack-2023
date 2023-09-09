import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Checkbox, Text } from "react-native-paper";
import { useRouter, useSearchParams } from "expo-router";
import * as Contacts from "expo-contacts";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { productName, price } = useSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchBuyers() {
      try {
        const { data } = await supabase
          .from("products")
          .select("buyer")
          .eq("name", productName);

        const uniqueBuyers = Array.from(
          new Set(data.map((item) => item.buyer))
        );

        setBuyers(uniqueBuyers);
      } catch (error) {}
    }

    async function fetchContacts() {
      try {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });

          const matchedContacts = data.filter((contact) => {
            const contactPhoneNumber = contact.phoneNumbers[0]?.number;
            if (contactPhoneNumber) {
              const normalizedContactPhoneNumber = contactPhoneNumber.replace(
                /\s/g,
                ""
              );
              const normalizedBuyers = buyers.map((buyer) =>
                buyer.replace(/\s/g, "")
              );

              return normalizedBuyers.includes(normalizedContactPhoneNumber);
            }
            return false;
          });

          setContacts(matchedContacts);
        }
      } catch (error) {}
    }

    fetchBuyers();
    fetchContacts();
  }, [contacts]);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text key={title.id} style={styles.title}>
        {title.firstName}
      </Text>
      <Text key={title.firstName} style={styles.title}>
        {title.phoneNumbers[0].number}
      </Text>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "group-purchase",
            params: { productName: productName, friendName: title.firstName, price:price, preAddedGroup: {
              first_name: title.firstName,
              quantity: 0,
              new_user: false,
            }},
          })
        }
      >
        <Text> Payment </Text>
      </TouchableOpacity>
    </View>
  );

  const handleCart = async () => {
    router.push("view-cart");
  };

  return (
    <ScrollView style={{ flex: 1 }} className="bg-black/80">
      <View className="m-4">
        <Text className="text-white text-2xl font-lato mx-4 mb-3">
          {productName}
        </Text>

        <View className="mb-3">
          <Text className="text-white mx-4 text-lg text-justify">
            Your friends have also added the {productName} to their cart. Hit
            them up now to start a group purchase order and grab those bulk
            discount vouchers for yourselves!
          </Text>
        </View>
        <View className="mb-5">
          {contacts.map((contact, index) => (
            <View className="bg-bgblue m-4 h-20 rounded-xl p-2">
              <View className="mx-2 my-auto">
                <Text key={index} style={styles.title} className="font-lato">
                  {contact.firstName}
                </Text>
                <Text
                  key={contact.firstName}
                  className="font-lato"
                  style={styles.phoneNumber}
                >
                  {contact.phoneNumbers[0].number}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "group-purchase",
                      params: {
                        productName: productName,
                        friendName: contact.firstName,
                        price:price,
                      },
                    })
                  }
                >
                  <Text className="font-lato"> Group Purchase</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#69C9D0",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  phoneNumber: {
    fontSize: 16,
  },
});
