import React from "react";
import {
    View,
    Text,
    ImageBackground,
    Image,
    Animated
} from 'react-native';

import { constants, images, FONTS, SIZES, COLORS} from "../../constants";

import { TextButtonAuth } from "../../components";

const OnBoarding = ({ navigation }) =>{

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const flatListRef = React.useRef()
    const [currentIndex, setCurrentIndex] = React.useState(0)

    const onViewChangeRef = React.useRef(({viewableItems, changed})=>{
        setCurrentIndex(viewableItems[0].index)
    })

    const Dots = () => {

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return(
            <View
                style = {{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                { 
                    constants.onboarding_screens.map((item, index) =>  {

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.lightOrange,COLORS.primary,COLORS.lightOrange],
                            Extrapolate: "clamp"
                        })

                        const  dotWidth = dotPosition.interpolate({
                            inputRange: [index -1, index, index + 1],
                            outputRange: [10, 30, 10],
                            Extrapolate: "clamp"
                        })

                        return(
                            <Animated.View
                                key={`dot-${index}`}
                                style={{
                                    borderRadius: 5,
                                    marginHorizontal: 6,
                                    width: dotWidth,
                                    height: 10,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function renderHeaderLogo(){
        return (
            <View
                style={{
                    position: 'absolute',
                    top: SIZES.height > 800 ? 50 : 25,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 25,

                }}
            >
                <Image
                    source={images.logo_02}
                    resizeMode = "contain"
                    style={{
                        width: SIZES.width * 0.5,
                        height: 100
                    }}
                />
            </View>
        )
    }

    function renderFooter(){
        return(
            <View
                style={{
                    height: 160,
                }}
            >
                {/* Dot */}
                <View
                    style ={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <Dots />
                </View>

                {/* Button */}
                {currentIndex < constants.onboarding_screens.length -1 &&
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding
                        }}
                    >
                        <TextButtonAuth
                            label="Bỏ qua"
                            buttonContainerStyle={{
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.darkGray2
                            }}
                            onPress ={() => navigation.replace("SignIn") }    
                        />
                        <TextButtonAuth
                            label="Tiếp tục"
                            buttonContainerStyle={{
                                height: 60,
                                width: 200,
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => {
                                flatListRef?.current?.scrollToIndex({
                                    index: currentIndex + 1,
                                    animated: true
                                })   
                            }}
                        />
                    </View>
                }
                
                {currentIndex == constants.onboarding_screens.length -1 &&
                    <View
                        style ={{
                            paddingHorizontal:SIZES.padding,
                            marginVertical:SIZES.padding
                        }}
                    >
                        <TextButtonAuth
                            label="Cùng nhau trải nghiệm nào"
                            buttonContainerStyle={{
                                height: 60,
                                alignItems: 'center',
                                broderRadius: SIZES.radius,
                                marginTop: SIZES.padding
                            }}
                            onPress= {()=> navigation.replace("SignIn")}
                        />
                    </View>
                }
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
            {renderHeaderLogo()}
            <Animated.FlatList
                ref = {flatListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll = {Animated.event(
                    [
                        { nativeEvent: {contentOffset:{x: scrollX}
                        }}
                    ],
                    { useNativeDriver: false}
                )}
                onViewableItemsChanged={onViewChangeRef.current}
                keyExtractor={(item) => `${item.id}`}
                renderItem = {({item, index}) => {
                    return(
                        <View
                            style = {{
                                width:SIZES.width
                            }}
                        >
                            <View
                                style={{
                                    flex: 3
                                }}
                            >
                                <ImageBackground
                                    source={item.backgroundImage}
                                    style ={{
                                        flex:1,
                                        alignItems:'center',
                                        justifyContent: 'flex-end',
                                        height: index ==1 ? "92%" : "100%",
                                        width: "100%"
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode="contain"
                                        style={{
                                            width: SIZES.width *0.8,
                                            height: SIZES.width * 0.8,
                                            marginBottom: -SIZES.padding
                                        }}
                                    />
                                </ImageBackground>
                            </View>
                            <View
                                style = {{
                                    flex: 1,
                                    marginTop: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: SIZES.radius
                                }}
                            >
                                <Text style ={{...FONTS.h1, fontSize: 20}}>
                                    {item.title}
                                </Text>
                                <Text style ={{...FONTS.body3, textAlign:'center', color: COLORS.darkGray}}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                        
                    )
                }}
            />

            {renderFooter()}
        </View>
    )
}
export default OnBoarding;