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
import axios from 'axios';
import AxiosUtil from '../../utils/AxiosUtil';
import { useNavigation } from '@react-navigation/native';

const CartTab = ({navigation, route}) => {
    // var item = (route?.params?.item || '');
    // var token = (route?.params?.token || '');
    navigation = navigation ? navigation : useNavigation();

    const [token, setToken] = React.useState(route?.params?.token || '');
    const [item, setItem] = React.useState(route?.params?.item || '');

    if(item == ''){
        AxiosUtil.getToken().then((data) => {
            // token = data;
            setToken(data);
            axios.get('http://10.0.2.2:3001/cart', {
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            }).then((response) => {
                setItem(response.data.cart)
                console.log(response.data.cart);
            }).catch((error) => {
                console.log("Cart error 1: "+error + " " + token)
            })
        })

    }

    const [myCart, setMyCart] = React.useState([]);
    if(item != '' ){
        item.forEach(element => {
            //filter if item is not in myCart
            if(myCart.filter(item => item._id === element.product._id).length == 0){
                //add item to myCart
                myCart.push({...element.product, quantity: element.quantity});
                console.log('Element item', element);
            }
        });
        myCart.forEach(element => {
            console.log('Element', element);
        });
    }

    console.log('My cart 1', myCart);

    const [myCartList, setMyCartList] = React.useState(myCart);

    

    function removeMyCartHandler(id) {
        let myNewCartList = [...myCartList];
        const index = myNewCartList.findIndex(item => item._id === id);

        myNewCartList.splice(index, 1);
        setMyCartList(myNewCartList);
    }

    //Handler
    function updateQuantityHandler(newQty, id){
        if(newQty < 1) return;
        const newMyCartList = myCartList.map(item => (
            item._id === id ? {...item, quantity: newQty} : item
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
                        quantity={myCartList.length}
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
                keyExtractor={item => `${item._id}`}
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
                                {data.item.price} VND
                            </Text>
                        </View>
                        {/* Quantity */}
                        <StepperInput
                            containerStyle={{
                                height: 50,
                                width: 130,
                                backgroundColor: COLORS.white,
                            }}
                            value={data.item.quantity}
                            onAdd={() => {
                                axios.patch('http://10.0.2.2:3001/cart/add',{productId: data.item._id}, {
                                    headers: {
                                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                                    }
                                }).then((response) => {
                                    console.log("Add to cart success");
                                }
                                ).catch((error) => {
                                    console.log(error);
                                })
                                updateQuantityHandler(data.item.quantity + 1, data.item._id)   
                            }}
                            onMinus={() => {
                                axios.patch('http://10.0.2.2:3001/cart/remove',{productId: data.item._id}, {
                                    headers: {
                                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                                    }
                                }).then((response) => {
                                    console.log("Remove from cart success");
                                }
                                ).catch((error) => {
                                    console.log(error);
                                })
                                updateQuantityHandler(data.item.quantity - 1, data.item._id)   
                            }}
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
                        onPress={() => removeMyCartHandler(data.item._id)}
                    />
                )}
                            
                ></SwipeListView>
        )
    }
    
    const subTotal = () => {
        let total = 0;
        myCartList.forEach(item => {
            total += item.price * item.quantity;
        })
        
        return total;
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
                subTotal={subTotal()}
                shippingFee={0}
                total={subTotal() + 0}
                onPress={() => navigation.navigate("Checkout", {item: {subTotal: subTotal(), shippingFee: 0, total: subTotal() + 0, token: token}})}
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