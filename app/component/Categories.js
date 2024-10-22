import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Categories = () => {
    const items = [
        {
            id: "1",
            name: "fastest delivery",
        },
        {
            id: "2",
            name: "rating 4.0+",
        },
        {
            id: "3",
            name: "offers",
        },
        {
            id: "4",
            name: "cuisines",
        },
        {
            id: "5",
            name: "MAX Safety",
        },
        {
            id: "6",
            name: "Pro",
        },
    ];
    return (
        <View>
            <FlatList horizontal showsHorizontalScrollIndicator={false} keyExtractor={({ item }) => item?.id} data={items} renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.8} style={{ marginTop: 5, }}>
                    <View style={{ backgroundColor: "#DB7093", padding: 10, borderRadius: 10, marginHorizontal: 10, marginVertical: 5 }}>
                        <Text style={{ color: "white", fontSize: 15 }}>
                            {item?.name}
                        </Text>
                    </View>

                </TouchableOpacity>
            )} />
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({})