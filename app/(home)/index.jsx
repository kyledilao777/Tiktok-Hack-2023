import { SafeAreaView, TouchableOpacity, Text, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button, TextInput} from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ProductList() {
    const router = useRouter();
    const [productName, setProductName] = useState("Hand Wash");

    return (
        <SafeAreaView>
            <Text style={{ fontSize: 40, fontWeight: "bold", marginTop:10, marginLeft:10, }}> {productName}</Text>
            <TouchableOpacity style={{ marginLeft:15, marginTop:10, borderColor:'black', borderWidth:2, paddingHorizontal:5, paddingVertical:2, width:58, }} onPress={() => router.push({pathname: 'productPage', params:{productName:productName}})}>
                <Text style={{ fontSize:20 }}> Buy </Text>
            </TouchableOpacity>
            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
        </SafeAreaView>
    )
}