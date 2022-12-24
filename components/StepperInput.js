import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

import { IconButton } from '../components';
import { FONTS, COLORS, SIZES, icons, images, dummyData } from '../constants';

const StepperInput = ({containerStyle, value = 1, onAdd, onMinus}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 60,
                width: 130,
                backgroundColor: COLORS.lightGray2,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
        >
            <IconButton
                containerStyle={{
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                icon={icons.minus}
                iconStyle={{
                    height: 25,
                    width: 25,
                    tintColor: value > 1 ? COLORS.primary : COLORS.gray2
                }}
                onPress={onMinus}
            >
            </IconButton>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ ...FONTS.h2 }}>{value}</Text>
            </View>

            <IconButton
                containerStyle={{
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                icon={icons.plus}
                iconStyle={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.primary 
                }}
                onPress={onAdd}
            >
            </IconButton>
        </View>
    )
}
export default StepperInput;