import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../store/Store";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


export default function ForgetPassPage({route}) {

  const [fontsLoaded] = useFonts({
    Inter: require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf"),
  });
  
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const [OTPCode, setOTPCode] = useState(route.params.OTP);
  const [newPassword, setNewPassword] = useState("");
  const [generateTime, setGenerateTime] = useState(route.params.gTime);
  const personalDetails = useStore((state) => state.PersonalDetails);


  function codeHandler(code) {
    // Check if the entered code matches the OTP and if it's still valid
    const currentTime = new Date();
    const timeDifference = (currentTime - new Date(generateTime)) / 1000 / 60; // Time difference in minutes

    if (code === OTPCode && timeDifference <= 10) {
      // If the OTP is valid, route to the tab page
      navigation.navigate('Tab');
      
    } else {
      Alert.alert('Invalid or expired OTP', 'Please enter a valid OTP');
      console.log('Invalid or expired OTP');
    }
  }

  //handling user entercode
  function codeHandler(code) {
    setCode(code);
    console.log(code);
  }

  // new password
  function newPasswordHandler(newPassword) {
    setNewPassword(newPassword);
    console.log(newPassword);
  }

  // handler for login button
  function loginHandler() {
    console.log("login");
  }

  return (
    <ImageBackground
      source={require("../assets/sources/loginpages/GettingStartPage.png")}
      style={styles.body}
    >
      <LinearGradient
        colors={["#E8D2D2", "rgba(235, 205, 205, 0.36)"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image
          source={require("../assets/sources/loginpages/company logo.png")}
          style={styles.logo}
        ></Image>
        <Text style={styles.sentcode}>
          A code has sent to your email.Please Check !
        </Text>
        <View>
          <TextInput
            style={styles.inputBox}
            onChangeText={codeHandler}
            value={code}
            placeholder={"enter code here"}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={newPasswordHandler}
            value={newPassword}
            placeholder={"new password"}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={loginHandler}>
            <LinearGradient
              colors={["rgba(9, 205, 251, 0.90)", "rgba(6, 197, 242, 0.56)"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.button}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  gradient: {
    top: Dimensions.get("window").height / 3 - 150,
    borderRadius: 30,
    width: "94%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  inputBox: {
    color: "rgba(68, 62, 62, 0.80)",
    width: Dimensions.get("window").width - 100,
    height: 48,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    paddingLeft: 20,
    marginBottom: 20,
  },
  buttonGradient: {
    width: Dimensions.get("window").width - 100,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    height: 48,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#000000",
  },
  button: {
    color: "#443E3E",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 23,
    fontWeight: "700",
  },
  sentcode: {
    color: "rgba(68, 62, 62, 0.80)",
    fontFamily: "Inter",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    marginBottom: 20,
    marginTop: 20,
  },
});
