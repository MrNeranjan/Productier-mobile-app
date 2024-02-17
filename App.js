import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View ,ImageBackground,Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator/TabNavigator.js";
import AddTask from "./tab navigater screens/AddTakPage.js";
import ProfilePage from "./setting stack screens/profile.js";
import ChangePasswordPage from "./setting stack screens/passwordChange.js";
import NotificationsPage from "./setting stack screens/NotificationHandle.js";

const Stack = createNativeStackNavigator();
export default function App() {

  const [isRegistered, setIsRegistered] = useState(false);

  if (!isRegistered){
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
                            name="addPage"
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

                    </Stack.Navigator>

                    {/* other settings pages should  add  */}
                

                </NavigationContainer>
    );
  }else{

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        
      </View>
    );
  }

}

const styles = StyleSheet.create({
  bodyNotRegistered:{        
    width: Dimensions.get("window").width,
    height: "100%"
},
});
