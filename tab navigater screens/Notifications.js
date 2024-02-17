import { View , Text, StatusBar, ScrollView, Dimensions, SafeAreaView,StyleSheet,TouchableOpacity} from "react-native";
import {Header} from "../components/tabnavigatorComponents";
import {FontAwesome} from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";


//sorting the notifications
function SortingButton(){
    return (
        <View style ={{flexDirection:"row-reverse"}}>
            <View style ={styles.sortbutton}>
                <Text style ={{fontSize:18,fontFamily:"Inter",fontWeight:"900",color:"rgba(166, 138, 103, 1)"}}>Sort</Text>
                <TouchableOpacity>
                    <FontAwesome name="sort" size={27} color="#AAA932" marginLeft={10}/>
                </TouchableOpacity>
            </View>
        </View>

    )

}

 // notification component 
function NotificationComponent({notification,time,date}){
    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });

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
                        <Text style ={styles.notification}>you have successfully completed</Text>
                        <Text style ={styles.time}>10.00 am</Text>
                    </View>
                </LinearGradient>
        </TouchableOpacity>

      
    )
};


export default function Notifications(){

    // example of the notifications

    const notifications =[
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
        {id:1,notification:"you have successfully completed",time:"10.00 am",date:"2021-09-20"},
    ]
    // notification component mapping
    function NotificationCreator(props){
        return(
            <NotificationComponent
                notification = {props.notification}
                time = {props.time}
                date = {props.date}
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
                {notifications.map(NotificationCreator)}
                <View style ={{marginBottom:"100%"}} ></View>
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
        color:"#F4E6E6"
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
        width:80,
        borderRadius:15,
        marginTop:16,
        marginBottom:5
    }

})