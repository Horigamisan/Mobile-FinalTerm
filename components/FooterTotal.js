import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Platform, Image } from "react-native";
import {COLORS, FONTS, SIZES, constants, icons} from "../constants";
import {TextButton, LineDivider} from "../components";
import {LinearGradient} from 'expo-linear-gradient';

export default FooterTotal = ({subTotal, shippingFee, total, onPress}) => {
    return (
        <View>
            {/* Shadow*/}
            <LinearGradient
                start={{x: 0, y: 0}}
                end = {{x: 0, y: 1}}
                colors={[COLORS.transparent, COLORS.lightGray1]}
                style={{
                    position: 'absolute',
                    top: -15,
                    left: 0,
                    right: 0,
                    height: Platform.OS === 'ios' ? 200: 50,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}
            />

            {/* Order details */}
            <View
                style={{
                    padding: SIZES.padding,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: COLORS.white,
                }}
            >
                {/* Subtotal */}
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >   
                    <Text style={{flex: 1, ...FONTS.body3}}>Tổng hàng</Text>
                    <Text style={{...FONTS.h3}}>{subTotal} VND</Text>
                </View>
                {/* Shipping Fee */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                        marginBottom: SIZES.padding,
                    }}
                >
                    <Text style={{flex: 1, ...FONTS.body3}}>Tiền phí vận chuyển</Text>
                    <Text style={{...FONTS.h3}}>{shippingFee} VND</Text>
                </View>
                {/* Line Divider */}
                <LineDivider />
                {/* Total */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.padding,
                    }}
                >
                    <Text style={{flex: 1, ...FONTS.h2}}>Tổng cộng:</Text>
                    <Text style={{...FONTS.h2}}>{total} VND</Text>
                </View>
                {/* Button */}
                <TextButton
                    buttonContainerStyle={{
                        height: 60,
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary,
                    }}
                    label="Đặt hàng"
                    onPress={onPress}
                />
            </View>
        </View>
    )
}