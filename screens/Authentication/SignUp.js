import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Button
} from 'react-native';

import {AuthLayout} from "../";

import {FONTS, SIZES, COLORS, icons} from "../../constants";

import {FormInput, TextButtonAuth, TextIconButton} from "../../components"

import {utils} from "../../utils"
import axios from 'axios';
import AxiosUtil from '../../utils/AxiosUtil';
import {DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const SignUp = ({navigation}) => {

    const [email, setEmail] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPass, setShowPass] = React.useState(false)
    const [tel, setTel] = React.useState("")

    const [emailError, setEmailError] = React.useState("")
    const [usernameError, setUsernameError] = React. useState("")
    const [passwordError, setPasswordError] = React.useState("")
    const [date, setDate] = React.useState(new Date())

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
                    label="Số điện thoại"
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => {
                        setTel(value)
                    }}
                    errorMsg={passwordError}
                    appendComponent={
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems:'flex-end',
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
                        </TouchableOpacity>
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

               

               {/* Date time picker button*/}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text style={{color: COLORS.gray, ...FONTS.body4}}>Ngày sinh</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-end'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            onPress={(currentMode) => {
                                console.log(date)
                                DateTimePickerAndroid.open({
                                value: date,
                                onChange: (event, selectedDate) => {
                                    const currentDate = selectedDate;
                                    setDate(currentDate);
                                },
                                mode: currentMode,
                                is24Hour: true,
                                })}
                            }
                        >
                            <Text style={{color: COLORS.gray, ...FONTS.body3}}>{date.toDateString()}</Text>
                            <Image
                                source={icons.calendar}
                                style={{
                                    marginLeft: 5,
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.gray
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

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
                    onPress ={() => {
                        axios.post('http://10.0.2.2:3001/auth/signup', {
                            email: email,
                            password: password,
                            name: username,
                            birthDate: date,
                            tel: tel
                            }).then((response) => {
                                console.log(response.data)
                                navigation.navigate("Otp", {otp: response.data.otp, token: response.data.token})
                            }).catch((error) => {
                                setEmailError(error.message)
                                console.log(error)
                        })
                    }}
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