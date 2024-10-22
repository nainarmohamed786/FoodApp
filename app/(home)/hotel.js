import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { hotelList } from '../component/HotelsList';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FoodItem from '../component/FoodItem';
import { useSelector } from 'react-redux';
import Modal from "react-native-modal";

const hotel = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const filteredHotel = hotelList.find((hotel) => hotel.id === params.id);

    const cartReducer = useSelector((state) => state.cart.cart);



    const scrollViewRef = useRef(null);
    const scrollAnim = useRef(new Animated.Value(0)).current;
    const ITEM_HEIGHT = 650;

    const [modalVisible, setModalVisible] = useState(false);

    const scrollToCategory = (index) => {
        const yOffset = index * ITEM_HEIGHT;
        Animated.timing(scrollAnim, {
            toValue: yOffset,
            duration: 500,
            useNativeDriver: true
        }).start();
        scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
    }

    const menu = [
        {
            id: "20",
            name: "Recommended",
            items: [
                {
                    id: "101",
                    name: "Paneer 65",
                    price: 275,
                    description:
                        "This is served with Raita and gravy and has loaded with chilli paste mixed chicken Kebabs",
                    rating: 4.1,
                    ratings: 43,
                    image:
                        "https://www.chefkunalkapur.com/wp-content/uploads/2021/12/Paneer-65-1300x867.jpg?v=1639030023",
                    veg: true,
                    bestSeller: false,
                    quantity: 1,
                },
                {
                    id: "102",
                    name: "Chilly Chicken (Boneless)",
                    price: 285,
                    description:
                        "E: 604.42 KCal (163.36 KCal), C: 29.67 Grams (8.02 Grams), P: 50.63 Grams (13.68 Grams), F: 30.94 Grams (8.36 Grams)",
                    rating: 4.3,
                    ratings: 34,
                    image:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ42sGJwWnm4v-vi8xVMZXBiODs-N1DU9J_fQ&s",
                    veg: false,
                    bestSeller: true,
                    quantity: 1,
                },
                {
                    id: "103",
                    name: "Spl Veg Biryani",
                    price: 250,
                    description:
                        "E: 1327.35 KCal (126.41 KCal), C: 213.24 Grams (20.31 Grams), P: 26.99 Grams (2.57 Grams), F: 38.46 Grams (3.66 Grams)",
                    rating: 4.5,
                    ratings: 56,
                    image:
                        "https://madscookhouse.com/wp-content/uploads/2021/01/Subz-Vegetable-Biryani-1024x516.jpg",
                    veg: true,
                    bestSeller: false,
                    quantity: 1,
                },
                {
                    id: "104",
                    name: "Chilly Paneer",
                    price: 220,
                    description:
                        "E: 871.69 KCal (272.40 KCal), C: 21.54 Grams (6.73 Grams), P: 51.90 Grams (16.22 Grams), F: 64.36 Grams (20.11 Grams",
                    rating: 3.8,
                    ratings: 22,
                    image:
                        "https://madscookhouse.com/wp-content/uploads/2022/11/Garlic-Chilli-Paneer.jpg",
                    veg: true,
                    bestSeller: true,
                    quantity: 1,
                },
                {
                    id: "105",
                    name: "Chicken 65",
                    price: 300,
                    description:
                        "E: 544.39 KCal (155.54 KCal), C: 25.11 Grams (7.17 Grams), P: 45.15 Grams (12.90 Grams), F: 27.91 Grams (7.97 Grams)",
                    rating: 4.5,
                    ratings: 45,
                    image:
                        "https://i.ytimg.com/vi/0KdboN6Rkck/maxresdefault.jpg",
                    veg: false,
                    bestSeller: true,
                    quantity: 1,
                },
            ],
        },
        {
            id: "11",
            name: "Rice",
            items: [
                {
                    id: "201",
                    name: "Chicken Fried Rice",
                    price: 260,
                    description:
                        "E: 1142.26 KCal (163.18 KCal), C: 125.05 Grams (17.86 Grams), P: 40.11 Grams (5.73 Grams), F: 51.37 Grams (7.34 Grams)",
                    rating: 4.3,
                    ratings: 34,
                    image:
                        "https://i.ytimg.com/vi/rcbCY26CLX4/maxresdefault.jpg",
                    veg: false,
                    bestSeller: true,
                },
                {
                    id: "202",
                    name: "Egg Fried Rice",
                    price: 220,
                    description:
                        "E: 1729.51 KCal (164.72 KCal), C: 204.54 Grams (19.48 Grams), P: 44.03 Grams (4.19 Grams), F: 79.02 Grams (7.53 Grams)",
                    rating: 4.3,
                    ratings: 52,
                    image:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROvJ4F7GP3K__W5YBzs1Nmv9q7igl_dirrBA&s",
                    veg: false,
                    bestSeller: false,
                },
                {
                    id: "203",
                    name: "Veg Fried Rice",
                    price: 190,
                    description:
                        "E: 1477.00 KCal (140.67 KCal), C: 204.14 Grams (19.44 Grams), P: 22.90 Grams (2.18 Grams), F: 59.95 Grams (5.71 Grams)",
                    rating: 4.6,
                    ratings: 56,
                    image:
                        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/pycpbzawueci1dvhmkr3",
                    veg: true,
                    bestSeller: true,
                },
                {
                    id: "204",
                    name: "Jeera Rice",
                    price: 195,
                    description:
                        "E: 1832.30 KCal (174.50 KCal), C: 246.73 Grams (23.50 Grams), P: 27.51 Grams (2.62 Grams), F: 78.15 Grams (7.44 Grams)",
                    rating: 4.5,
                    ratings: 48,
                    image:
                        "https://www.indianhealthyrecipes.com/wp-content/uploads/2015/12/jeera-rice-recipe.jpg",
                    veg: true,
                    bestSeller: false,
                },
            ],
        },
    ];

    return (

        <>


            <ScrollView ref={scrollViewRef} style={{ padding: 10, flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", gap: 10 }}>
                        <Feather name="camera" size={24} color="black" />
                        <MaterialIcons name="bookmark-outline" size={24} color="black" />
                        <MaterialCommunityIcons name="share-outline" size={24} color="black" />
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>{filteredHotel.name}</Text>
                    <Text style={{ color: "gray", fontSize: 15 }}>{filteredHotel.cuisines}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "green", padding: 5, gap: 5, borderRadius: 10 }}>
                            <Text style={{ color: "white" }}>{filteredHotel.aggregate_rating}</Text>
                            <AntDesign name="star" size={18} color="white" />
                        </View>
                        <View >
                            <Text style={{ fontSize: 15 }}>3.2k Ratings</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: "green", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 }}>
                        <Text style={{ color: "white", fontSize: 16 }}>
                            30-40 mins . 6km | Bangalore
                        </Text>
                    </View>

                </View>

                {menu.map((items, index) => {
                    return (
                        <FoodItem key={items.id} items={items} />
                    )
                })}


            </ScrollView>
            <View style={{ flexDirection: "row", backgroundColor: "white" }}>

                {menu.map((item, index) => {
                    return (
                        <Pressable
                            onPress={() => scrollToCategory(index)}
                            key={item.id} style={{
                                paddingHorizontal: 7,
                                borderRadius: 4,
                                paddingVertical: 5,
                                marginVertical: 10,
                                marginHorizontal: 10,
                                alignItems: "center",
                                justifyContent: "center",
                                borderColor: "#181818",
                                borderWidth: 1,
                            }}>
                            <Text>{item.name}</Text>
                        </Pressable>
                    )
                })}

            </View>

            <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    right: 25,
                    bottom: cartReducer?.length > 0 ? 70 : 35,
                    backgroundColor: "black",
                }}
            >
                <Ionicons name="fast-food-outline" size={24} color="white" />
                <Text
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "500",
                        fontSize: 11,
                        marginTop: 3,
                    }}
                >
                    MENU
                </Text>
            </Pressable>

            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(!modalVisible)}>
                <View
                    style={{
                        height: 190,
                        width: 250,
                        backgroundColor: "black",
                        position: "absolute",
                        bottom: 35,
                        right: 10,
                        borderRadius: 7,
                    }}
                >
                    {menu?.map((item, index) => (
                        <View
                            style={{
                                padding: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                            key={item.id}
                        >
                            <Text
                                style={{ color: "#D0D0D0", fontWeight: "600", fontSize: 18 }}
                            >
                                {item?.name}
                            </Text>
                            <Text
                                style={{ color: "#D0D0D0", fontWeight: "600", fontSize: 18 }}
                            >
                                {item?.items?.length}
                            </Text>
                        </View>
                    ))}
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image
                            style={{ width: 120, height: 70, resizeMode: "contain" }}
                            source={{
                                uri: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza",
                            }}
                        />
                    </View>
                </View>
            </Modal>


            {cartReducer?.length > 0 && (
                <Pressable style={{ backgroundColor: "red", padding: 10, justifyContent: "center", alignItems: "center" }} onPress={() => router.push({
                    pathname: "/cart",
                    params: {
                        name: filteredHotel.name
                    }
                })}>

                    <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>{cartReducer.length} items added</Text>
                    <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>Add items worth 240 to reduce surge fee by Rs 35.</Text>

                </Pressable>
            )}

        </>
    )
}

export default hotel

const styles = StyleSheet.create({})