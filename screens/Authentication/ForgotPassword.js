import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {AuthLayout} from "../";
import { FONTS, SIZES, COLORS, icons } from '../../constants';
import {FormInput, TextButton} from "../../components";
import {utils} from "../../utils"

const ForgotPassword = ({navigation}) => {
    
    const [email, setEmail] = React.useState("")
    const [emailError, setEmailError]= React.useState("")

    function isEnableSendEmail(){
        return email != "" && emailError == ""
    }

    return (
        <AuthLayout
            title="Khôi phục mật khẩu"
            subtitle= "Hãy nhập email của bạn để nhận được mật khẩu mới"
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
        </View>
        <TextButton
            label="Gửi email"
            disabled={isEnableSendEmail() ? false : true}
            buttonContainerStyle={{
                height: 55,
                alignItems: 'center',
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: isEnableSendEmail() ? COLORS.primary : COLORS.transparentPrimray
            }}
            onPress={() => navigation.navigate("Otp")}
        />
        </AuthLayout>
    )
}

export default ForgotPassword;