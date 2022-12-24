import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

import {
    FONTS,
    COLORS,
    SIZES,
    icons,
    images,
    dummyData
} from '../../constants';
import HeaderDetail from '../../components/HeaderDetail';
import IconButtonDetail from '../../components/IconButtonDetail';
import CartQuantityButton from '../../components/CartQuantityButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconLabel, StepperInput, LineDivider, TextButton } from '../../components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AxiosUtil from '../../utils/AxiosUtil';

const FoodDetail = ({navigation, route}) => {
    var item = route?.params?.item || '';
    navigation = navigation ? navigation : useNavigation();
    const [footItem, setFoodItem] = React.useState(item);
    const [quantity, setQuantity] = React.useState(1);
    function renderHeaderDetail() {
        return (
            <HeaderDetail
                title="CHI TIẾT MÓN ĂN"
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
                        quantity=""
                        onPress={() => navigation.navigate('Cart')}
                    />
                }
            >

            </HeaderDetail>
        )
    }

    function renderDetails(){
        return(
            <View
                style={{
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Food Card*/}
                <View
                    style={{
                        height: 190,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2
                    }}
                >
                {/* Calories & Favourite*/}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: SIZES.base,
                            paddingHorizontal: SIZES.radius
                        }}
                    >
                        {/* Calories */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                source={icons.calories}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                            <Text
                                style={{
                                    color: COLORS.darkGray2,
                                    ...FONTS.body4
                                }}
                            >
                                {footItem?.calories} Calories
                            </Text>
                        </View>
                        {/* Favourite */}
                        <Image
                            source={icons.love}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: footItem?.isFavourite ? COLORS.primary : COLORS.gray
                            }}
                        />
                    </View>
                    {/* Food Image */}
                    <Image
                        source={{uri: footItem?.images}}
                        resizeMode="contain"
                        style={{
                            width: "100%",
                            height: 170,
                            alignSelf: 'center'
                        }}
                    />
                </View>
                {/* Food Info */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                    }}
                >
                    {/* Name & Description */}
                    <Text
                        style={{
                            ...FONTS.h1
                        }}
                    >
                        {footItem?.name}
                    </Text>
                    <Text
                        style={{
                            marginTop: SIZES.base,
                            color: COLORS.darkGray2,
                            ...FONTS.body3
                        }}
                    >
                        {footItem?.description}
                    </Text>

                    {/* Ratings, Sold quantity & Shipping*/}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.padding,
                        }}
                    >
                        {/* Ratings */}
                        <IconLabel
                            containerStyle={{
                                backgroundColor: COLORS.primary
                            }}
                            icon={icons.star}
                            label={footItem?.sumOfRating}
                            labelStyle={{
                                color: COLORS.white,
                            }}
                        />
                        {/* Sold quantity */}
                        <IconLabel
                            containerStyle={{
                                marginLeft: SIZES.radius,
                                paddingHorizontal: 0
                            }}
                            icon={icons.discount}
                            iconStyle={{tintColor: COLORS.black}}
                            label={footItem?.soldQuantity}
                        />
                        {/* Shipping */}
                        <IconLabel
                            containerStyle={{
                                marginLeft: SIZES.radius,
                                paddingHorizontal: 0
                            }}
                            icon={icons.dollar}
                            iconStyle={{tintColor: COLORS.black}}
                            label="Freeship"
                        />
                </View>
            </View>
        </View>
        )
    }

    function renderFooter(){
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 120,
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.radius,
                }}
            >
                {/* Stepper Input */}
                <StepperInput
                    value={quantity}
                    onAdd={() => setQuantity(quantity + 1)}
                    onMinus={() => {
                        if(quantity > 1){
                            setQuantity(quantity - 1)
                        }

                    }}
                />
                {/* Text Button*/}
                <TextButton
                    buttonContainerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 60,
                        marginLeft: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                    label="Mua ngay"
                    label2={`${quantity * footItem?.price} VND`}
                    onPress={() => {
                        for(let i = 0; i < quantity; i++){
                            console.log(footItem?._id);
                            console.log(token);
                            axios.patch('http://10.0.2.2:3001/cart/add',{productId: footItem?._id}, {
                                headers: {
                                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                                }
                            }).then((response) => {
                                console.log(response.data);
                            }
                            ).catch((error) => {
                                console.log(error);
                            })
                        }
                        //Get cart
                        axios.get('http://10.0.2.2:3001/cart', {
                            headers: {
                                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                            }
                        }).then((response) => {
                            console.log("Cart data: "+response.data + " " + token)
                            navigation.navigate("Cart", {item: response.data.cart, token: token})
                        }).catch((error) => {
                            console.log("Cart error: "+error + " " + token)
                        })

                    }}
                />
            </View>
        )
    }
    console.log(quantity);
    var token = "";
    AxiosUtil.getToken().then((data) => {
        token = data;
    })
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
            <ScrollView>
                {/* Food Detail*/}
                {renderDetails()}
                {/* Restaurant*/}
                {/* {renderRestaurant()} */}
            </ScrollView>
            {/* Footer */}
            <LineDivider />
            {renderFooter()}
        </View>
    )
}

export default FoodDetail