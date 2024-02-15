import React,{useState} from 'react';
import {Text, View,Image, StyleSheet, TouchableOpacity,ImageBackground,StatusBar,Dimensions, TextInput, KeyboardAvoidingView} from 'react-native';
import {useFonts} from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';


export default function LoginPage(){

    const navigation = useNavigation();
    
    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    })

    // get email
    const [email, setEmail] = useState('');

    // get password
    const [password, SetPassword] = useState('');


    // handler for login button
    function LoginHandler(){
        console.log("login");
    }

    // handler for forget password
    function forgetPasswordHandler(){
        console.log("forget password");
        navigation.navigate("ForgetPassPage")
    }

    // handler for google login
    function GoogleLoginHandler(){
        console.log("google login");
    }

    return(
        <ImageBackground
            source={require("../assets/sources/loginpages/GettingStartPage.png")}
            style ={styles.body}
        >
            <KeyboardAvoidingView>
                <LinearGradient
                    colors={['#E8D2D2', 'rgba(235, 205, 205, 0.36)']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Image
                        source={require("../assets/sources/loginpages/company logo.png")}
                        style={styles.logo}
                    >
                    </Image>
                    <View >
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={setEmail}
                            value={email}
                            placeholder={'email'}
                            
                        />
                        <TextInput
                            style={styles.inputBox}
                            onChangeText={SetPassword}
                            value={password}
                            placeholder={'password'}
                            secureTextEntry={true}
                            
                        />
                        <TouchableOpacity
                            onPress={LoginHandler}
                        >
                            <LinearGradient
                                colors={['rgba(9, 205, 251, 0.90)', 'rgba(6, 197, 242, 0.56)']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}

                            >
                                <Text style ={styles.button} >
                                    Login
                                </Text>
                                
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={forgetPasswordHandler}>
                            <Text style={styles.forgetPassword}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                        <Text style ={styles.or}>
                            or
                        </Text>
                        <TouchableOpacity onPress={GoogleLoginHandler}>
                            <LinearGradient
                                colors={['#BEF8A3', '#66FA20']}
                                style={[styles.buttonGradient,{borderRadius:10,marginTop:15}]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}

                            >
                        
                                <View style ={{ flexDirection: 'row', alignItems: 'center' ,alignSelf :"center",justifyContent:"space-evenly"}}>
                                    <Image
                                        style={{width: 30, height: 30,marginRight:20}}
                                        source={require("../assets/sources/loginpages/Google.png")}
                                    />
                                    <Text style ={[styles.button,{borderRadius:10,fontSize:20, fontWeight:"600"}]} >
                                        Continue with Google
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        
                    </View>

                </LinearGradient>
            </KeyboardAvoidingView>

        </ImageBackground>
    )

};

const styles = StyleSheet.create({
    body:{
        width: Dimensions.get("window").width,
        height: "100%"
    },
    gradient: {
        position: 'absolute',
        top: Dimensions.get("window").height/3-150,
        borderRadius: 30,
        width: '94%', 
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    inputBox:{
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
    buttonGradient:{
        width: Dimensions.get("window").width - 100,
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
        height: 48,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#000000",
        

    },
    button:{
        color: "#443E3E",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: 23,
        fontWeight: "700"
    },
    forgetPassword:{
        color: "#443E3E",
        fontFamily: "Inter",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "700"
    },
    or:{
        color: "#443E3E",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: 25,
        fontStyle: "normal",
        fontWeight: "700"
    },
    
    
});