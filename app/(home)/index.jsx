import { SafeAreaView, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/auth'

export default function ProductList() {
    const router = useRouter();
    const { user } = useAuth();
    const [productName, setProductName] = useState("Hand Wash");

    const handleSubmit = async () => {
        const { error } = await supabase.from('products')
            .insert({ 
                name: productName, 
                buyer: user.user_metadata.phone_number
            })

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
        <SafeAreaView style={{ flex:1, backgroundColor:'white' }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", marginTop:10, marginLeft:10, }}> {productName}</Text>
            <Image style={{ width:200, height:400, marginHorizontal:100, marginTop:50, }} source={require('../../assets/handwash.jpeg')} />
            <Image style={{ width:"100%", height:20, marginVertical:20}} source={require('../../assets/banner.jpeg')} />
            <TouchableOpacity style={{ alignSelf:"flex-end", marginRight:20, marginTop:10, borderColor:'black', borderWidth:2, paddingHorizontal:5, paddingVertical:2, width:95, }}
                onPress={() => router.push({ pathname:'list', params: { productName: productName }})}>
                <Text> Find friends </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf:"flex-end", marginRight:20, marginTop:10, borderColor:'black', borderWidth:2, paddingHorizontal:5, paddingVertical:2, width:95, }} onPress={handleSubmit}>
                <Text> Add to Cart </Text>
            </TouchableOpacity> 
            <Button onPress={async () => {await supabase.auth.signOut()}}> Logout  </Button>
        </SafeAreaView>
    )
}