import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Checkbox, Text, Button } from 'react-native-paper';
import { useRouter, useSearchParams } from 'expo-router';
import * as Contacts from 'expo-contacts';

export default function HomeScreen() {
    const [contacts, setContacts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { productName } = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers]
            });
                
            if (data.length > 0) {
                setContacts(data);
            }
          }
        })();
      }, []);

    const Item = ({title}) => (
      <View style={styles.item}>
        <Text key={title.id} style={styles.title}>{title.firstName}</Text>
        <Text key={title.firstName} style={styles.title}>{title.phoneNumbers[0].number}</Text>
        <TouchableOpacity onPress={() => router.push({ pathname:'payment', params:{productName: productName, friendName: title.firstName}})}>
          <Text> Payment </Text>
        </TouchableOpacity>
      </View>
    );

    return (
        <SafeAreaView>
            <Text style={{marginHorizontal:20, marginTop:20, marginBottom:10, }}>
              Assuming all contacts below are TikTok users, are on current device's contact list and are purchasing the {productName}.
            </Text>
            <FlatList
                data={contacts}
                renderItem={({item}) => <Item title={item} />}
                keyExtractor={item => item.id}
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
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 16,
    },
});