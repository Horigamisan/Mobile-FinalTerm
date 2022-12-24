import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, Animated } from "react-native";
import {COLORS, FONTS, SIZES, constants, icons} from "../../constants";
import IconButton from "../../components/IconButton";

const Section = ({containerStyle, title, children}) => {
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                ...containerStyle
            }}
        >
            <Text style={{...FONTS.h3, fontSize: 18}}>{title}</Text>
            {children}
        </View>
    )
}

const FilterModal = ({isVisible, onClose}) => {

    const [showFilterModal, setShowFilterModal] = React.useState(isVisible)
    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if(showFilterModal){
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
        else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(() => onClose())
        }
    }, [showFilterModal])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 680]
    })

    function renderDistance() {
        return (
            <Section
                title="Distance"
                containerStyle={{
                    marginTop: 40
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray
                        }}
                    >
                        <Image
                            source={icons.location}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.darkGray
                            }}
                        />
                    </View>

                    <Text style={{marginLeft: SIZES.radius, ...FONTS.h3, fontSize: 18}}>Within 5 miles</Text>
                </View>
            </Section>
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.transparentBlack7
                }}
            >
                {/* Transparent Background */}
                <TouchableWithoutFeedback
                    onPress={() => setShowFilterModal(false)}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0
                        }}
                    />
                </TouchableWithoutFeedback>
                
                <Animated.View
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: modalY,
                        width: '100%',
                        height: '100%',
                        padding: SIZES.padding,
                        borderTopLeftRadius: SIZES.radius,
                        borderTopRightRadius: SIZES.radius,
                        backgroundColor: COLORS.white
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>Filter Your Search</Text>

                        <IconButton
                            containerStyle={{
                                borderWidth: 2,
                                borderColor: COLORS.gray2,
                                borderRadius: 10
                            }}
                            icon={icons.cross}
                            onPress={() => setShowFilterModal(false)}
                            iconStyle={{
                                tintColor: COLORS.gray2
                            }}
                        />
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 250
                        }}
                    >
                        {/* Distance*/}
                        {renderDistance()}
                    </ScrollView>

                </Animated.View>

            </View>
        </Modal>
    )
}
export default FilterModal;