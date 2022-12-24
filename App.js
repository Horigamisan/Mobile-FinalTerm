import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { 
    MainLayout,
    Search, 
    Home, 
    FoodDetail, 
    CartTab,
    OnBoarding,
    SignIn,
    SignUp,
    ForgotPassword,
    Otp,
    Success,
    Checkout,
    CartTabBottom,
    DetailProfile,
    DeliveryStatus,
    OrderHistory
} from './screens'
import CustomDrawer from './navigation/CustomDrawer';
import useFonts from './hooks/useFonts';
import AppLoading from 'expo-app-loading';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './stores/rootReducer';
import thunk from 'redux-thunk';

const Stack = createNativeStackNavigator();

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

const App = () => {
    const [IsReady, SetIsReady] = React.useState(false);

    const LoadFonts = async () => {
        await useFonts();
      };

      if (!IsReady) {
        return (
          <AppLoading
            startAsync={LoadFonts}
            onFinish={() => SetIsReady(true)}
            onError={() => {}}
          />
        );
      }
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'OnBoarding'}
                >
                    <Stack.Screen
                        name="Home"
                        component={CustomDrawer}
                    />
                    <Stack.Screen
                        name="Food"
                        component={FoodDetail}
                    />
                    <Stack.Screen
                        name="Cart"
                        component={CartTab}
                    />
                    
                    <Stack.Screen
                        name="OnBoarding"
                        component={OnBoarding}
                    />
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                    />
                    
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                    />

                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                    />

                    <Stack.Screen
                        name="Otp"
                        component={Otp}
                    />
                    
                    <Stack.Screen
                        name="Success"
                        component={Success}
                    />

                    <Stack.Screen
                        name="Checkout"
                        component={Checkout}
                    />

                    <Stack.Screen
                        name="CartTabBottom"
                        component={CartTabBottom}
                    />

                    <Stack.Screen
                        name="DetailProfile"
                        component={DetailProfile}
                    />
                    
                    <Stack.Screen
                        name="DeliveryStatus"
                        component={DeliveryStatus}
                    />

                    <Stack.Screen
                        name="OrderHistory"
                        component={OrderHistory}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App