import { View } from "react-native";
import { useState } from "react";
import { Text, Button} from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function ProductPage() {    
    const productName = 'Hand Wash';
    const productPrice = 2;
    const productRating = 5.0;
    const productSold = 1231;
    const shippingDetails = 'Free Shipping';

    const router = useRouter();

    return (
        <View style={{ flex: 1}}>
            <View style={[styles.photoSquare]}>
                <Text style={styles.photoText}>Add Photo</Text>
            </View>

            <Text style={[styles.label, { fontSize: 28 }]}>${productPrice}</Text>
            <Text style={[styles.label, { fontSize: 24 }]}>{productName}</Text>
            <Text style={styles.label}>{productRating} / 5</Text>
            <Text style={styles.label}>{productSold} Sold</Text>
            <Text style={styles.label}>{shippingDetails}</Text>
            <Link href="/groupbuy" style={{marginTop: 10, marginLeft: 10}}>
                <Button
                    style={styles.button}
                    mode="contained"
                    labelStyle={styles.buttonText}
                    onPress={() => router.push({pathname:'./groupbuy', params:{productName: productName, productPrice: productPrice}})}
                >
                Group Order
                </Button>
            </Link>
        </View>
    ) 
    };
    
    const styles = {
        photoSquare: {
            width: 450, // Adjust the width as needed
            height: 450, // Adjust the height as needed
            backgroundColor: 'lightgray', // Placeholder background color
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 10, // Adjust the margin as needed
        },
        photoText: {
            fontSize: 16,
            color: 'gray',
        },
        label: {
            textAlign: 'left',
            alignItems: 'center',
            marginLeft: 20,
            fontSize: 16, // Font size for "Product Name" and "Product Price" text
        },
        button: {
            borderRadius: 10,
            backgroundColor: '#EE1D52',
        },
        buttonText: {
            fontSize: 16,
            fontWeight: 'bold',
        }
    };

    
  