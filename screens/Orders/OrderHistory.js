import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { images, FONTS, SIZES, COLORS, icons } from "../../constants";
import { HeaderDetail, FormInput, IconButtonDetail, FooterTotal, CartQuantityButton } from "../../components";
import AxiosUtil from "../../utils/AxiosUtil";
import axios from "axios";

const OrderHistory = ({ navigation, route }) => {

    const [orderHistory, setOrderHistory] = React.useState([]);

    if(orderHistory.length == 0) {
        AxiosUtil.getToken().then((token) => {
            console.log("Token here"+token);
            axios.get('http://10.0.2.2:3001/orders/history-order', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setOrderHistory(res.data);
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    function renderHeaderDetail() {
        return (
            <HeaderDetail
                title="LỊCH SỬ ĐƠN HÀNG"
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

    function renderOrderHistory() {
        console.log("OrderHistory: "+orderHistory);

        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    data={orderHistory}
                    keyExtractor={item => `${item._id}`}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.padding,
                        paddingBottom: 120
                    }}
                    ListFooterComponent = {
                        <View
                            style={{
                                marginBottom: 120
                            }}
                        >

                        </View>

                    }
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                height: 100,
                                marginHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary,
                            }}
                            onPress={() =>
                                {
                                    console.log("Item: "+item)
                                    navigation.navigate("DeliveryStatus", {item: item})
                                }
                            }
                        >
                            <View
                                style={{
                                    width: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopLeftRadius: SIZES.radius,
                                    borderBottomLeftRadius: SIZES.radius,
                                    backgroundColor: COLORS.lightGray2
                                }}
                            >
                                {/* id of item */}
                                <Text style={{ ...FONTS.body4 }}>Mã: {item._id}</Text>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    paddingLeft: SIZES.radius,
                                    justifyContent: 'center'
                                }}
                            >
                                {/* name of item */}
                                <Text style={{ ...FONTS.h3, color: COLORS.white }}>Trạng thái: {item.status}</Text>
                                <Text style={{ ...FONTS.body4, color: COLORS.white }}>Địa chỉ: {item.receiveDestination}</Text>
                                <Text style={{ ...FONTS.body4, color: COLORS.white }}>Ngày đặt: {item.createdAt}</Text>
                            </View>
                        </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {renderHeaderDetail()}
            {renderOrderHistory()}
        </View>
    )
}

export default OrderHistory;