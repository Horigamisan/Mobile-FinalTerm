import React from "react";
import {COLORS} from "../constants";
import {View} from "react-native";

const LineDivider = ({lineStyle}) => {
    return (
        <View
            style={{
                width: "100%",
                height: 2,
                backgroundColor: COLORS.lightGray2,
                ...lineStyle
            }}
        >

        </View>
    )
}

export default LineDivider;