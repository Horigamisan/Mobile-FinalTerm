import React from "react";
import{
    View,
    Text,
    TextInput
} from 'react-native';
 
import {FONTS, SIZES, COLORS} from '../constants';

const FormInput =({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    preprendComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    errorMsg = ""
}) =>{
    return(
        <View style = {{...containerStyle}}>
           <View
                style ={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
           >
                <Text style= {{color: COLORS.gray, ...FONTS.body4}}>
                    {label}
                </Text>
                <Text style={{color:COLORS.red, ...FONTS.body4}}>
                    {errorMsg}
                </Text>
            </View> 
            <View
                style={{
                    flexDirection:'row',
                    height:55,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {preprendComponent}
                <TextInput
                    style={{
                        flex: 1,
                        ...inputStyle
                    }}
                    placeholder ={placeholder}
                    placeholderTextColor ={COLORS.gray}
                    secureTextEntry ={secureTextEntry}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    onChangeText={(text) => onChange(text)}
                />
                {appendComponent}
            </View>
        </View>
    )
    
}
export default FormInput; 