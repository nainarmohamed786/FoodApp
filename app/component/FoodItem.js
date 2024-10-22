import { Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import MenuItem from './MenuItem';

const FoodItem = ({ items }) => {
    const data = [items];


    return (
        <View style={{ marginTop: 10 }}>
            {data.map((items, index) => {
                return (
                    <>


                        <Pressable key={index} >

                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{items.name}({items?.length})</Text>
                                <AntDesign name="down" size={20} color="black" />
                            </View>

                        </Pressable>

                        {items?.items.map((menu) => {

                            return (
                                <MenuItem menu={menu} />
                            )
                        })}

                    </>
                )
            })}
        </View>
    )
}

export default FoodItem

const styles = StyleSheet.create({})