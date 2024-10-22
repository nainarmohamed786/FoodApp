import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart, decreaseQuantity, increaseQuantity } from '../redux/CartReducer';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const cart = () => {

    const params = useLocalSearchParams();

    const router = useRouter();
    const dispatch = useDispatch();

    const cartReducers = useSelector((state) => state.cart.cart);

    const totalAmount = cartReducers.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    console.log(totalAmount)
    const instructions = [
        {
            id: "0",
            name: "Avoid Ringing",
            iconName: "bell",
        },
        {
            id: "1",
            name: "Leave at the door",
            iconName: "door-open",
        },
        {
            id: "2",
            name: "directions to reach",
            iconName: "directions",
        },
        {
            id: "3",
            name: "Avoid Calling",
            iconName: "phone-alt",
        },
    ];
    return (

        <>

            <ScrollView style={{ marginTop: 10, margin: 10 }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.back()} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{params.name}</Text>
                </View>

                <View style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}>
                    <Text style={{ fontSize: 16 }}>Delivery in <Text style={{ fontWeight: "bold" }}>35 - 40 Mins</Text></Text>
                </View>

                <Text style={{ letterSpacing: 6, fontSize: 15, color: "gray", margin: 10, textAlign: "center" }}>ITEM(S) ADDED</Text>

                <View style={{ backgroundColor: "white", padding: 10 }}>
                    {cartReducers.map((item, index) => {
                        return (
                            <View key={index} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                                    <Text style={{ marginTop: 5, fontWeight: "bold" }}>₹{item.price * item.quantity}</Text>
                                </View>
                                <View>
                                    <View style={{ backgroundColor: "gray", flexDirection: "row", gap: 5, alignItems: "center", padding: 8, borderRadius: 10, width: 80, justifyContent: "space-between", marginTop: 10 }}>
                                        <Pressable onPress={() => dispatch(decreaseQuantity(item))}>
                                            <AntDesign name="minus" size={18} color="white" />
                                        </Pressable>
                                        <Text style={{ color: "white", fontSize: 16 }}>{item.quantity}</Text>
                                        <Pressable onPress={() => dispatch(increaseQuantity(item))}>
                                            <AntDesign name="plus" size={18} color="white" />
                                        </Pressable>
                                    </View>
                                    <Text style={{ textAlign: "center" }}>Quantity: {item.quantity}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>

                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
                        Delivery Instructions
                    </Text>
                    <FlatList
                        data={instructions}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={({ item }) => item}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ backgroundColor: "white", padding: 10, justifyContent: "center", alignItems: "center", margin: 10, borderRadius: 10 }}>
                                    <FontAwesome5
                                        name={item?.iconName}
                                        size={22}
                                        color={"gray"}
                                    />
                                    <Text style={{ width: 75, fontSize: 13, color: "#383838", textAlign: "center" }}>{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, backgroundColor: "white", padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <AntDesign name="pluscircleo" size={18} color="black" />
                        <Text style={{ fontSize: 14 }}>Add more items</Text>
                    </View>
                    <View>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <FontAwesome name="pencil-square-o" size={24} color="black" />
                        <Text style={{ fontSize: 14 }}>Add more cooking Instructions</Text>
                    </View>
                    <View>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <MaterialCommunityIcons
                            name="food-fork-drink"
                            size={24}
                            color="black"
                        />
                        <Text style={{ fontSize: 14 }}>Don't send cultery with this order</Text>
                    </View>
                    <View>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", padding: 10, marginTop: 15 }}>
                    <View>
                        <Text style={{ fontSize: 16 }}>Feeding India Donation</Text>
                        <Text style={{ color: "gray", marginTop: 8 }}>Working towards a malnut</Text>
                    </View>
                    <View>
                        <AntDesign name="checksquare" size={24} color="red" />
                        <Text style={{ color: "black", fontSize: 15, marginTop: 8 }}>Rs 3</Text>
                    </View>
                </View>

                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10 }}>Billing Details</Text>

                <View style={{ backgroundColor: "white", padding: 10, marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, color: "gray" }}>Item Total</Text>
                    <Text style={{ fontSize: 13, color: "gray" }}>₹{totalAmount}</Text>
                </View>

                <View style={{ backgroundColor: "white", padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, color: "gray" }}>Delivery Fee</Text>
                    <Text style={{ fontSize: 13, color: "gray" }}>₹15.00</Text>
                </View>

                <View style={{ backgroundColor: "white", padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, color: "gray" }}>Delivery Partner Fee</Text>
                    <Text style={{ fontSize: 13, color: "gray" }}>₹75.00</Text>
                </View>

                <View style={{ backgroundColor: "white", padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, color: "gray", fontWeight: "bold" }}>To pay</Text>
                    <Text style={{ fontSize: 13, color: "gray" }}>₹{totalAmount + 90}</Text>
                </View>

            </ScrollView>

            {totalAmount === 0 ? null : (
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 10, alignItems: "center", height: 100, gap: 20 }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Pay using Cash</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>Cash on Delivery</Text>
                    </View>
                    <View style={{ backgroundColor: "red", padding: 10, width: 70, flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1, borderRadius: 10 }}>
                        <View>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>{totalAmount + 90}</Text>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>TOTAL</Text>
                        </View>
                        <Pressable onPress={() => {
                            dispatch(cleanCart());
                            router.push({
                                pathname: "/order",
                                params: {
                                    name: params.name
                                }
                            })

                        }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Place Order</Text>
                        </Pressable>

                    </View>
                </View>
            )}

        </>
    )
}

export default cart;

const styles = StyleSheet.create({})