import { View , Text, StatusBar, ScrollView, Dimensions, SafeAreaView,StyleSheet,TouchableOpacity} from "react-native";
import {Header} from "../components/tabnavigatorComponents";
import {FontAwesome} from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useStore } from "../store/Store";
import { useEffect } from "react";


//sorting the notifications
function SortingButton(){
    return (
        <View style ={{flexDirection:"row-reverse"}}>
            <View style ={styles.sortbutton}>
                <Text style ={{fontSize:18,fontFamily:"Inter",fontWeight:"900",color:"rgba(166, 138, 103, 1)",padding:2}}>Motivations</Text>
            </View>
        </View>

    )

}

 // notification component 
function NotificationComponent({notification,Author}){
    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });
    if (!fontsLoaded) {
        return null;
    }

    return(
        <TouchableOpacity >
                <LinearGradient
                    colors={['#A19A6B', 'rgba(161, 154, 107, 0.3)']}
                    start={{ x: 1, y:1 }}
                    end={{ x: 0, y: 0 }}
                    style ={styles.notiComponent}
                >
                    <FontAwesome name="circle" size={10} color="#AAA932" />
                    <View style={{marginLeft:10,paddingRight:15}}>
                        <Text style ={styles.notification}>"{notification}"</Text>
                        <Text style ={styles.time}>~ {Author} ~</Text>
                    </View>
                </LinearGradient>
        </TouchableOpacity>

      
    )
};


export default function Notifications(){
    
    const motivations = useStore((state) => state.MotivationList);

    // notification component mapping
    function NotificationCreator(props){
        return(
            <NotificationComponent
                notification = {props.Body}
                Author = {props.Author}
            />
        )
    }

   


    return(
        <LinearGradient
                colors={['rgba(57, 54, 54, 0.8)', 'rgba(166, 138, 103, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
            <StatusBar/>
            <Header
                headerName = "Notifications"
            />
            <SortingButton/>
            <ScrollView>
                {motivations.map(NotificationCreator)}
                <View style ={{marginBottom:"200%"}} ></View>
            </ScrollView> 
           


        </LinearGradient>

    )
};
const styles =StyleSheet.create({
    notificationBox:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        width:Dimensions.get("window").width-40,
        margin:10,
        padding:10,
        borderRadius:20,
        backgroundColor:"rgba(57, 54, 54, 0.8)"
    },
    notification:{
        fontFamily:"Inter",
        fontSize:18,
        fontWeight:"bold",
        color:"#F4E6E6"
    },
    time:{
        fontFamily:"Inter",
        fontSize:14,
        color:"#F4E6E6",
        marginLeft:Dimensions.get("window").width/2-20
    },
    notiComponent:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        marginTop:10,
        width:Dimensions.get("window").width-20,
        alignSelf:"center",
        borderRadius:20,
        padding:5
    },
    sortbutton:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
        marginRight:20,
        backgroundColor:"rgba(57, 54, 54,0.7)",
        padding:10,
        borderRadius:15,
        marginTop:16,
        marginBottom:5
    }

})