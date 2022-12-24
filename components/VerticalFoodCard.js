import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, FlatList } from "react-native";
import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";

const VerticalFoodCard = ({ containerStyle, item, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                width: 200,
                padding: SIZES.radius,
                alignItems: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle,
            }}
            onPress={onPress}
        >
            {/* Calories and Favourite*/}
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                    }}
                >
                <Text style={{
                    color: COLORS.darkGray,
                    ...FONTS.body5
                }}>
                    {item.calories} Calories
                </Text>
                </View>
                <Image
                    source={icons.love}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: item.isFavourite ? COLORS.primary : COLORS.darkGray,
                    }}
                />
            </View>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 150,
                    height: 150,
                }}
            >
                <Image
                    source={item.image}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
            <View
                    style={{
                        alignItems: "center",
                        marginTop: -20
                    }}
                >
                    <Text style={{
                        ...FONTS.h3
                    }}>
                        {item.name}
                    </Text>
                    <Text style={{
                        color: COLORS.darkGray2,
                        ...FONTS.body5,
                        textAlign: "center"
                    }}>
                        {item.description}
                    </Text>

                    <Text style={{
                        marginTop: SIZES.radius,
                        ...FONTS.h2
                    }}>
                        ${item.price}
                    </Text>
                </View>
        </TouchableOpacity>
    )
}

export default VerticalFoodCard;
