import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import {AuthLayout} from "../";

import {FONTS, SIZES, COLORS, icons} from "../../constants";

import {FormInput, TextButtonAuth, TextIconButton} from "../../components"

import {utils} from "../../utils"

const SignUp = ({navigation}) => {

    const [email, setEmail] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPass, setShowPass] = React.useState(false)

    const [emailError, setEmailError] = React.useState("")
    const [usernameError, setUsernameError] = React. useState("")
    const [passwordError, setPasswordError] = React.useState("")

    function isEnableSignIn() {
        return email != "" && username != "" && password != "" && emailError=="" && passwordError == "" && usernameError == ""
    }

    return (
        <AuthLayout
            title = "Đăng ký"
            subtitle= "Hãy đăng ký để bắt đầu sử dụng ứng dụng!"
            titleContainerStyle={{
                marginTop: SIZES.radius
            }}
        >
            {/*Form Input and sign up */}
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding
                }}
            >
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
                    label="Tên đăng nhập"
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange ={(value)=>{
                        setUsername(value)
                    }}
                    errorMsg = {usernameError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={username == "" || (username != "" && usernameError == "") ? icons.correct : icons.cross}
                                style ={{
                                    height: 20,
                                    width: 20,
                                    tintColor: username == "" ? COLORS.gray : (username != "" && usernameError == "") ? COLORS.green : COLORS.red
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
                    onChange={(value) => {
                        utils.validatePassword(value,setPasswordError)
                        setPassword(value)
                    }}
                    errorMsg={passwordError}
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
                <TextButtonAuth
                    label = "Đăng ký"
                    disabled={isEnableSignIn() ? false: true}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnableSignIn() ? COLORS.primary : COLORS.transparentPrimary
                    }} 
                    onPress ={() => navigation.navigate("Otp")}
                />

                <View
                    style = {{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        justifyContent: 'center'
                    }}
                >
                    <Text 
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3,
                            marginRight: 5
                        }}
                    >
                        Bạn đã có tài khoản?
                    </Text>
                    <TextButtonAuth
                        label="Đăng nhập"
                        buttonContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={()=> navigation.goBack()}
                    />
                </View>
            </View>
            {/* Footer */}
        </AuthLayout>
    )
}

export default SignUp;