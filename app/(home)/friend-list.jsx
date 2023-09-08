import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
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
  const { productName } = useSearchParams();
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
      } catch (error) {
        console.log("Error " + error);
      }
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
      } catch (error) {
        console.log("Error " + error);
      }
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
            params: { productName: productName, friendName: title.firstName },
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
    <SafeAreaView style={{ flex: 1 }} className="bg-black/80">
      <View className="m-4">
        <Text className="text-white text-2xl font-lato mx-4 my-4">
          {productName}
        </Text>
        <Text className=" text-white mx-4 text-lg font-lato">Contacts</Text>
        {contacts.map((contact, index) => (
          <View className="bg-bgblue m-4 h-20 rounded-xl">
            <View className="mx-2 my-auto">
              <Text key={contact.id} style={styles.title} className="font-lato">
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
                    },
                  })
                }
              >
                <Text className="font-lato"> Payment </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
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
