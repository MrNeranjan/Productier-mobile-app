import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View ,ImageBackground,Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
// import LoginStack from "./StackNavigatorLogin/StackNavigatorLogin.js";
import TabNavigator from "./TabNavigator/TabNavigator.js";


export default function App() {

  const [isRegistered, setIsRegistered] = useState(false);

  if (!isRegistered){
    return (
             <NavigationContainer>
              
                <TabNavigator/>
                {/* <Header
                    headerName="Task"
                /> 
                <SearchBox/>
                <TaskList/> 
                <TaskComponent
                    taskName="Start a company meeting"
                    taskCategory="office work"
                    taskTime="12:00 am - 1:00 pm"
                
                /> */}
                {/* <AddTask/> */}
                {/* <ProfilePage/> */}
                {/* <ChangePasswordPage/> */}
                {/* <NotificationsPage/> */}
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
