import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Checkbox, Text, Button } from "react-native-paper";
import { useRouter, useSearchParams } from "expo-router";
import * as Contacts from "expo-contacts";
import {
  LogOut,
  ShoppingCart,
  Users,
  ShoppingBasket,
  ArrowLeft,
} from "lucide-react-native";
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
        // Handle any errors
      }
    }

    async function fetchContacts() {
      try {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });

          const matchedContacts = data.filter((contact) =>
            buyers.includes(contact.phoneNumbers[0].number)
          );

          setContacts(matchedContacts);
        }
      } catch (error) {
        // Handle any errors
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
            pathname: "payment",
            params: { productName: productName, friendName: title.firstName },
          })
        }
      >
        <Text> Payment </Text>
      </TouchableOpacity>
    </View>
  );

  const handleCart = async () => {
    router.push("checkout/indivcart");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-black/80">
      <View className="h-16">
        <View className="flex flex-row justify-between mx-4">
          <View className="flex flex-row">
            <TouchableOpacity
              className="mt-6 mr-16"
              onPress={() => navigation.navigate("index")}
            >
              <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
          </View>

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
      <Text className="text-white text-lg font-lato mx-4 my-4">
        {productName}
      </Text>
      <Text className=" text-white mx-4 font-lato">Contacts</Text>
      <FlatList
        className="m-4 rounded-xl"
        data={contacts}
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={(item) => item.id}
      />
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
    fontSize: 16,
  },
});
