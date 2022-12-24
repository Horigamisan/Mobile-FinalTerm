import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import {AuthLayout} from "../";

import {FONTS, SIZES, COLORS, icons, dummyData } from "../../constants";

import {
    FormInput,
    CustomSwitch,
    TextButtonAuth,
    TextIconButton
} from "../../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {utils} from "../../utils"
import axios from 'axios';
import AxiosUtil from '../../utils/AxiosUtil';

const SignIn = ({navigation}) => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [emailError, setEmailError] = React.useState("")
    const [showPass, setShowPass] = React.useState(false)
    const [saveMe, setSaveMe] = React.useState(false)

    function isEnableSignIn(){
        return email != "" && password != "" && emailError == ""
    }
    function validatedEmailPass(check = false){
        return check;
    }

    return (
        <AuthLayout
            title= "Đăng nhập"
            subtitle="Chào mừng bạn trở lại, hãy đăng nhập để tiếp tục!"
        >
            <View
                style ={{
                    flex: 1,
                    marginTop: SIZES.padding * 2
                }} 
            >
                {/* From Input*/}
                <FormInput
                    label='Email'
                    keyboardType='email-address'
                    autoCompleteType='email'
                    onChange={(value) => {
                        utils.validateEmail(value, setEmailError)
                        setEmail(value)
                    }}
                    errorMsg = {emailError}
                    appendComponent={
                        <View
                            style = {{
                                justifyContent:'center'
                            }}
                        >
                            <Image
                                source={email == "" || (email != "" && emailError == "") ? icons.correct : icons.cross}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: email == "" ? COLORS.gray : (email != "" && emailError == "") ? COLORS.green : COLORS.red
                                }}
                            />
                        </View>
                    }
                />

                <FormInput
                    label="Mật khẩu"
                    secureTextEntry={!showPass}
                    autoCompleteType ="password"
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => setPassword(value)}
                    appendComponent={
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems:'flex-end',
                                justifyContent: 'center'
                            }}
                            onPress={() => setShowPass(!showPass)}
                        >
                            <Image
                                source={showPass ? icons.eye_close : icons.eye}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.gray
                                }}
                            />
                        </TouchableOpacity>
                    }
                />
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        justifyContent: 'space-between'
                    }}
                >
                    <CustomSwitch
                        value={saveMe}
                        onChange={(value) => setSaveMe(value)}
                    />
                    <TextButtonAuth
                        label="Quên mật khẩu?"
                        buttonContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: FONTS.gray,
                            ...FONTS.body4
                        }}
                        onPress = {() => navigation.navigate("ForgotPassword") }
                    />
                </View>
                {/* Sign In*/}
                <TextButtonAuth
                    label="Đăng nhập"
                    disabled = {(isEnableSignIn() || validatedEmailPass()) ? false : true}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnableSignIn() ? COLORS.primary : COLORS.transparentPrimary
                    }}
                    onPress = {() => {
                        var token = "";
                        AxiosUtil.AxiosIns.post('/auth/signin', {
                            email: email,
                            password: password}).then((response) => {
                                token = response.data.token
                                AxiosUtil.setToken(token)
                                //set profile 
                                axios.get('http://10.0.2.2:3001/user/profile', {
                                    headers: {
                                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                                    }
                                }).then((response) => {
                                    console.log("Profile data: "+response.data + " " + token)
                                    AxiosUtil.setProfile(response.data).then(() => {
                                        navigation.navigate("Home")
                                    })
                                })
                            }).catch((error) => {
                                console.log(error)
                                setEmailError("Email hoặc mật khẩu không đúng")
                        })
                        console.log("Check")
                    }}
                />
                {/* Sign Up*/}
                <View
                    style ={{
                        flexDirection: 'row',
                        marginTop:SIZES.radius,
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style ={{
                            color: COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        Bạn chưa có tài khoản?
                    </Text>
                    <TextButtonAuth
                        label="Đăng ký"
                        buttonContainerStyle={{
                            marginLeft: 3,
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress = {()=> navigation.navigate("SignUp")}
                    />
                </View>
            </View>
            {/*Footer */}
            
        </AuthLayout>
    )
}
export default SignIn;