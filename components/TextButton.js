import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, Image } from "react-native";
import {COLORS, FONTS, SIZES, constants, icons} from "../constants";

const TextButton = ({label, buttonContainerStyle, labelStyle, onPress, label2="", label2Style, backgroundColor= COLORS.primary}) => {
    return (
        <TouchableOpacity
            style={{    
                alignItems: 'center',
                justifyContent: 'center',
                ...buttonContainerStyle,
                backgroundColor: backgroundColor,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
            
            {label2 != "" &&
                <Text
                    style={{
                        flex: 1,
                        color: COLORS.white,
                        ...FONTS.h3,
                        ...label2Style,
                        textAlign: 'right',
                    }}
                >
                    {label2}
                </Text>
            }
        </TouchableOpacity>
    )
}
export default TextButton;