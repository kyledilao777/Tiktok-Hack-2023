import { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/auth";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

export default function IndivCheckout() {
    const router = useRouter();
    const [ownProducts, setOwnProducts] = useState([]);
    const [group, setGroup] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data: indivProducts, error } = await supabase
                    .from('products')
                    .select('name, quantity, price')
                    .eq('group', false);

                if (error) {
                    console.error('Error while fetching products:', error);
                    return;
                }

                setOwnProducts(indivProducts);
            } catch (error) {
                console.error('Error during fetchProducts:', error);
            }
        };

        const fetchGroup = async () => {
            try {
                const { data: groupPurchase, error } = await supabase
                    .from('products')
                    .select('name, quantity, price')
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

        fetchProducts();
        fetchGroup();
    }, []);

    const totalPrice = ownProducts.reduce(
        (total, product) => total + product.quantity * product.price, 0);

    const handleOwnPay = async () => {
        if (ownProducts && ownProducts.length > 0) {
            try {
                for (const product of ownProducts) {
                    const { error: updateError } = await supabase
                        .from('products')
                        .update({ status: true })
                        .eq('name', product.name);
    
                    if (updateError) {
                        console.error('Error while updating status:', updateError);
                    }
                }
            } catch (error) {
                console.error('Error during group pay:', error);
            }
        }
    }

    const handleGroupPay = async () => {
        if (group && group.length > 0) {
            try {
                for (const product of group) {
                    const { error: updateError } = await supabase
                        .from('products')
                        .update({ status: true })
                        .eq('name', product.name);
    
                    if (updateError) {
                        console.error('Error while updating status:', updateError);
                    }
                }
            } catch (error) {
                console.error('Error during group pay:', error);
            }
        }
    }

        return (
            <View>
                <View style={styles.header}>
                    <Text>Items Ordered</Text>
                </View>
                <View style={styles.product}>
                    <View style={styles.productInfo}>
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Products</Text>
                    </View>
                    <View style={styles.groupOrder}>
                        <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
                    </View>
                    <View style={styles.quantityOrdered}>
                        <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
                    </View>
                </View>
                {ownProducts.map((product, index) => (
                    <View key={index} style={styles.product}>
                        <View style={styles.productInfo}>
                            <Text>{product.name}</Text>
                        </View>
                        <View style={styles.groupOrder}>
                            <Text>{product.quantity}</Text>
                        </View>
                        <View style={styles.payment}>
                            <Text>${product.quantity * product.price}</Text>
                        </View>
                    </View>))}
                <View>
                    <TouchableOpacity
                        style={{
                            alignSelf: "flex-end",
                            marginRight: 20,
                            marginTop: 10,
                            borderColor: 'black',
                            borderWidth: 2,
                            paddingHorizontal: 5,
                            paddingVertical: 2,
                            width: 95,
                            backgroundColor: 'yellow'
                        }}
                        onPress={handleOwnPay}
                    >
                        <Text> Pay </Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.header2}>
                    <Text> Pending Group Order Purchase:</Text>
                </View>
                <View style={styles.product}>
                    <View style={styles.productInfo}>
                        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Products</Text>
                    </View>
                    <View style={styles.groupOrder}>
                        <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
                    </View>
                    <View style={styles.quantityOrdered}>
                        <Text style={{ fontWeight: 'bold' }}>Total Price</Text>
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
                            <Text>${product.quantity * product.price}</Text>
                        </View>
                    </View>))}
                <TouchableOpacity
                    style={{
                        alignSelf: "flex-end",
                        marginRight: 20,
                        marginTop: 10,
                        borderColor: 'black',
                        borderWidth: 2,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        width: 95,
                        backgroundColor: 'yellow'
                    }}
                    onPress={handleGroupPay}
                >
                    <Text> Pay </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const styles = StyleSheet.create({
        header: {
            backgroundColor: "pink",
        },
        header2: {
            backgroundColor: 'lightblue',
            marginTop: 20,
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