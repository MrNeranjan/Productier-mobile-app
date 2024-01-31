import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ImageBackground,Dimensions, KeyboardAvoidingView, ScrollView} from 'react-native';
import LoginStack from "./StackNavigatorLogin/StackNavigatorLogin.js";
import {Header} from './components/tabnavigatorComponents.js';

export default function App() {

  const [isRegistered, setIsRegistered] = useState(false);

  if (!isRegistered){
    return (
              <Header/>  
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
