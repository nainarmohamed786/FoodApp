import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';

const Carousel = () => {
    const images = [
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://static.vecteezy.com/system/resources/thumbnails/023/809/530/small_2x/a-flying-burger-with-all-the-layers-ai-generative-free-photo.jpg",
    ];
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((image, index) => {
                return (
                    <Image key={index} source={{ uri: image }} style={{ margin: 10, width: 300, height: 200, borderRadius: 10 }} />
                )
            })}
        </ScrollView>
    )
}

export default Carousel

const styles = StyleSheet.create({})