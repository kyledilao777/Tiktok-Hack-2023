import { SafeAreaView, TouchableOpacity, Text, Alert, Image, View } from 'react-native';
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
        const { data: existingProducts, error } = await supabase
            .from('products')
            .select('id, name, quantity')
            .eq('name', productName);

        if (error) {
            console.error('Error while fetching products:', error);
            return;
        }

        if (existingProducts && existingProducts.length > 0) {
            const existingProduct = existingProducts[0];
            const newQuantity = existingProduct.quantity + 1;

            const { error: updateError } = await supabase
                .from('products')
                .update({ quantity: newQuantity })
                .eq('id', existingProduct.id);

            if (updateError) {
                console.error('Error while updating quantity:', updateError);
            }
        } else {
            // manually insert data in the database here for DEMO
            const { error: insertError } = await supabase.from('products').insert({
                name: productName,
                buyer: user.user_metadata.phone_number,
                quantity: 1,
                price: 8,
                group: false
            });

            if (insertError) {
                console.error('Error while inserting product:', insertError);
            }
        }

        Alert.alert(
            'Added to Cart!',
            '',
            [{ text: 'Ok' }]
        );
    };

    const handleCart = async () => {
        router.push("Checkout/indivcart");
    }


    return (
        <SafeAreaView className=" align-middle flex-1 bg-black/80">
            
            <View className="">
                <View className="">
                     <Image className="w-[200px] h-[400px] mx-auto" source={require('../../assets/ucok.png')} />
                </View>
                
                <View>
                    <Text className="text-xl  text-white font-calibri"> {productName}</Text>
                </View>
                
            
            </View>
            <View className="flex-row ml-7">
            <View>

                <TouchableOpacity 
                    style={{ alignSelf: "flex-end", 
                            
                            marginRight: 30, 
                            marginTop: 10, 
                            borderColor: '#EE1D52', 
                            backgroundColor: "#EE1D52",
                            borderWidth: 2, 
                            paddingHorizontal: 5,
                            paddingVertical: 2, 
                            width: 95, }}
                    className="rounded-lg" onPress={() => router.push({ pathname: 'list', params: { productName: productName } })}>
                <Text className="text-white font-calibri align-middle justify-center pl-5">Friends </Text>
                </TouchableOpacity>
                </View>

                <View>
                <TouchableOpacity
                style={{
                    alignSelf: "flex-end",
                    marginRight: 25,
                    marginLeft: 20,
                    marginTop: 10,
                    borderColor: '#EE1D52',
                    borderWidth: 2,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    width: 95,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#EE1D52"
                }}
                onPress={handleSubmit}
                className="rounded-lg"
            >
                <Text className="text-white font-calibri"> Add to Cart </Text>
                </TouchableOpacity>
                </View>

                <View>
                

                <TouchableOpacity
                style={{
                    alignSelf: "flex-end",
                    marginRight: 20,
                    marginTop: 10,
                    borderColor: '#EE1D52',
                    borderWidth: 2,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    width: 95,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#EE1D52"
                }}
                className="rounded-lg"
                onPress={handleCart}
            >
                    <Text className="text-white font-calibri"> View Cart </Text>
                </TouchableOpacity>
                </View>
            </View>
            <View>
            <TouchableOpacity 
                    style={{
                    alignSelf: "flex-end",
                    marginRight: 20,
                    marginTop: 10,
                    borderColor: '#EE1D52',
                    borderWidth: 2,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    width: 95,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 251,
                    backgroundColor: "#EE1D52"
                    
                }}onPress={async () => {await supabase.auth.signOut()}} className="rounded-lg">
                <Text className="text-white font-calibri">Log Out</Text>
            </TouchableOpacity>
            </View>
           
        </SafeAreaView>

    );
}

/*
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
} */
