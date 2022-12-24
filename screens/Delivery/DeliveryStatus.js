import React from "react";
import { View, Text, Image, ScrollView} from "react-native";

import { images, FONTS, SIZES, COLORS, icons, constants } from "../../constants";
import { HeaderDetail, FormInput, IconButtonDetail,
     FooterTotal, CartQuantityButton, TextButton, LineDivider, TextIconButton} from "../../components";
import AxiosUtil from "../../utils/AxiosUtil";

const DeliveryStatus = ({ navigation, route }) => {

    const [item, setItem] = React.useState(route.params.item);
    const [currentStatus, setCurrentStatus] = React.useState(statusCheck());
    function statusCheck() {
        if (item.status == "unverified") {
            return 0;
        }
        if (item.status == "verified") {
            return 1;
        }
        if (item.status == "in progress") {
            return 2;
        }
        if (item.status == "delivered") {
            return 3;
        }
        if (item.status == "rated") {
            return 4;
        }
        return 0;
    }

    function timeToTake() {
        return Math.floor(Math.random() * 10) + 10;
    }

    function renderHeaderDetail() {
        return (
            <HeaderDetail
                title="TRẠNG THÁI ĐƠN HÀNG"
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

    function renderInfo() {
        return(
            <View
                style={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: COLORS.gray,
                        ...FONTS.body4
                    }}
                >
                    Ứơc tính thời gian giao hàng
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        ...FONTS.h2
                    }}
                >
                    {timeToTake()} phút
                </Text>
            </View>
        )
    }

    function renderTrackOrder(){
        return (
            <View
                style = {{
                    marginTop: SIZES.padding,
                    paddingVertical: SIZES.padding,
                    borderRadius: SIZES.radius,
                    borderWidth: 2,
                    borderColor: COLORS.lightGray2,
                    backgroundColor: COLORS.white2,
                }}
            >
                {/* Track order*/}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                        paddingHorizontal: SIZES.padding,
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>Mã giao hàng</Text>
                    <Text style={{ ...FONTS.h3, color: COLORS.gray }}>{item._id}</Text>
                </View>

                <LineDivider 
                    lineStyle={
                        {backgroundColor: COLORS.lightGray2}
                    }
                />
                {/* Order status*/}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding,
                    }}
                >
                    {constants.track_order_status.map((item, index) => {
                        return (
                            <View
                                key={`StatusList-${index}`}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: -5,
                                    }}
                                >
                                    <Image
                                        source={icons.check_circle}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            tintColor: index <= currentStatus ? COLORS.primary : COLORS.lightGray1
                                        }}
                                    />

                                    <View
                                        style={{
                                            marginLeft: SIZES.radius,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.h3,
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                        <Text
                                            style={{
                                                color: COLORS.gray,
                                                ...FONTS.body4
                                            }}
                                        >
                                            {item.sub_title}
                                        </Text>
                                    </View>
                                </View>
                                {index < constants.track_order_status.length - 1 && (
                                    <View>
                                        {index < currentStatus && (
                                            <View
                                                style={{
                                                    height: 50,
                                                    width: 3,
                                                    marginLeft: 18,
                                                    backgroundColor: COLORS.primary,
                                                    zIndex: -1
                                                }}
                                            />
                                        )}
                                        {index >= currentStatus && (
                                            <Image
                                                source={icons.dotted_line}
                                                resizeMode="cover"
                                                style={{
                                                    width: 4,
                                                    height: 50,
                                                    marginLeft: 17
                                                }}
                                            />
                                        )}
                                    </View>
                                )}

                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginBottom: SIZES.padding,
                }}
            >
                {currentStatus < constants.track_order_status.length - 1 && (
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 55
                        }}
                    >
                        {/* Cancel */}
                        <TextButton
                            buttonContainerStyle={{
                                width: "40%",
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.lightGray2,
                            }}
                            label="Hủy đơn hàng"
                            labelStyle={{
                                color: COLORS.primary,
                            }}
                            backgroundColor={COLORS.lightGray2}
                            onPress={() => console.log("Cancel")}
                        />
                        {/* Rate */}
                        <TextIconButton
                            containerStyle={{
                                flex: 1,
                                marginLeft: SIZES.base,
                                borderRadius: SIZES.base,
                                backgroundColor: COLORS.primary
                            }}
                            label="Đánh giá"
                            labelStyle={{
                                color: COLORS.white,
                            }}
                            icon={icons.star}
                            iconPosition="LEFT"
                            iconStyle={{
                                tintColor: COLORS.white,
                            }}
                            onPress={() => console.log("Rate")}
                        />
                    </View>
                )}
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            {/* Header */}
            {renderHeaderDetail()}
            {/* Info*/}
            {renderInfo()}
            {/* Trach order*/}
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {renderTrackOrder()}
            </ScrollView>
            {/* Footer */}
            {renderFooter()}
        </View>
    )
}
export default DeliveryStatus;