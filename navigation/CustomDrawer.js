import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    createDrawerNavigator,
    DrawerContentScrollView, 
} from "@react-navigation/drawer";
import { MainLayout } from "../screens";
import { COLORS, icons, SIZES, FONTS, constants, dummyData } from "../constants";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
  } from "react-native-reanimated";
import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabAction";
import { StackActions, NavigationActions } from '@react-navigation/native';
import AxiosUtil from "../utils/AxiosUtil";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                marginBottom: SIZES.base,
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white,
                }}
            />
            <Text
                style={{
                    marginLeft: 15,
                    color: COLORS.white,
                    ...FONTS.h3,
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({ navigation , selectedTab, setSelectedTab, profile}) => {
    
    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.radius,
                }}
            >
                {/* Close */}
                <View
                    style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            source={icons.cross}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: COLORS.white,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {/* Profile */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate("DetailProfile")}
                >
                    <Image
                        source={dummyData.myProfile?.profile_image}
                        resizeMode="cover"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius,
                        }}
                    />
                    <View
                        style={{
                            marginLeft: SIZES.radius,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.h3,
                            }}
                        >
                            {/* {dummyData.myProfile?.name} */}
                            {profile?.name}
                            
                        </Text>
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body4,
                            }}
                        >
                            Xem trang cá nhân
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* Drawer Items */}
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding,
                    }}
                >
                    <CustomDrawerItem
                        label="Trang chủ"
                        icon={icons.home}
                        isFocused={selectedTab === constants.screens.home}
                        onPress={() => {
                            setSelectedTab(constants.screens.home)
                            navigation.navigate("MainLayout")
                        }}
                    />
                    <CustomDrawerItem
                        label="Ví của tôi"
                        icon={icons.wallet}
                        isFocused={selectedTab === constants.screens.my_wallet}
                        onPress={() => {
                            setSelectedTab(constants.screens.my_wallet)
                            navigation.navigate("MainLayout")
                        }}
                    />
                    <CustomDrawerItem
                        label="Thông báo"
                        icon={icons.notification}
                        isFocused={selectedTab === constants.screens.notification}
                        onPress={() => {
                            setSelectedTab(constants.screens.notification)
                            navigation.navigate("MainLayout")
                        }}
                    />
                    <CustomDrawerItem
                        label="Yêu thích"
                        icon={icons.favourite}
                        isFocused={selectedTab === constants.screens.favourite}
                        onPress={() => {
                            setSelectedTab(constants.screens.favourite)
                            navigation.navigate("MainLayout")
                        }}
                    />
                    <CustomDrawerItem
                        label={constants.screens.about}
                        icon={icons.about}
                        isFocused={selectedTab === constants.screens.about}
                        onPress={() => {
                            setSelectedTab(constants.screens.about)
                            navigation.navigate("MainLayout")
                        }}
                    />
                    {/* Line Divider */}
                    <View
                        style={{
                            height: 1,
                            marginVertical: SIZES.radius,
                            marginLeft: SIZES.radius,
                            backgroundColor: COLORS.lightGray1,
                        }}
                    />
                    <CustomDrawerItem
                        label="Lịch sử đặt hàng"
                        icon={icons.location}
                        onPress={() => navigation.navigate("OrderHistory")}
                    />
                    <CustomDrawerItem
                        label="Mã giảm giá"
                        icon={icons.coupon}
                    />
                    <CustomDrawerItem
                        label="Cài đặt"
                        icon={icons.setting}
                    />
                    <CustomDrawerItem
                        label="Mời bạn bè"
                        icon={icons.profile}
                    />
                    <CustomDrawerItem
                        label="Trung tâm trợ giúp"
                        icon={icons.help}
                    />
                </View>
                <View
                    style={{
                        marginBottom: SIZES.padding,
                    }}
                >
                    <CustomDrawerItem
                        label="Đăng xuất"
                        icon={icons.logout}
                        onPress={() => 
                              AsyncStorage.removeItem('profile').then(() => {
                                        AsyncStorage.removeItem('token').then(() => {
                                                navigation.reset({
                                                index: 1,
                                                routes: [{name: "SignIn"}]
                                            })  
                                        })  
                                }
                            )
                        }
                    />
                </View>

            </View>
        </DrawerContentScrollView>
    )
}

export const CustomDrawer = ({selectedTab, setSelectedTab, navigation}) => {
    const [progress, setProgress] = React.useState(new Animated.Value(0));
    const [profile, setProfile] = React.useState(null);
    //set profile
    if(profile == null) {
        AxiosUtil.getProfile().then((data) => {
            setProfile(data)
        });
    }
    
    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });

    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = { borderRadius, transform: [{ scale }] };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.primary,
            }}
        >
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                    flex: 1,
                    width: '65%',
                    paddingRight: 20,
                    backgroundColor: 'transparent',
                    },
                    drawerType: "slide",
                    overlayColor: "transparent",
                    sceneContainerStyle: {
                        backgroundColor: "transparent",
                    },
                }}
                initialRouteName="MainLayout"
                drawerContent={props => {
                    setTimeout(() => {
                        setProgress(props.progress);

                    }, 0);
                    return (
                        <CustomDrawerContent  
                            navigation = {props.navigation}
                            selectedTab={selectedTab}
                            setSelectedTab={setSelectedTab}
                            profile={profile}
                        />
                    )
                }}
            >
                <Drawer.Screen name="MainLayout">
                    {props => <MainLayout {...props} 
                        drawerAnimationStyle={animatedStyle}
                    />}  
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => dispatch(setSelectedTab(selectedTab))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);