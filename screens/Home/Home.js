import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    FlatList
} from 'react-native';
import {FONTS, COLORS, SIZES, icons, images, dummyData} from '../../constants';
import {HorizontalFoodCard, VerticalFoodCard } from "../../components";
import {FilterModal} from "../";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AxiosUtil from '../../utils/AxiosUtil';

const Section = ({title, children, onPress}) => {
    return (
        <View>
            {/* Header*/}
            <View style={{
                marginHorizontal: SIZES.padding,
                flexDirection: 'row',
                marginTop: 30,
                marginBottom: 20
            }}>
                <Text style={{flex: 1, ...FONTS.h3}}>{title}</Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{color: COLORS.primary, ...FONTS.body3}}>Hiển thị tất cả</Text>
                </TouchableOpacity>
            </View>
            {/* Content */}
            {children}
        </View>
    )
}
const Home = (navigation) => {
    navigation = useNavigation();
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
    const [selectedMenuType, setSelectedMenuType] = React.useState(1);
    const [menuList, setMenuList] = React.useState([]);
    const [recommends, setRecommends] = React.useState([]);
    const [popular, setPopular] = React.useState([]);
    const [showFilterModal, setShowFilterModal] = React.useState(false);
    let products = [];
    //Get product
    if(products.length == 0){
        AxiosUtil.getToken().then((token) => {
            console.log("Token product: " + token);
                axios.get('http://10.0.2.2:3001/products/today', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then((response) => {
                    // response.data.products.forEach((product) => {
                    //     console.log("Product: " + product.name);
                    // });
                    products = response.data.products;
                }).catch((error) => {
                    console.log("Error product: " + error);
                });
        });
    }
    
    const menu = [
        {
            id: 1,
            name: "Tính năng",
            list: [
                hamburger, hotTacos, vegBiryani,
            ]
        },
        {
            id: 2,
            name: "Gần bạn",
            list: [
                hamburger, vegBiryani, wrapSandwich,
            ]
        },
        {
            id: 3,
            name: "Phổ biến",
            list: [
                hamburger, hotTacos, wrapSandwich,
            ]
        },
        {
            id: 4,
            name: "Mới nhất",
            list: [
                hamburger, hotTacos, vegBiryani,
            ]
        },
        {
            id: 5,
            name: "Xu hướng",
            list: [
                hamburger, vegBiryani, wrapSandwich,
            ]
        },
        {
            id: 6,
            name: "Đề xuất",
            list: [
                hamburger, hotTacos, wrapSandwich,
            ]
        },
    
    ]
    
    React.useEffect(() => {
        handlerChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    // Handler Change Category
    function handlerChangeCategory(categoryId, menuTypeId) {
        // Retreive the popular menu
        let selectedPopular = menu.find(a => a.name == "Phổ biến")
        // Set the popular menu based on categoryId
        setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)))
        // Retreive the recommended menu 
        let selectedRecommend = menu.find(a => a.name == "Đề xuất")
        // Set the recommended menu based on categoryId
        setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))
        // Filter menu based on menuTypeId
        let selectedMenu = menu.find(a => a.id == menuTypeId)
        // Set Menu based on categoryId
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
    }

    // Render Search
    function renderSearch() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                <Image
                    source={icons.search}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.black
                    }}
                />
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder="Tìm kiếm..."
                    placeholderTextColor={COLORS.black}
                />

                {/** Filter Button */}
                <TouchableOpacity
                    onPress={() => setShowFilterModal(true)}
                >
                    <Image
                        source={icons.filter}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    // Render Menu Types
    function renderMenuTypes() {
        return (
            <FlatList
                horizontal
                data={menu}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({item, index}) => {
                    return (<TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == menu.length - 1 ? SIZES.padding : 0,
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id)
                            handlerChangeCategory(selectedCategoryId, item.id)
                        }}
                    >
                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>)
                }}
            />
        )
    }

    // Render Recommended Section
    function renderRecommendedSection() {
        return (
            <Section
                title="Đề xuất"
                onPress={() => console.log("Hiển thị tất cả")}
                
            >
                <FlatList
                    data={recommends}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                        return(
                        <HorizontalFoodCard
                        containerStyle={{
                            height: 130,
                            width: SIZES.width * 0.85,
                            marginLeft: index == 0 ? SIZES.padding : 18,
                            marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                            paddingRight: SIZES.radius,
                            alignItems: 'center',
                        }}
                        imageStyle={{
                            marginTop: 35,
                            height: 150,
                            width: 150
                        }}
                        item={item}
                        onPress={() => navigation.navigate("Food", {item : item})}
                    />)
                    }}
                />
            </Section>
        )
    }
    
    // Render Popular Section
    function renderPopularSection() {
        return (
            <Section
                title="Phổ biến gần bạn"
                onPress={() => console.log("Show All")}
            >
                <FlatList
                    data={popular}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                        return (
                            <VerticalFoodCard
                                containerStyle={{
                                    padding: 18,
                                    marginLeft: index == 0 ? SIZES.padding : 18,
                                    marginRight: index == popular.length - 1 ? SIZES.padding : 0,
                                }}
                                item = {item}
                                onPress={() => navigation.navigate("Food", {item: item})}
                            />
                        )
                    }}
                />
            </Section>
        )
    }

    // Render Categories
    function renderCategories() {
        return (
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: SIZES.padding,
                    paddingLeft: SIZES.padding
                }}
                renderItem={({item, index}) => {
                    return (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 0,
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2
                        }}
                        onPress={() => {
                            setSelectedCategoryId(item.id)
                            handlerChangeCategory(item.id, selectedMenuType)
                        }}
                    >
                        <Image
                            source={item.icon}
                            style={{
                                marginTop: 5,
                                width: 50,
                                height: 50
                            }}
                        />
                        <Text
                            style={{
                                alignSelf: 'center',
                                marginRight : SIZES.base,
                                color: selectedCategoryId == item.id ? COLORS.white : COLORS.darkGray,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}}
            />
        )
    }
    
    // Render Delivery To
    function renderDeliveryTo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding
                }}
            >
                <Text style={{...FONTS.h3, color: COLORS.primary}}>VẬN CHUYỂN TỚI</Text>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                        alignItems: 'center'
                    }}
                    onPress={() => console.log("Delivery To")}
                >
                    <Text
                        style={{
                            ...FONTS.h3,
                        }}
                    >
                        {dummyData?.myProfile?.address}
                    </Text>
                    <Image
                        source={icons.down_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            marginLeft: SIZES.base
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    // navigation = useNavigation();

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* Search */}
            {renderSearch()}

            {/* Filter Modal */}
            {showFilterModal &&
                <FilterModal
                    isVisible={showFilterModal}
                    onClose={() => setShowFilterModal(false)}
                />
            }

            {/* List */}
            <FlatList
                data={menuList}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Delivery To */}
                        {renderDeliveryTo()}
                        {/* Categories */}
                        {renderCategories()}
                        {/* Popular */}
                        {renderPopularSection()}
                        {/* Recommended */}
                        {renderRecommendedSection()}
                        {/* Menu Types */}
                        {renderMenuTypes()}
                    </View>
                }
                renderItem={({item, index}) => {
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 130,
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius
                            }}
                            imageStyle={{
                                marginTop: 20,
                                height: 110,
                                width: 110
                            }}
                            item={item}
                            onPress={() => navigation.navigate("Food", {item : item})}
                        />
                    )
                }}
            />
        </View>
    )
}

export default Home;