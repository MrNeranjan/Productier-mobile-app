import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function GettingStartPage() {
  // load fonts
  const [fontsLoaded] = useFonts({
    "Bilbo Swash Caps": require("../assets/sources/fonts/BilboSwashCaps-Regular.ttf"),
    Inter: require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf"),
  });

  const navigation = useNavigation();
  // handler for get started button
  function getStartedHandler() {
    console.log("get started");
    navigation.navigate("RegisterPage");
  }

  // handler for login button
  function loginHandler() {
    console.log("login");
    navigation.navigate("LoginPage");
  }

  return (
    <ImageBackground
      source={require("../assets/sources/loginpages/GettingStartPage.png")}
      style={styles.body}
    >
      <View style={styles.toptext}>
        <Text style={styles.setGoals}>set Goals</Text>
        <Text style={styles.setGoals}>works smartly</Text>
      </View>
      <View style={styles.buttonwithtext}>
        <View>
          <TouchableOpacity onPress={getStartedHandler}>
            <LinearGradient
              colors={["rgba(9, 205, 251, 0.90)", "rgba(6, 197, 242, 0.56)"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.button}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={styles.alreadyAccount}>Already have an account?</Text>
          <TouchableOpacity onPress={loginHandler}>
            <Text style={styles.login}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    width: Dimensions.get("window").width,
    height: "100%",
  },

  setGoals: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Bilbo Swash Caps",
    fontSize: 60,
    fontStyle: "normal",
    fontWeight: "400",
  },
  buttonGradient: {
    width: "50%",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 30,
    marginBottom: 10,
  },
  button: {
    color: "#021C39",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 23,
    fontStyle: "normal",
    fontWeight: "700",
  },
  toptext: {
    position: "absolute",
    top: Dimensions.get("window").height / 3 - 90,
    width: "100%",
  },
  buttonwithtext: {
    position: "absolute",
    bottom: Dimensions.get("window").height / 3 - 200,
    width: "100%",
    justifyContent: "space-around",
  },
  alreadyAccount: {
    color: "#918F8F",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "600",
  },
  login: {
    color: "#1494B2",
    fontWeight: "bold",
  },
});
