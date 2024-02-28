import { View , Text, StatusBar, ScrollView, Dimensions, SafeAreaView,StyleSheet,TouchableOpacity,Image} from "react-native";
import {Header,SearchBox,TaskList,TaskComponent} from "../components/tabnavigatorComponents";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';  
import { useFonts } from "expo-font";
import {useStore} from "../store/Store.js";
import { useState } from "react";

function SettingSection({iconName,settingName,navigatePage}){
    
    const navigation = useNavigation();

    

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });


    function navigate(){
        navigation.navigate(navigatePage);
    }


    return(
        <LinearGradient
            colors={['#A19A6B', 'rgba(161, 154, 107, 0.3)']}
            start={{ x: 1, y:1 }}
            end={{ x: 0, y: 0 }}
            style ={{marginTop:10,width:Dimensions.get("window").width-60,alignSelf:"center",borderRadius:20,padding:10}}
        >
            <TouchableOpacity style={styles.settingComment} onPress={navigate}>
                <View style={{flexDirection:"row",alignContent:"center",alignItems:"center"}}>
                    <View style ={{marginLeft:3,width:26}}>
                        <FontAwesome name={iconName} size={24} color="rgba(57, 54, 54, 1)" />
                    </View>
                    <Text style ={{fontFamily:"Inter",fontSize:17,fontWeight:"900" ,color :"#F4E6E6"}}> { }{settingName}</Text>
                </View>
                    <FontAwesome name="chevron-right" size={24} color="rgba(57, 54, 54, 0.7)" />
            </TouchableOpacity>
        </LinearGradient>
    )

};

export default function Settings(){
    const [loginStatus, setLoginStatus] = useState(false);
    const profileDetails = useStore((state) => state.PersonalDetails);
    const setPersonalDetails = useStore((state) => state.setPersonalDetails);
    const navigation = useNavigation();

    function ProfilePage(){
        navigation.navigate("ProfilePage");
    }

    // LOGOUT FUNCTION
    function Logout(){
        setPersonalDetails({ IsLogin: loginStatus });
        navigation.navigate("LoginPage")
    }


    return(
        <LinearGradient
            colors={['rgba(57, 54, 54, 0.6)', 'rgba(166, 138, 103, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar/>
            <View style={styles.topBar}>
                <Text style={{ color: "#8F816F", fontSize: 18, fontWeight: "bold" ,fontFamily:"Inter" }}>Settings</Text>
                <View style={{ margin: 20 }}></View>
            </View>
            <View style ={styles.imageBox} >
                <Image
                    source={profileDetails.image ? { uri: profileDetails.image } : require("../assets/sources/loginpages/profilePic.png")}
                    style={styles.Image}
                />
                <View>
                    <Text style = {styles.Name}>{profileDetails.name}</Text>
                    <Text style = {styles.email} >{profileDetails.email}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={Logout}>
                        <FontAwesome name = "sign-out" size={24} color="rgba(166, 138, 103, 1)" marginBottom={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ProfilePage}>
                        <FontAwesome name = "edit" size={24} color="rgba(166, 138, 103, 1)"/>
                    </TouchableOpacity>
                </View>
            </View>
            <LinearGradient
                colors={['rgba(57, 54, 54, 0.8)', 'rgba(166, 138, 103, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style ={styles.middleGradient}
            
            >
                <View style={{height:10}}></View>

                <Text style ={styles.title}>
                    General
                </Text>

                <SettingSection
                    iconName="lock"
                    settingName="Change Password"
                    navigatePage="ChangePasswordPage"
                
                />
                <SettingSection
                    iconName="bell"
                    settingName="Notifications"
                    navigatePage="NotificationsPage"
                
                />
                <SettingSection
                    iconName="shield"
                    settingName="Security"
                    navigatePage=""
                
                />
                <SettingSection
                    iconName="star"
                    settingName="Upgrade to Pro"
                    navigatePage=""
                
                />

                <Text style ={styles.title}>
                    More
                </Text>

                <SettingSection
                    iconName="dot-circle-o"
                    settingName="Help & Support"
                    navigatePage=""
                
                />
                <SettingSection
                    iconName="dot-circle-o"
                    settingName="Give Feedback"
                    navigatePage=""
                
                />
                <SettingSection
                    iconName="dot-circle-o"
                    settingName="Share With Your Friends"
                    navigatePage=""
                
                />
                <View style={{height:10}}></View>

            </LinearGradient>
            <View style={{height:"100%"}}></View>

        </LinearGradient>
    )
};

const styles =StyleSheet.create({
    topBar: {
        backgroundColor: "rgba(57, 54, 54,0.8)",
        alignItems: "center",
        height: 70,
        padding: 20,
        width: "100%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    Image:{ width: 90,
        height: 90,
        borderRadius: 75, 
        alignSelf: "center",
        marginTop: 5, 
        marginBottom:5,
        borderWidth: 3,
        borderColor: "#8F816F"   
   },
   Name:{
       fontFamily:"Inter",
       fontSize:30,
       width:Dimensions.get("window").width/1.75,
       fontWeight:"bold",
       color:"rgba(166, 138, 103, 1)"
   },
   email:{
        fontFamily:"Inter",
        fontSize:14,
        fontWeight:"700",
        width:Dimensions.get("window").width/1.70,
        color:"rgba(166, 138, 103, 0.7)",
      
    },
    imageBox:{  
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        backgroundColor:"rgba(57, 54, 54,0.8)" ,
        width:Dimensions.get("window").width-20,
        alignSelf:"center",
        borderRadius:20,
        marginTop:20
    },
    settingComment:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:Dimensions.get("window").width-80
    },
    title:{
        fontFamily:"Inter",
        fontSize:25,
        fontWeight:"800",
        color:"#F4E6E6"
    },
    middleGradient:{
        marginTop:20,
        width:Dimensions.get("window").width-20,
        alignSelf:"center",
        borderRadius:20,
        padding:10
    }
})