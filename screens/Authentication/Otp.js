import React from 'react';
import {
    View,
    Text
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {FONTS, SIZES, COLORS} from "../../constants";
import {TextButtonAuth} from "../../components";
import {AuthLayout} from "../";
import axios from 'axios';
import AxiosUtil from '../../utils/AxiosUtil';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';


const Otp = ({navigation, route}) => {

    const [timer, setTimer] = React.useState(60)

    React.useEffect(() => {
        let interval = setInterval(()=>{
            setTimer(prevTimer =>{
                if(prevTimer> 0){
                    return prevTimer - 1
                } else {
                    return prevTimer
                }
            })
        },1000)
        return () => clearInterval(interval)
    },[])

    return (
        <AuthLayout
            title="Xác nhận mã OTP"
            subtitle="Nhập mã OTP đã được gửi đến email của bạn"
            titleContainerStyle={{
                marginTop: SIZES.padding * 2
            }}
        >
             <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding * 2
                }}
            >
                <OTPInputView
                    pinCount={4}
                    style = {{
                        width: "100%",
                        height: 50
                    }}
                    codeInputFieldStyle={{
                        width: 65,
                        height: 65,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                    onCodeFilled={(code) => {
                        console.log(code)
                    }}
                />
                {/* Countdown Timer */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        Bạn chưa nhận được mã OTP?
                    </Text>
                    <TextButtonAuth
                        label={`Thử lại (${timer} giây)`}
                        disabled={timer == 0 ? false : true}
                        buttonContainerStyle={{
                            marginLeft: SIZES.base,
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={()=> {
                            // axios,get("http//10.0.2.2:3001/auth/resend-otp").th
                            setTimer(60)
                        }}
                    />
                </View>
           </View>
           {/* Footer */}
           <View>
                <TextButtonAuth
                    label="Tiếp tục"
                    buttonContainerStyle={{
                        height: 50,
                        alignItems: 'center',
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                    onPress={() => {
                        var otp = route.params?.otp;
                        axios.post(("http://10.0.2.2:3001/auth/verify-account"), {
                            otp: otp
                        },{
                            headers: {
                                Authorization: `Bearer ${route.params?.token}`
                            }
                        }).then((response) => {
                            console.log(response.data);
                            AxiosUtil.setToken(route.params?.token).then(() => {
                                axios.get("http://10.0.2.2:3001/user/profile",{headers: {
                                        Authorization: `Bearer ${route.params?.token}`
                                    }}).then((response) => {
                                        AxiosUtil.setProfile(response.data).then(() => {
                                        navigation.navigate("Home")
                                    })
                                }).catch((error) => {
                                    console.log(error);
                                })
                            })
                        }).catch((error) => {
                            console.log(error);
                        })
                    }}
                />
                <View
                    style={{
                        marginTop: SIZES.padding,
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        Bằng việc tiếp tục, bạn đã đồng ý với
                    </Text>
                    <TextButtonAuth
                        label="Điều khoản dịch vụ"
                        buttonContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle ={{
                            color: COLORS.primary,
                            ...FONTS.body3
                        }}
                        onPress={()=> console.log("TnC")}
                    />
                </View>
           </View>
        </AuthLayout>
    )
}

export default Otp;