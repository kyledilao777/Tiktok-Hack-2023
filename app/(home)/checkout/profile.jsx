import { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/auth";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

export default function CheckOut() {
    const router = useRouter();
    const [group, setGroup] = useState([]);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const { data: groupPurchase, error } = await supabase
                    .from('products')
                    .select('name, quantity, price, status')
                    .eq('group', true);

                if (error) {
                    console.error('Error while fetching group products:', error);
                    return;
                }

                setGroup(groupPurchase);
            } catch (error) {
                console.error('Error during fetchGroup:', error);
            }
        };
        fetchGroup();
    }, []);

    const totalPrice = group.reduce(
        (total, product) => total + product.quantity * product.price, 0);

    const totalQuantity = group.reduce(
        (total, product) => total + product.quantity, 0);

    const handleCheckoutPress = async () => {
        const unpaidItems = group.filter((product) => product.status == false);

        if (unpaidItems.length === 0) {
            alert("Payment completed!")
        } else {
            alert("Payment not completed. Please ensure all members have paid.");
        }
    };

    return (
        <View>
            <View style={styles.header}>
                <Text>Items Ordered</Text>
            </View>
            <View style={styles.product}>
                <View style={styles.productInfo}>
                    <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
                        Handwash ($8)
                    </Text>
                </View>
                <View style={styles.groupOrder}>
                    <Text>Quantity</Text>
                </View>
                <View style={styles.quantityOrdered}>
                    <Text>Payment Status</Text>
                </View>
            </View>
            {group.map((product, index) => (
                <View key={index} style={styles.product}>
                    <View style={styles.productInfo}>
                        <Text>{product.name}</Text>
                    </View>
                    <View style={styles.groupOrder}>
                        <Text>{product.quantity}</Text>
                    </View>
                    <View style={styles.payment}>
                        <Text>{product.status ? 'Paid' : 'Unpaid'}</Text>
                    </View>
                </View>
            ))}
            <View style={styles.totalPrice}>
                <Text> Total Price: {totalQuantity} items x ${group[0].price} = ${totalPrice}</Text>
            </View>
            <View style={styles.button}>
                <Button
                    onPress={handleCheckoutPress}
                    mode='contained'
                    textColor='white'
                    style={{ backgroundColor: 'red' }}
                >Complete Group Order</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "pink",
    },
    product: {
        flexDirection: "row",
    },
    productInfo: {
        flex: 1,
    },
    groupOrder: {
        flex: 0.5,
        alignItems: "center",
        marginRight: 50
    },
    payment: {
        flex: 0.5,
        alignItems: "center",
        marginRight: 10
    },
    button: {
        alignItems: 'flex-end',
        marginRight: 20,
        marginTop: 20
    },
    totalPrice: {
        marginTop: 30,
        alignItems: 'flex-end',
        marginRight: 20
    }
});