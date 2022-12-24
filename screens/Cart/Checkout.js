import React from "react";
import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { images, FONTS, SIZES, COLORS, icons } from "../../constants";
import { HeaderDetail, FormInput, IconButtonDetail, FooterTotal, CartQuantityButton } from "../../components";
import axios from "axios";

const Checkout = ({ navigation, route }) => {
    var item = (route?.params?.item || '');
    const [deliveryAddress, setDeliveryAddress] = React.useState("");

    function renderHeaderDetail() {
        return (
            <HeaderDetail
                title="THANH TOÁN"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 40,
                }}
                leftComponent={
                    <IconButtonDetail
                        icon={icons.back}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            borderWidth: 1,
                            borderColor: COLORS.gray2
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray2
                        }}
                        onPress={() => navigation.goBack()}
                    />
                }
                rightComponent={
                    <CartQuantityButton
                        quantity={3}
                    />
                }
            >

            </HeaderDetail>
        )
    }

    function renderDeliveryAddr(){
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                }}
            >
                <Text style={{ ...FONTS.h3 }}>Địa chỉ nhận hàng</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center',
                        paddingVertical: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: SIZES.radius,
                        borderWidth: 2,
                        borderColor: COLORS.lightGray2,

                    }}
                >
                    <Image
                        source={icons.location1}
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                    <FormInput
                        containerStyle={{
                            flex: 1,
                            marginLeft: SIZES.radius,
                            borderBottomColor: 'transparent',
                            backgroundColor: 'transparent',
                        }}
                        inputStyle={{
                            ...FONTS.body3
                        }}
                        placeholder="Nhập địa chỉ nhận hàng"
                        value={deliveryAddress}
                        onChange={text => setDeliveryAddress(text)}
                    />
                </View>
            </View>
        )
    }

    function renderProductsAndShops(){
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeaderDetail()}
            {/* Body */}
            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                extraScrollHeight={-200}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 20
                }}
            >
            {/* Render delivery address*/}
            {renderDeliveryAddr()}
            {/* Render products and its shop */}
            {renderProductsAndShops()}
            </KeyboardAwareScrollView>
            <FooterTotal
                subTotal={item.subTotal}
                shippingFee={item.shippingFee}
                total={item.subTotal + item.shippingFee}
                onPress={() => (
                    axios.post('http://10.0.2.2:3001/orders', {
                        receiveDestination: deliveryAddress,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${item.token}`
                        }
                    }).then(res => {
                        console.log("Đơn hàng: " + res.data);
                        navigation.navigate("Success")
                    }).catch(err => {
                        console.log(err+" TOken:"+item.token);
                    })
                )}
            />
        </View>
    )
}
export default Checkout;