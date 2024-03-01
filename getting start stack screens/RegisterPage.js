import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useStore } from "../store/Store";
import { useNavigation } from "@react-navigation/native";
const bcrypt = require("react-native-bcrypt");

export default function RegisterPage() {
  const navigation = useNavigation();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [RegisterStatus,setIsRegistered] = useState(true);
  const setPersonalDetails = useStore((state) => state.setPersonalDetails);


  const [fontsLoaded] = useFonts({
    Inter: require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf"),
  });

  // get email

  function emailHandler(email) {
    setEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }

  // get password
  function passwordHandler(password) {
    SetPassword(password);
  }

  // handler for google login
  function GoogleRegisterHandler() {
    console.log("google register");
  }

  //first name handler
  function FirstNameHandler(first_name) {
    setFirst_name(first_name);
  }

  //last name handler
  function LastNameHandler(last_name) {
    setLast_name(last_name);
  }

  // Email save to store 
  function saveEmail(){
    try {
      setPersonalDetails({email : email})
    } catch (error) {
      console.error('Error in sayingRegister:', error);
    }
  }
  
  
// function to set the register status to true 

function sayingRegister() {
  try {
    setPersonalDetails({ IsRegistered: RegisterStatus });
    console.log("Register status set to true");
  } catch (error) {
    console.error('Error in sayingRegister:', error);
  }
}


function Encrypter(password){
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}



// handler for register button
  function RegisterHandler() {
    const hashedPassword = Encrypter(password);
    const newUser = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    };
  
    axios.post("http://192.168.8.178:3000/UserRegister", newUser)
      .then((response) => {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );
        saveEmail();
        sayingRegister();
        setFirst_name("");
        setLast_name("");
        setEmail("");
        SetPassword("");
        navigation.navigate("LoginPage");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          Alert.alert("Registration Fail", "Email already exists");
          return;
        } else {
          Alert.alert(
            "Registration Fail",
            "An error occurred during registration"
          );
        }
      });
  }

  return (
    <ImageBackground
      source={require("../assets/sources/loginpages/GettingStartPage.png")}
      style={styles.body}
    >
      <KeyboardAvoidingView>
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
          <View>
            <TextInput
              style={styles.inputBox}
              onChangeText={FirstNameHandler}
              value={first_name}
              placeholder={"first name"}
            />
            <TextInput
              style={styles.inputBox}
              onChangeText={LastNameHandler}
              value={last_name}
              placeholder={"last name"}
            />
            <TextInput
              style={[
                styles.inputBox,
                !isEmailValid ? { borderColor: "red", borderWidth: 2 } : {},
              ]}
              onChangeText={emailHandler}
              value={email}
              placeholder={"email"}
            />
            <TextInput
              style={styles.inputBox}
              onChangeText={passwordHandler}
              value={password}
              placeholder={"password"}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={RegisterHandler}>
              <LinearGradient
                colors={["rgba(9, 205, 251, 0.90)", "rgba(6, 197, 242, 0.56)"]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.button}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.or}>or</Text>
            <TouchableOpacity onPress={GoogleRegisterHandler}>
              <LinearGradient
                colors={["#BEF8A3", "#66FA20"]}
                style={[
                  styles.buttonGradient,
                  { borderRadius: 10, marginTop: 15 },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30, marginRight: 20 }}
                    source={require("../assets/sources/loginpages/Google.png")}
                  />
                  <Text
                    style={[
                      styles.button,
                      { borderRadius: 10, fontSize: 20, fontWeight: "600" },
                    ]}
                  >
                    Register with Google
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  gradient: {
    marginTop: Dimensions.get("window").height / 3 - 150,
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
    fontSize: 18,
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
    borderRadius: 30,
    borderColor: "#000000",
  },
  button: {
    color: "#443E3E",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 23,
    fontWeight: "700",
  },
  or: {
    color: "#443E3E",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 25,
    fontStyle: "normal",
    fontWeight: "700",
  },
});
