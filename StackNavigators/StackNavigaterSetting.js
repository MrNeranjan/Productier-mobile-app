// import React from "react";
// import {NavigationContainer} from "@react-navigation/native";
// import {createNativeStackNavigator} from "@react-navigation/native-stack";
// import { StatusBar } from "react-native";

// const Stack = createNativeStackNavigator();

// export default function LoginStack(){
//     return(
//         <NavigationContainer>
//             <StatusBar/>
//             <Stack.Navigator
//                 screenOptions={{headerShown:false}}
//             >
//                 <Stack.Screen
//                     name="ProfilePage"
//                     component={ProfilePage}
//                     options={{animation:'slide_from_right'}}
//                 />
                
//                 <Stack.Screen
//                     name="ChangePasswordPage"
//                     component={ChangePasswordPage}
//                     options={{animation:'slide_from_right'}}
//                 />
//                 <Stack.Screen
//                     name="NotificationsPage"
//                     component={NotificationsPage}
//                     options={{animation:'slide_from_right'}}
//                 />
//                 <Stack.Screen
//                     name="SecurityPage"
//                     component={SecurityPage}
//                     options={{animation:'slide_from_right'}}
//                 />
//                 <Stack.Screen
//                     name="UpgradePage"
//                     component={UpgradePage}
//                     options={{animation:'slide_from_right'}}
//                 />
//                 <Stack.Screen
//                     name="HelpSupportPage"
//                     component={HelpSupportPage}
//                     options={{animation:'slide_from_right'}}
//                 />
//                 <Stack.Screen
//                     name="GiveFeedbackPage"
//                     component={GiveFeedbackPage}
//                     options={{animation:'slide_from_right'}}
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }