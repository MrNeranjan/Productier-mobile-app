import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView,KeyboardAvoidingView, Dimensions,Vibration } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ToggleSwitch from 'toggle-switch-react-native'
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';


export default function NotificationsPage() {
    // notification handling 
    const [DailyMotivation, setDailyMotivation] = useState(false);
    const [GeneralNotifications, setGeneralNotifications] = useState(false);
    const [VibrationEnabled,setVibration] =useState(false);

    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });

    // vibration handler
    function VibrationHandler(){
        if (!VibrationEnabled){
            Vibration.vibrate()
        }
        setVibration(!VibrationEnabled);
        
    }
    // go back 

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
            <Text style={{ color: "#8F816F", fontSize: 18, fontWeight: "bold" ,fontFamily:"Inter" }}>Notifications</Text>
            <View style={{ margin: 20 }}></View>
        </View>
        <ScrollView>
            <KeyboardAvoidingView>
                <View style = {styles.middleBox}>
                    <View style ={styles.notify}>
                        <Text style={[styles.title]}>
                            Daily Motivations
                        </Text>
                        <ToggleSwitch
                            style ={styles.switch}
                            isOn={DailyMotivation}
                            onColor="green"
                            offColor="rgba(57, 54, 54, 0.8)"
                            size="small"
                            onToggle={() => setDailyMotivation(!DailyMotivation)}
                        
                        />
                    </View>
                    <View style ={styles.notify}>
                        <Text style={[styles.title]}>
                            General Notifications
                        </Text>
                        <ToggleSwitch
                            style ={styles.switch}
                            isOn={GeneralNotifications}
                            onColor="green"
                            offColor="rgba(57, 54, 54, 0.8)"
                            size="small"
                            onToggle={() => setGeneralNotifications(!GeneralNotifications)}
                        
                        />
                    </View>
                    <View style ={styles.notify}>
                        <Text style={[styles.title]}>
                            Vibration
                        </Text>
                        <ToggleSwitch
                            style ={styles.switch}
                            isOn={VibrationEnabled}
                            onColor="green"
                            offColor="rgba(57, 54, 54, 0.8)"
                            size="small"
                            onToggle={VibrationHandler}
                        
                        />
                    </View>
                    
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
    Icon:{
        position: 'absolute', 
        right:Dimensions.get("window").width/20, 
        top: 18 
    },
    notify:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },

    switch:{
        margin:18  
    },
    title:{ 
        marginHorizontal: 10,
        marginTop: 10, 
        fontSize: 20, 
        color: "rgba(166, 138, 103, 1)", 
        fontWeight: "bold" ,
        fontFamily:"Inter" 
    }

})