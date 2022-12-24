import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, Image } from "react-native";
import {COLORS, FONTS, SIZES, constants, icons} from "../constants";

const IconButton = ({icon, containerStyle, onPress, iconStyle, tintColor}) => {
    return (
        <TouchableOpacity
            style={{
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 30,
                    height: 30,
                    ...iconStyle,
                    tintColor: iconStyle.tintColor ? iconStyle.tintColor : COLORS.gray2,
                }}
            />
        </TouchableOpacity>
    )
}

export default IconButton;