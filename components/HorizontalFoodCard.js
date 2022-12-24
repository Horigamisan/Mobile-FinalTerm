import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, FlatList } from "react-native";
import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
    console.log(item.images);
    return (
        <TouchableOpacity
        style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            ...containerStyle,
        }}
        onPress={onPress}
        >
        {/* Image */}
        <Image
            source={{uri: item.images}}
            resizeMode="cover"
            style={{
            width: 80,
            height: 80,
            borderRadius: SIZES.radius,
            ...imageStyle,
            }}
        />
    
        {/* Details */}
        <View style={{ flex: 1}}>
            {/* Name & Description */}
            <View>
            <Text style={{ ...FONTS.h3, fontSize: 17 }}>{item.name}</Text>
            <Text style={{ ...FONTS.body4, color: COLORS.darkGray2}}>{item.description}</Text>
            </View>
            {/* Price*/}
            <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
            <Text style={{ ...FONTS.h3, fontSize: 17 }}>{item.price} VND</Text>
            </View>
            {/* Calories */}
            {/* <View
                style={{
                flexDirection: "row",
                position: "absolute",
                top : 1,
                right: SIZES.radius
                }}
            >
                <Image
                source={icons.calories}
                style={{
                    width: 30,
                    height: 30,
                }}
                />
                <Text style={{ ...FONTS.body5, color: COLORS.darkGray2 }}>
                {item.calories.toFixed(2)} calories
                </Text>
            </View> */}
        </View>
        </TouchableOpacity>
    );
    };
export default HorizontalFoodCard;