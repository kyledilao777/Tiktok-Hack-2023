import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Checkbox, Text, Button } from "react-native-paper";
import { useSearchParams } from "expo-router";
import * as Contacts from "expo-contacts";

export default function Payment() {
  const { friendName, productName } = useSearchParams();

  return (
    <SafeAreaView>
      <Text style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
        Payment Page for group purchase of {productName} with {friendName}.
      </Text>
    </SafeAreaView>
  );
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text key={title.id} style={styles.title}>
      {title.firstName}
    </Text>
    <Text key={title.firstName} style={styles.title}>
      {title.phoneNumbers[0].number}
    </Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});
