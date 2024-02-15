import React,{useState} from "react";
import { View,Text,StyleSheet, StatusBar ,Image,Dimensions, TextInput, ScrollView,TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {useFonts} from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from 'expo-checkbox';


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


// search box with categories 
function SearchBox(){   
    const [searchText, setSearchText] = useState("");

    function SearchTextHandler(text){
            setSearchText(text);
            console.log(searchText);
        };

    function CategoryButtonHandler(){
        console.log("category button");
    }

    function CategoryButton({categoryName}){
        const [fontsLoaded] = useFonts({
            "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
        })
        return(
           
            <TouchableOpacity
                onPress={CategoryButtonHandler}
            >
                <LinearGradient
                    colors={['rgba(180,183,33,1)', 'rgba(180,183,33,0.481)', 'rgba(210,211,151,0.30)']}
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 0}} 
                    style={styles.categoryButton} 
                >
                    <Text style={{color:"#393636",fontFamily:"Inter",fontSize:16,fontWeight:"700",alignSelf:'center'}}>{categoryName}</Text>
                 </LinearGradient>  
            </TouchableOpacity>
            
        )
    }

    return(
        <View>
            <LinearGradient
                colors={["rgba(57,54,54,0.73)","rgba(57,54,54,1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{padding:7,borderRadius:20,margin:10,marginHorizontal:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}
            >
                <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                    <FontAwesome name="search" size={18} color="#8F816F" />
                    <TextInput
                        style={{color:"#F6F3F3",marginLeft:10}}
                        placeholder="Search Category"
                        placeholderTextColor="#F6F3F3"
                        onChangeText={SearchTextHandler}  
                    />
                </View>
            </LinearGradient>
            <ScrollView
                horizontal={true}
                style={{marginHorizontal:10}}
            >
                {/* category buttons EXAMPLE*/}
                <CategoryButton categoryName="Office work"/>
                <CategoryButton categoryName="Office work"/>
                <CategoryButton categoryName="Office work"/>
                <CategoryButton categoryName="Office work"/>
                <CategoryButton categoryName="Office work"/>


            </ScrollView>
        </View>
    )
};

// Task list 
function TaskList({name,displayI}){


    function AddTaskHandler(){
        console.log("Add task");
    }


    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    })
    return(
        <View>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center", marginHorizontal:10,marginTop:10}}>
                <Text style={{color:"black",fontSize:20,fontWeight:"bold",fontFamily:"Inter"}}>{name}</Text>

                {displayI ?
                <TouchableOpacity
                    onPress={AddTaskHandler}
                
                >
                    <LinearGradient
                        colors={['rgba(57,54,54,0.6)', 'rgba(57,54,54,1)']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}} 
                        style={styles.addButton} 
                    >
                    
                             <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <Text style ={{color:"#00E809",fontSize:15,fontWeight:"bold",margin:10,fontFamily:"Inter"}}>
                                        Add Task
                                    </Text>
                             </View> 

                    
                    </LinearGradient>
                </TouchableOpacity>
                :
                null}
            </View>
            
            <ScrollView>
            </ScrollView>
        </View>
    )
}




function Header({headerName}){

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
                    {headerName}
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

// Task component for display in task list
function TaskComponent({taskName,taskTime,taskCategory}){

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    })

    const [isChecked, setChecked] = useState(false);


    return(
        <View style ={styles.taskListComponent}>

            <View>
                <Checkbox
                    style={{marginLeft:15,marginRight:1}}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "green" : "rgba(57, 54, 54, 1)"}
                    />
            </View>

            <LinearGradient
                colors={["rgba(161,154,107,1)","rgba(136,127,105,0.7)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.taskListComponentText}
            
            >
                <View>
                    <Text style ={{fontFamily:"Inter",fontSize:17,fontWeight:"600"}}>
                        {taskName}
                    </Text>
                    <Text style ={{fontFamily:"Inter",fontSize:12}}>
                        {taskTime} 
                    </Text>
                    <Text style ={{fontFamily:"Inter",fontSize:12}}>
                        {taskCategory}
                    </Text>
                </View>
            </LinearGradient>
        </View>
    )
}




export {Header,SearchBox,TaskList,TaskComponent};


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
        },
        categoryButton:{
            width: 120,
            height:50,
            borderRadius:20,
            justifyContent:"center",
            textAlign:"center",
            marginRight:15
        },
        addButton:{
            width:105,
            height:40,
            borderRadius:15,
        },
        taskListComponentText:{
            padding:10,
            margin:10,
            borderTopRightRadius:20,
            borderBottomRightRadius:20,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            width:Dimensions.get("window").width-60
        },
        taskListComponent:{
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center",
        }
        

    }
)