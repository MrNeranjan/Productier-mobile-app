import React, { useState } from 'react';
import { Image,StyleSheet, Text, View, TextInput, TouchableOpacity, Button,Alert, Platform, StatusBar, ScrollView,KeyboardAvoidingView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from "expo-font";

export default function ProfilePage() {
    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });

    const [dateBirth, setdateBirth] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);

    // HANDLING IMAGE PICKER
    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            
        }
    }
    
    // handling the date fo birth input
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setdateBirth(currentDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const showDatepicker = () => {
        showMode('date');
    };


    // handling the name input
     function handleNameChange(text) {
        setName(text);
        
     }

    // handling the email input
    function handleEmailChange(text) {
        setEmail(text);
    }

    // handling the phone number input
    function handlePhoneNumberChange(text) {
        setPhoneNumber(text);
    }

    return(
        <LinearGradient
            colors={['rgba(57, 54, 54, 0.8)', 'rgba(166, 138, 103, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style ={styles.body}
            
        >
            <StatusBar/>
            <View style={styles.topBar}>
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={24} color="#8F816F" />
                </TouchableOpacity>
                <Text style={{ color: "#8F816F", fontSize: 18, fontWeight: "bold" ,fontFamily:"Inter" }}>Profile</Text>
                <View style={{ margin: 20 }}></View>
            </View>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style = {styles.middleBox}>
                        <View style={{ width: 150, height: 150,alignSelf: "center"}}>
                        <Image
                            source={image ? { uri: image } : require("../assets/sources/loginpages/profilePic.png")}
                            style={styles.Image}
                        />
                            <TouchableOpacity
                                onPress={pickImage}
                            >
                                <FontAwesome name="camera" size={21} color="#8F816F"  style={{ left:120,bottom:38}} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.title}>
                                Name
                            </Text>
                            <TextInput
                                placeholder='Enter your name'
                                onChangeText={handleNameChange}
                                style={styles.inputBox}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>
                                Email
                            </Text>
                            <TextInput
                                placeholder='Ex : example@gmail.com'
                                onChangeText={handleEmailChange}
                                style={styles.inputBox}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>
                                Birthday
                            </Text>
                            <TouchableOpacity onPress={showDatepicker}>
                                <View style={[{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, styles.inputBox]}>
                                
                                    <FontAwesome
                                        name="calendar"
                                        size={18}
                                        color="#393636"
                                        style={{ marginHorizontal: 10 }}
                                    />
                                    <Text style={{ color: "#393636", fontSize: 15, padding: 5,fontFamily:"Inter"}}>{dateBirth.toLocaleDateString()}</Text>
                                
                                </View>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateBirth}
                                    mode={mode}
                                    is24Hour={false}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                        <View>
                            <Text style={styles.title}>
                                Phone Number
                            </Text>
                            <TextInput
                                placeholder=' Ex: 0776236781'
                                keyboardType='numeric'
                                maxLength={10}
                                style={styles.inputBox}
                                onChangeText={handlePhoneNumberChange}
                            />
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
        marginTop: Dimensions.get("window").height/20,

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
    title:{ 
        marginHorizontal: 10,
        marginTop: 10, 
        fontSize: 18, 
        color: "rgba(166, 138, 103, 1)", 
        fontWeight: "bold" ,
        fontFamily:"Inter" 
    }

});