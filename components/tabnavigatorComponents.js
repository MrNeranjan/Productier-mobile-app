import React,{useState} from "react";
import { View,Text,StyleSheet, StatusBar ,Image,Dimensions} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {useFonts} from "expo-font";


// get days array
function getDaysArray() {
    const currentDate = new Date();
    const dateArray = [];
    
    for (let i = -3; i < 4; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + i);
        dateArray.push({
            day: date.toLocaleDateString('en-US', { day: 'numeric' }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
            month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
            year: date.toLocaleDateString('en-US', { year: 'numeric' })
        });
    }
     return dateArray;
}

// create date bar
function CreateDateBar({day,weekday}) {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString('en-US', { day: 'numeric' });
    const currentWeekday = currentDate.toLocaleDateString('en-US', { weekday: 'short' });

    const isToday = day === currentDay && weekday === currentWeekday;

    return(
        <View style ={[{alignItems:"center",margin:6},isToday ? styles.hilightedDay:null]} >
            <Text style={isToday ? styles.hilightedtext : styles.dayCom}>{day}</Text>
            <Text style={isToday ? styles.hilightedtext : styles.dayCom}>{weekday}</Text>
        </View>
    )
}




function Header(){

    const dayList = getDaysArray();

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    })

    return (
        
        <View style ={{backgroundColor:"rgba(57, 54, 54, 1)",paddingBottom:20,borderBottomRightRadius:30,borderBottomLeftRadius:30}}>
            <StatusBar/>
            <View style ={{flexDirection:"row",justifyContent:"space-between",margin:20}}>
                <View>
                    <FontAwesome name ="th-large" color ="#8F816F" size={30}/>
                </View>
                <Text style= {{color:"#8F816F",fontWeight:"bold",fontFamily:"Inter",fontSize:24}}>
                    Task
                </Text>
                <View style={{borderRadius:25,borderWidth :2,borderColor:"#8F816F"}}>
                    <Image 
                        source={require("../assets/sources/loginpages/profilePic.png")}
                        style={{width:30,height:30,borderRadius:25}}
                    />
                </View>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <FontAwesome name="calendar" size={25} color="#F6F3F3" />
                <Text style ={styles.dateYear}> {dayList[3].month}, {dayList[3].year}</Text>
            </View>
            <View style ={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                {dayList.map((date, index) => <CreateDateBar key={index} day={date.day} weekday={date.weekday} />)}
            </View>
        </View>
    )
};

export {Header};
const styles = StyleSheet.create(
    {
        dateYear:{
            color: "#F6F3F3",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: "700",
            margin: 6,
        },
        dayCom:{
            color: "#FFF",
            fontFamily: "Inter",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "100",
        },
        hilightedDay:{
            backgroundColor:"#8F816F",
            borderRadius:10,
            padding:5,
            fontFamily: "Inter",
            fontSize: 20,
            fontWeight: "700",
        },
        hilightedtext:{
            color:"#FFF",
            fontFamily: "Inter",
            fontSize: 16,
            fontWeight: "700",
        }
        

    }
)