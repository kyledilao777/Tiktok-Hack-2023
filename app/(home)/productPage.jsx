import { SafeAreaView, TouchableOpacity, Text, Alert} from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button, TextInput} from 'react-native-paper';
import { useRouter, useSearchParams } from 'expo-router';

export default function ProductPage() {
    const router = useRouter();
    const { productName } = useSearchParams();

    const handleSubmit = async () => {
        const { error } = await supabase.from('products').insert({ name: productName })

        if (error) {
            console.log(error);
        }

        Alert.alert(
            'Added to Cart!',
            '',
            [
                {text: 'Ok'}
            ]
        )
    }

    return (
        <SafeAreaView>
            <Text style={{ marginTop:10, marginLeft:15, }}>Discount Voucher</Text>
            <TouchableOpacity style={{ marginLeft:15, marginTop:10, borderColor:'black', borderWidth:2, paddingHorizontal:5, paddingVertical:2, width:95, }}
                onPress={() => router.push({ pathname:'list', params: { productName: productName }})}>
                <Text> Find friends </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft:15, marginTop:10, borderColor:'black', borderWidth:2, paddingHorizontal:5, paddingVertical:2, width:95, }} onPress={handleSubmit}>
                <Text> Add to Cart </Text>
            </TouchableOpacity> 
            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
        </SafeAreaView>
    )
}