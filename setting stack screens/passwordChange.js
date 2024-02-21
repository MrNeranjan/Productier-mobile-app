import React, { useState } from 'react';
import { Image,StyleSheet, Text, View, TextInput, TouchableOpacity, Button,Alert, Platform, StatusBar, ScrollView,KeyboardAvoidingView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';


export default function ChangePasswordPage({route}) {
    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //password visibility handle 
    const [CurrentPassVisible,setCurrentPassVisible] = useState(false);
    const [NewPassVisible,setNewPassVisible] = useState(false);
    const [ConfirmPassVisible,setConfirmPassVisible] = useState(false);
    

    // handling the current password input
    function handleCurrentPasswordChange(text) {
        setCurrentPassword(text);
    }

    // handling the new password input
    function handleNewPasswordChange(text) {
        setNewPassword(text);
    }

    // handling the confirm password input
    function handleConfirmPasswordChange(text) {
        setConfirmPassword(text);
    }

    // go back 
    const navigation = useNavigation();
    function GoBack(){
        navigation.goBack();
    }

    return (
        <LinearGradient
        colors={['rgba(57, 54, 54, 0.8)', 'rgba(166, 138, 103, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style ={styles.body}
        
    >
        <StatusBar/>
        <View style={styles.topBar}>
            <TouchableOpacity onPress={GoBack}>
                <FontAwesome name="chevron-left" size={24} color="#8F816F" />
            </TouchableOpacity>
            <Text style={{ color: "#8F816F", fontSize: 18, fontWeight: "bold" ,fontFamily:"Inter" }}>Change Password</Text>
            <View style={{ margin: 20 }}></View>
        </View>
        <ScrollView>
            <KeyboardAvoidingView>
                <View style = {styles.middleBox}>
                    <View>
                        <Text style={[styles.title,{paddingTop:20}]}>
                            Current Password
                        </Text>
                        <View>
                            <TextInput
                                placeholder='Current password'
                                onChangeText={handleCurrentPasswordChange}
                                secureTextEntry ={!CurrentPassVisible}
                                style={styles.inputBox}
                            />
                            <TouchableOpacity onPress={() => setCurrentPassVisible(!CurrentPassVisible)} style={styles.eye}>
                                 <FontAwesome name={CurrentPassVisible ? "eye-slash" : "eye"} size={24} color="rgba(57, 54, 54, 0.8)"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            New Password
                        </Text>
                        <View>
                            <TextInput
                                placeholder='New password'
                                onChangeText={handleNewPasswordChange}
                                secureTextEntry ={!NewPassVisible}
                                style={styles.inputBox}
                            />
                            <TouchableOpacity onPress={() => setNewPassVisible(!NewPassVisible)} style={styles.eye}>
                                 <FontAwesome name={NewPassVisible ? "eye-slash" : "eye"} size={24} color="rgba(57, 54, 54, 0.8)"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            Confirm Password
                        </Text>
                        <View>
                            <TextInput
                                placeholder=' Confirm Password'
                                style={styles.inputBox}
                                onChangeText={handleConfirmPasswordChange}
                                secureTextEntry ={!ConfirmPassVisible}

                            />
                            <TouchableOpacity onPress={() => setConfirmPassVisible(!ConfirmPassVisible)} style={styles.eye}>
                                    <FontAwesome name={ConfirmPassVisible ? "eye-slash" : "eye"} size={24} color="rgba(57, 54, 54, 0.8)"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity>

                        <LinearGradient
                            colors={['rgba(180,183,33,1)', 'rgba(180,183,33,0.481)', 'rgba(210,211,151,0.30)']}
                            start={{x: 1, y: 1}}
                            end={{x: 0, y: 0}} 
                            style={{width:"30%",alignSelf:"center",borderRadius:15,marginBottom:"10%",marginTop:10}} 
                        >
                        <Text style={{color:"#393636",fontFamily:"Inter",fontSize:25,fontWeight:"700",alignSelf:'center',padding:8}}>Save</Text>
                        </LinearGradient>  
                    </TouchableOpacity>
                    
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

    </LinearGradient>

    )

};

const styles = StyleSheet.create({
    body: {
        width: Dimensions.get("window").width,
        height: "100%",
        alignItems: "center"
    },
    topBar: {
        backgroundColor: "rgba(57, 54, 54,0.8)",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 70,
        padding: 20,
        width: "100%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    middleBox:{
        backgroundColor: "rgba(57, 54, 54, 0.5)",
        width:Dimensions.get("window").width-24,
        borderRadius: 25,
        marginTop: Dimensions.get("window").height/5,

    },
    Image:{ width: 150,
         height: 150,
         borderRadius: 75, 
         alignSelf: "center",
         marginTop: 20, 
         borderWidth: 3,
         borderColor: "#8F816F"   
    },
    inputBox: {
        backgroundColor: "#B6A896",
        padding: 8,
        margin: 10,
        borderRadius: 20,
        fontSize: 15,
    },
    eye:{
        position: 'absolute', 
        right:Dimensions.get("window").width/20, 
        top: 18 
    },
    title:{ 
        marginHorizontal: 10,
        marginTop: 10, 
        fontSize: 18, 
        color: "rgba(166, 138, 103, 1)", 
        fontWeight: "bold" ,
        fontFamily:"Inter" 
    }

})