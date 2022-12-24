import React from "react";
import { View, Text, BackHandler, Image, TouchableOpacity } from "react-native";
import { COLORS, images, SIZES, FONTS } from "../../constants";
import {TextButton} from "../../components";

const Success = ({ navigation }) => {
    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
        return () => backHandler.remove();
    }, [])
    return (
        <View style={{ flex: 1, paddingHorizontal: SIZES.padding, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={images.success}
                    resizeMode="contain"
                    style={{
                        width: 150,
                        height: 150,

                    }}
                ></Image>
                <Text style={{marginTop: SIZES.padding, ...FONTS.h1}}
                >Chúc mừng bạn!</Text>
                <Text
                    style={{
                        textAlign: 'center',
                        marginTop: SIZES.base,
                        color: COLORS.darkGray,
                        ...FONTS.body3
                    }}
                >Đơn hàng bạn đặt đã thành công!</Text>
            </View>

            <TextButton
                label="Done"
                buttonContainerStyle={{
                    height: 55,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )           
}

export default Success;