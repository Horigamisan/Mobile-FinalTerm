import React from "react";
import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { images, FONTS, SIZES, COLORS, icons } from "../../constants";
import { HeaderDetail, FormInput, IconButtonDetail, FooterTotal, CartQuantityButton } from "../../components";
import AxiosUtil from "../../utils/AxiosUtil";

const DetailProfile = ({ navigation, route }) => {

    const [profile, setProfile] = React.useState({});
    AxiosUtil.getProfile().then((res) => {
        setProfile(res);
    })

    function renderHeaderDetail() {
        return (
            <HeaderDetail
                title="THÔNG TIN CÁ NHÂN"
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
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Name */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>Họ và tên</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                            height: 50,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            paddingHorizontal: SIZES.radius
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: SIZES.radius,
                                ...FONTS.body3
                            }}
                        >
                            {profile.name}
                    </Text>
                    </View>
                </View>

                {/* Phone */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>Số điện thoại</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                            height: 50,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            paddingHorizontal: SIZES.radius
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: SIZES.radius,
                                ...FONTS.body3
                            }}
                        >
                            {profile.tel}
                    </Text>
                    </View>
                </View>

                {/* Email */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>Email</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                            height: 50,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            paddingHorizontal: SIZES.radius
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: SIZES.radius,
                                ...FONTS.body3
                            }}
                        >
                            {profile.email}
                    </Text>
                    </View>
                </View>

                {/* Birthday*/}
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>Ngày tháng năm sinh</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                            height: 50,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            paddingHorizontal: SIZES.radius
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: SIZES.radius,
                                ...FONTS.body3
                            }}
                        >
                            {profile.birthDate}
                    </Text>
                    </View>
                </View>

                {/* Gender*/}
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>Giới tính</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                            height: 50,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2,
                            alignItems: 'center',
                            paddingHorizontal: SIZES.radius
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: SIZES.radius,
                                ...FONTS.body3
                            }}
                        >
                            {profile.gender}
                    </Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default DetailProfile;