import { useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { ScrollView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,StyleSheet,Dimensions ,StatusBar} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../store/Store";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TaskComponent,AddTaskList } from "../components/tabnavigatorComponents";




export default function TaskList({route}) {

    const categaryList = useStore(state => state.CategoryList);
    const category = categaryList.find(category => category.name === route.params.category.name);

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }    

    let visible = true;

    if(category.items.length === 0){
        visible = false;
    }

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });


    //creating the task component
    function createTaskComponent(item,index){
        //date formatting
        const seDATE = new Date(item.date);
        const dateString = seDATE.toDateString(); // Convert the date to a string in the format "Thu Apr 23 2020"
        const parts = dateString.split(" "); // Split the string into an array ["Thu", "Apr", "23", "2020"]
        const taskDate = parts[1] + " " + parts[2] +" "+parts[3]; // Concatenate the second and third parts with a space in between ("Apr 23")

        //time formatting
        const Stime = new Date(item.startTime);
        const Etime = new Date(item.endTime);
        const tasktime = formatTime(Stime) + " - " + formatTime(Etime);

        return(
            <TaskComponent
                key = {index}
                taskName = {item.title}
                taskTime = {tasktime}
                DATE = {taskDate}
                Description={item.description}
                taskCategory = {item.category}
                isDisplayCategory = {false}
                isDisplayDate = {true}
                isDisplayDes = {true}
            />
        )
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
                <Text style={{ color: "#8F816F", fontSize: 18, fontWeight: "bold" ,fontFamily:"Inter" }}>{category.name}</Text>
                <View style={{ margin: 20 }}></View>
            </View>
            <ScrollView>
                <KeyboardAvoidingView>
                    <AddTaskList
                        name= "Scheduled Tasks        "
                        displayI={true}
                    />
                    { visible ? category.items.map(createTaskComponent) :
                        <View>
                            <Text style={{color:"white",fontSize:20,fontWeight:"bold",alignSelf:"center",marginTop:Dimensions.get("window").height/3}}>No tasks available</Text>
                        </View>
                    }
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