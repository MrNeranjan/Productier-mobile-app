import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View ,ImageBackground,Dimensions, KeyboardAvoidingView, ScrollView,Button} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator/TabNavigator.js";
import AddTask from "./tab navigater screens/AddTakPage.js";
import ProfilePage from "./setting stack screens/profile.js";
import ChangePasswordPage from "./setting stack screens/passwordChange.js";
import NotificationsPage from "./setting stack screens/NotificationHandle.js";
import TaskList from "./tab navigater screens/taskList.js";
import GettingStartPage from './getting start stack screens/gettingStartPage.js';
import RegisterPage from './getting start stack screens/RegisterPage.js';
import LoginPage from './getting start stack screens/LoginPage.js';
import ForgetPassPage from './getting start stack screens/ForgetPassPage.js';
import {useStore} from "./store/Store.js";


// checking notifications 
import Notification from './Notifications/Notifications.js';

const Stack = createNativeStackNavigator();

export default function App() {
  
  const personalDetails = useStore(state => state.PersonalDetails);
  const [isRegistered, setIsRegistered] = useState(personalDetails.IsRegistered);
  const [isLogin, setIsLogin] = useState(personalDetails.IsLogin);


  useEffect(() => {
    setIsRegistered(personalDetails.IsRegistered);
    setIsLogin(personalDetails.IsLogin);
  }, [personalDetails]);
 
  if(isLogin && isRegistered){         //isLogin && isRegistered
    return (
      <NavigationContainer>
             <Stack.Navigator 
                 screenOptions={{headerShown:false}}>
                 <Stack.Screen 
                     name="Tab" 
                     component={TabNavigator}
                     options={{animation:'slide_from_right'}}
                   />
                 <Stack.Screen
                     name="AddTask"
                     component={AddTask}
                     options={{animation:'slide_from_right'}}
                   />
                 <Stack.Screen
                     name="ProfilePage"
                     component={ProfilePage}
                     options={{animation:'slide_from_right'}}
                 />
                 
                 <Stack.Screen
                     name="ChangePasswordPage"
                     component={ChangePasswordPage}
                     options={{animation:'slide_from_right'}}
                 />
                 <Stack.Screen
                     name="NotificationsPage"
                     component={NotificationsPage}
                     options={{animation:'slide_from_right'}}
                 />

                 <Stack.Screen
                     name="TaskList"
                     component={TaskList}
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
            <Notification/>
         </NavigationContainer>
         
      );

  }
  if(isRegistered){    //isRegistered      
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{headerShown:false}}>
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
                <Stack.Screen 
                     name="Tab" 
                     component={TabNavigator}
                     options={{animation:'slide_from_right'}}
                />
                                 <Stack.Screen
                     name="AddTask"
                     component={AddTask}
                     options={{animation:'slide_from_right'}}
                   />
                 <Stack.Screen
                     name="ProfilePage"
                     component={ProfilePage}
                     options={{animation:'slide_from_right'}}
                 />
                 
                 <Stack.Screen
                     name="ChangePasswordPage"
                     component={ChangePasswordPage}
                     options={{animation:'slide_from_right'}}
                 />
                 <Stack.Screen
                     name="NotificationsPage"
                     component={NotificationsPage}
                     options={{animation:'slide_from_right'}}
                 />

                 <Stack.Screen
                     name="TaskList"
                     component={TaskList}
                     options={{animation:'slide_from_right'}}
                 
                 /> 
            </Stack.Navigator>
            <Notification/>
        </NavigationContainer>
      
    )

  }if(!isRegistered){           
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{headerShown:false}}>
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
                <Stack.Screen 
                     name="Tab" 
                     component={TabNavigator}
                     options={{animation:'slide_from_right'}}
                />
                                 <Stack.Screen
                     name="AddTask"
                     component={AddTask}
                     options={{animation:'slide_from_right'}}
                   />
                 <Stack.Screen
                     name="ProfilePage"
                     component={ProfilePage}
                     options={{animation:'slide_from_right'}}
                 />
                 
                 <Stack.Screen
                     name="ChangePasswordPage"
                     component={ChangePasswordPage}
                     options={{animation:'slide_from_right'}}
                 />
                 <Stack.Screen
                     name="NotificationsPage"
                     component={NotificationsPage}
                     options={{animation:'slide_from_right'}}
                 />

                 <Stack.Screen
                     name="TaskList"
                     component={TaskList}
                     options={{animation:'slide_from_right'}}
                 
                 /> 
                
            </Stack.Navigator>
            <Notification/>
        </NavigationContainer>
      
    )
  }
}
