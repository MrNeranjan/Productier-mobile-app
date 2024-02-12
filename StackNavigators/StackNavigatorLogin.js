import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import GettingStartPage from "../screens/gettingStartPage.js";
import RegisterPage from "../screens/RegisterPage.js";
import LoginPage from "../screens/LoginPage.js";
import ForgetPassPage from "../screens/ForgetPassPage.js";


const Stack = createNativeStackNavigator();

export default function LoginStack(){
    return(
        <NavigationContainer>
            <StatusBar/>
            <Stack.Navigator
                screenOptions={{headerShown:false}}
            >
                <Stack.Screen
                    name="GettingStartPage"
                    component={GettingStartPage}
                    options={{animation:'slide_from_right'}}
                />
                <Stack.Screen
                    name="RegisterPage"
                    component={RegisterPage}
                    options={{animation:'slide_from_right'}}
                />
                <Stack.Screen
                    name="LoginPage"
                    component={LoginPage}
                    options={{animation:'slide_from_right'}}
                />
                <Stack.Screen
                    name="ForgetPassPage"
                    component={ForgetPassPage}
                    options={{animation:'slide_from_right'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}