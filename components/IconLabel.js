import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import {FONTS, COLORS, SIZES, icons, images, dummyData} from '../constants';

const IconLabel = ({icon, label, iconStyle, containerStyle, labelStyle}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                paddingVertical: SIZES.base,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
        >
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    ...iconStyle
                }}
            />
            <Text
                style={{
                    marginLeft: SIZES.base,
                    ...FONTS.body3,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </View>
    )
}
export default IconLabel;