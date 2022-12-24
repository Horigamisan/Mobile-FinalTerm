import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';

import {
    HeaderDetail,
    IconButtonDetail,
    CartQuantityButton,
    StepperInput,
    LineDivider,
    FooterTotal
} from '../../components';
import { FONTS, SIZES, COLORS, icons, dummyData} from '../../constants';
import {SwipeListView} from 'react-native-swipe-list-view';

const CartTab = ({navigation}) => {

    const [myCartList, setMyCartList] = React.useState(dummyData.myCart);

    function removeMyCartHandler(id) {
        let myNewCartList = [...myCartList];
        const index = myNewCartList.findIndex(item => item.id === id);

        myNewCartList.splice(index, 1);
        setMyCartList(myNewCartList);
    }

    //Handler
    function updateQuantityHandler(newQty, id){
        if(newQty < 1) return;
        const newMyCartList = myCartList.map(item => (
            item.id === id ? {...item, qty: newQty} : item
        ))
        setMyCartList(newMyCartList);
    }

    function renderHeaderDetail() {
        return (
            <HeaderDetail
                title="GIỎ HÀNG"
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

    function renderCartList() {
        return (
            <SwipeListView
                data={myCartList}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding * 2
                }}
                disableRightSwipe={true}
                rightOpenValue={-75}
                renderItem={(data, rowMap) => (
                    <View
                        style={{
                            height: 100,
                            backgroundColor: COLORS.lightGray2,
                            ...styles.cartItemContainer
                        }} 
                    >
                       <View
                            style={{
                                width: 90,
                                height: 100,
                                marginLeft: -10,
                            }}
                        >
                            <Image
                                source={data.item.image}
                                resizeMode="contain"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: 'absolute',
                                    top: 10,
                                }}
                            />
                        </View>

                        {/* Food Info*/}
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                }}
                            >
                                {data.item.name}
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    color: COLORS.primary
                                }}
                            >
                                ${data.item.price.toFixed(2)}
                            </Text>
                        </View>
                        {/* Quantity */}
                        <StepperInput
                            containerStyle={{
                                height: 50,
                                width: 125,
                                backgroundColor: COLORS.white,
                            }}
                            value={data.item.qty}
                            onAdd={() => updateQuantityHandler(data.item.qty + 1, data.item.id)}
                            onMinus={() => updateQuantityHandler(data.item.qty - 1, data.item.id)}
                        />
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <IconButtonDetail
                        containerStyle={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: COLORS.primary,
                            ...styles.cartItemContainer
                        }}
                        icon={icons.delete_icon}
                        iconStyle={{
                            marginRight: 10,
                            tintColor: COLORS.white
                        }}
                        onPress={() => removeMyCartHandler(data.item.id)}
                    />
                )}
                            
                ></SwipeListView>
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
            {/* Card List*/}
            {renderCartList()}
            {/* Footer */}
            <FooterTotal
                subTotal={37.97}
                shippingFee={5.00}
                total={42.97}
                onPress={() => navigation.navigate("Success")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
    }
})

export default CartTab;