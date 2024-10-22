import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { addToCart, decreaseQuantity, increaseQuantity, removeToCart } from '../redux/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

const MenuItem = ({ menu }) => {

    const [selected, setSelected] = useState(false);
    const [addItems, setAddItems] = useState(0);;

    const dispatch = useDispatch();

    const cartReducer = useSelector((state) => state.cart.cart);

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <View>
                <Text>{menu.name}</Text>
                <Text>₹{menu.price}</Text>
                <View style={{ flexDirection: "row" }}>
                    {[0, 0, 0, 0, 0].map((en, i) => {
                        return (
                            <View key={i}>
                                <AntDesign name={i < Math.floor(menu.rating) ? "star" : "staro"} size={24} color="gold" />
                            </View>
                        )
                    })}
                </View>

                <Text style={{ color: "gray" }}>{menu.description.length > 40 ? menu.description.substr(0, 30) + "..." : menu.description}</Text>
            </View>

            <View>
                <Image source={{ uri: menu.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />

                {selected ? (
                    <Pressable style={{
                        backgroundColor: "red", borderColor: "pink", borderWidth: 1, padding: 7, borderRadius: 10, position: "absolute", top: "65%", left: "10%",
                        width: 80, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 5
                    }}>
                        <Pressable onPress={() => {
                            {
                                if (addItems == 1) {
                                    dispatch(removeToCart(menu));
                                    setAddItems(0);
                                    setSelected(false);
                                    return
                                }
                                setAddItems((c) => c - 1);
                                dispatch(decreaseQuantity(menu))

                            }
                        }}>
                            <AntDesign name="minus" size={20} color="white" />
                        </Pressable>
                        <Text style={{ fontSize: 17, color: "white" }}>{addItems}</Text>
                        <Pressable onPress={() => {
                            setAddItems((c) => c + 1);
                            dispatch(increaseQuantity(menu))
                        }}>
                            <Ionicons name="add" size={20} color="white" />
                        </Pressable>
                    </Pressable>
                ) : (
                    <Pressable style={{ backgroundColor: "white", borderColor: "pink", borderWidth: 1, padding: 7, borderRadius: 10, position: "absolute", top: "65%", left: "10%", paddingHorizontal: 20 }} onPress={() => {
                        setSelected(true);
                        setAddItems((c) => c + 1);
                        dispatch(addToCart(menu))
                    }} >
                        <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>Add</Text>
                    </Pressable>
                )}


            </View>


        </View >
    )
}

export default MenuItem

const styles = StyleSheet.create({})