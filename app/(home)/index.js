import { Alert, Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import Carousel from '../component/Carousel';
import { recommened } from '../component/Recommend';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Categories from '../component/Categories';
import { hotelItems } from '../component/HotelItems';
import { hotelList } from '../component/HotelsList';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToLocation } from '../redux/LocationReducer';


const index = () => {
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
        "fetching your location ..."
    );
    const [searchText,SetSearchText]=useState("");
    
    const dispatch=useDispatch();

    const router = useRouter()
    const [data, setData] = useState([]);

    const locationCoords=useSelector((state)=>state.location.location);

    console.log("Location finder",locationCoords)

    useEffect(() => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }, []);

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();

        if (!enabled) {
            Alert.alert(
                "Location Services not enabled",
                "Please enable your location services to continue",
                [{ text: "OK" }],
                { cancelable: false }
            );
        } else {
            setLocationServicesEnabled(true);
        }
    };

    // const GetCurrentLocation = async () => {
    //     let { status } = await Location.requestBackgroundPermissionsAsync();

    //     if (status !== "granted") {
    //         Alert.alert(
    //             "Permission not granted",
    //             "Allow the app to use the location service",
    //             [{ text: "OK" }],
    //             { cancelable: false }
    //         );
    //     }

    //     const location = await Location.getCurrentPositionAsync({
    //         accuracy: Location.Accuracy.High,
    //     });
    //     console.log(location);
    //     let { coords } = await Location.getCurrentPositionAsync();
    //     if (coords) {
    //         const { latitude, longitude } = coords;

    //         let response = await Location.reverseGeocodeAsync({
    //             latitude,
    //             longitude,
    //         });

    //         const address = await LocationGeocoding.reverseGeocodeAsync({
    //             latitude,
    //             longitude,
    //         });


    //         const streetAddress = address[0].name;
    //         for (let item of response) {
    //             let address = `${item.name}, ${item?.postalCode}, ${item?.city}`;

    //             setDisplayCurrentAddress(address);
    //         }
    //     }
    // };


    const GetCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== "granted") {
                Alert.alert(
                    "Permission not granted",
                    "Allow the app to use the location service",
                    [{ text: "OK" }],
                    { cancelable: false }
                );
                return; // Stop execution if permission isn't granted
            }
    
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
    
            let { coords } = location;
            if (coords) {
                const { latitude, longitude } = coords;
    
                let response = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                });

                dispatch(addToLocation(coords))
              
    
                const streetAddress = response[0].name;
                let address = `${response[0].name}, ${response[0]?.postalCode}, ${response[0]?.city}`;
    
                setDisplayCurrentAddress(address);
            }
        } catch (error) {
            console.log("Error while getting location: ", error);
        }
    };
    


    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                    <EvilIcons name="location" size={24} color="#E52850" />

                </View>
                <View style={{ width: 200, flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: 500 }}>Delivery To</Text>
                    <Text style={{ color: "gray", fontSize: 16, marginTop: 3 }}>{displayCurrentAddress}.</Text>
                </View>
                <View>
                    <Pressable style={{ backgroundColor: "#6CB4EE", width: 40, height: 40, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: 15 }}>9R</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 5, borderColor: "black", borderWidth: 1, flexDirection: "row", justifyContent: "space-between", padding: 7, borderRadius: 10, alignItems: "center" }}>
                <TextInput placeholder='Search for food, hotels' style={{ fontSize: 16 }} onChangeText={(text)=>SetSearchText(text)} />
                <Feather name="search" size={18} color="#E52850" />
            </View>

            <Carousel />
            <Categories />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                {recommened.map((recom, index) => {
                    return (
                        <Pressable key={recom.id} style={{ margin: 10, backgroundColor: "white", flexDirection: "row", borderRadius: 10 }}>
                            <View>
                                <Image source={{ uri: recom.image }} style={{ width: 100, height: 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{recom.name}</Text>
                                <Text style={{ color: "gray", fontSize: 15 }}>{recom.type}</Text>

                                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <MaterialIcons name="access-time-filled" size={24} color="green" />
                                    <Text style={{ fontSize: 15 }}>{recom.time} mins</Text>
                                </View>
                            </View>
                        </Pressable>
                    )
                })}

            </ScrollView>

            <Text style={{ letterSpacing: 5, color: "gray", fontSize: 16, textAlign: "center" }}>EXPLORE</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {hotelItems.map((items, index) => {
                    return (
                        <View key={items.id} style={{ borderWidth: 1, borderColor: "gray", backgroundColor: "white", padding: 10, marginTop: 10, marginHorizontal: 10, justifyContent: "center", alignItems: "center" }}>
                            <View>
                                <Image source={{ uri: items.image }} style={{ width: 50, height: 50 }} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ textAlign: "center", fontSize: 15 }}>{items.name}</Text>
                                <Text style={{ textAlign: "center", fontSize: 15 }}>{items.description}</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>


            <Text style={{ letterSpacing: 5, color: "gray", fontSize: 16, textAlign: "center", marginTop: 10 }}>ALL RESTAURANT</Text>

            <View>
                {hotelList.map((listed, index) => {

                    if(listed.name.toLowerCase().includes(searchText.toLowerCase())){
                      if(searchText ===""){
                        return(
                            <Pressable key={listed.id} style={{ backgroundColor: "white", width: 300, marginLeft: "auto", marginRight: "auto", marginVertical: 20, borderRadius: 10 }} onPress={() => router.push({
                                pathname: "/hotel",
                                params: {
                                    id: listed.id
                                }
                            })}>
                                <Image source={{ uri: listed.featured_image }} style={{ width: 300, height: 300, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
    
                                <View style={{ padding: 10, }}>
                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{listed.name}</Text>
                                            <Text style={{ color: "gray", fontSize: 14, marginTop: 5 }}>
                                                {listed.cuisines}
                                            </Text>
                                            <Text style={{ marginTop: 5 }}>{listed.time}</Text>
                                        </View>
                                        <View style={{ backgroundColor: "green", padding: 5, flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 10 }}>
                                            <Text>{listed.aggregate_rating}</Text>
                                            <Fontisto name="star" size={18} color="white" />
    
                                        </View>
                                    </View>
                                    <Text style={{ borderBottomColor: "gray", borderBottomWidth: 2 }} />
                                    <View style={{ marginTop: 10, gap: 5, alignItems: "center", flexDirection: 'row' }}>
    
                                        <MaterialCommunityIcons name="brightness-percent" size={19} color="blue" />
                                        <Text style={{ color: "blue" }}>20% OFF up to Rs 100</Text>
                                    </View>
                                </View>
                            </Pressable>
                        )
                      }
                      return (
                        <Pressable key={listed.id} style={{ backgroundColor: "white", width: 300, marginLeft: "auto", marginRight: "auto", marginVertical: 20, borderRadius: 10 }} onPress={() => router.push({
                            pathname: "/hotel",
                            params: {
                                id: listed.id
                            }
                        })}>
                            <Image source={{ uri: listed.featured_image }} style={{ width: 300, height: 300, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />

                            <View style={{ padding: 10, }}>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{listed.name}</Text>
                                        <Text style={{ color: "gray", fontSize: 14, marginTop: 5 }}>
                                            {listed.cuisines}
                                        </Text>
                                        <Text style={{ marginTop: 5 }}>{listed.time}</Text>
                                    </View>
                                    <View style={{ backgroundColor: "green", padding: 5, flexDirection: "row", alignItems: "center", gap: 5, borderRadius: 10 }}>
                                        <Text>{listed.aggregate_rating}</Text>
                                        <Fontisto name="star" size={18} color="white" />

                                    </View>
                                </View>
                                <Text style={{ borderBottomColor: "gray", borderBottomWidth: 2 }} />
                                <View style={{ marginTop: 10, gap: 5, alignItems: "center", flexDirection: 'row' }}>

                                    <MaterialCommunityIcons name="brightness-percent" size={19} color="blue" />
                                    <Text style={{ color: "blue" }}>20% OFF up to Rs 100</Text>
                                </View>
                            </View>
                        </Pressable>
                      )
                    }
                   
                })}
            </View>



        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})