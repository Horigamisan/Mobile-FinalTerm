import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

let token = "";
const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('token')
                return value != null ? value : null;
            } catch (e) {
        }
}

const AxiosIns = axios.create({
    baseURL: "http://10.0.2.2:3001",
    headers: {
        Authorization: "Bearer " + token,
    }
})

const setToken = async (value) => {
    try {
        await AsyncStorage.setItem('token', value)
        console.log("Set token: " + value);
        getToken();
    } catch (e) {
        // saving error
    }
}
const setProfile = async (value) => {
    try {
        await AsyncStorage.setItem('profile', JSON.stringify(value))
        console.log("Set profile: " + JSON.stringify(value));
    } catch (e) {
        // saving error
    }
}

const getProfile = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('profile')
        return jsonValue != null ? JSON.parse(jsonValue) : null; 
    } catch(e) {
        // error reading value
    }
}

export default {AxiosIns, setToken, setProfile, getToken, getProfile};