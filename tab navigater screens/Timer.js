import React,{useState,useRef,useEffect} from "react";
import { View , Text, StatusBar, ScrollView, Dimensions, SafeAreaView,StyleSheet,TextInput,Alert, TouchableOpacity} from "react-native";
import {Header} from "../components/tabnavigatorComponents";
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

export default function Analysis(){

        const progressRef = useRef(null);
        const [isReset, setIsReset] = useState(false);
        const [isPaused, setIsPaused] = useState(false);
        const [duration, setDuration] = useState(0);
        const [totalTime,setTotalTime] =useState(0)
        const [Minutes, setMinutes] = useState(0);
        const [hours, setHours] = useState(0);
        const [days, setDays] = useState(0);

        const [fontsLoaded] = useFonts({
            "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
        })

    
        // handling the reminder inputs
        function MinutesHandler(Minutes){
            setMinutes(Minutes)
        }
        function HoursHandler(hours){
            setHours(hours)
        }
    
        function DaysHandler(days){
            setDays(days)
        }

        // Update TotalTime whenever input values change


        useEffect(() => {
            const totalTime = (Minutes * 60) + (hours * 3600) + (days * 3600 * 24);
            setTotalTime(totalTime);
            setDuration(totalTime * 1000);
        }, [Minutes, hours, days]);
        // to pause animation

        function PushHandler(){
            progressRef.current.pause();
            setIsPaused(true);
            
        }
        
        // to play animation
        function PlayHandler(){
            progressRef.current.play();
            setIsPaused(false);
        }

        // to re-play animation
        function RePlayHandler() {
            if (isReset) {
                setMinutes(0);
                setHours(0);
                setDays(0);
                setIsReset(false);
            } else {
                progressRef.current.reAnimate();
                setIsReset(true);
            }
        }

    return(
        
        <View>
            <LinearGradient
                colors={['rgba(57, 54, 54, 0.8)', 'rgba(166, 138, 103, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
            <StatusBar/>
            <Header
                headerName = "Counter"
            />
            <View style ={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",marginTop:40}}>
                <Text style={{fontSize:30,fontFamily:"Inter",fontWeight:"bold",color:"rgba(57, 54, 54, 1)"}}>Set Timer</Text>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                                <View>
                                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                        <View style={{alignItems:"center"}}>
                                            <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 11, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter"}}>
                                                days
                                            </Text>
                                            
                                                <View style={[{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, styles.inputBox]}>
                                                    <TextInput
                                                            
                                                            placeholder='00'
                                                            style={{alignSelf:"center",padding:2,fontSize:18}}
                                                            onChangeText={DaysHandler}
                                                            keyboardType='numeric'
                                                            maxLength={3}
                                                            value={(days)}
                                                        />
                                                </View>
                                            
                                        </View>
                                        <Text style={{fontSize:15,fontWeight:"bold"}}>:</Text>
                                        <View style={{alignItems:"center"}}>
                                            <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 11, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter"}}>
                                                Hours
                                            </Text>
                                                <View style={[{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, styles.inputBox]}>
                                                    <TextInput
                                                    
                                                           
                                                            value={(hours)}
                                                            placeholder='00'
                                                            style={{alignSelf:"center",padding:2,fontSize:18}}
                                                            onChangeText={(text)=>{
                                                                if (text<= 24) {
                                                                    HoursHandler(text);
                                                                }else{
                                                                    Alert.alert("Hours should be less than 24")
                                                                }
                                                            }}
                                                            keyboardType='numeric'
                                                            maxLength={2}
                                                            
                                                        />
                                                </View>
                                        </View>
                                        <Text style={{fontSize:15,fontWeight:"bold"}}>:</Text>

                                        <View style={{alignItems:"center"}}>

                                            <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 11, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter"}}>
                                                minutes
                                            </Text>
                                                <View style={[{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, styles.inputBox]}>
                                                    <TextInput
                                                        
                                                        placeholder='00'
                                                        style={{alignSelf:"center",padding:2,fontSize:18}}
                                                        onChangeText={(text) => {
                                                            if (text<= 60) {
                                                                MinutesHandler(text);
                                                            }else{
                                                                Alert.alert("Minutes should be less than 60")
                                                            }
                                                        }}
                                                        keyboardType='numeric'
                                                        maxLength={2}
                                                        value={(Minutes)}
                                                    />
                                                </View>
                                        </View>
                                    </View>
                                </View>
                    </View>
            </View>
            
            <View style ={{alignSelf:"center",marginTop:20,marginBottom:20}}>
                    
                    <CircularProgress
                        ref={progressRef}
                        value={0}
                        progressValueFontSize={40}
                        radius={Dimensions.get("window").width/3.5}
                        inActiveStrokeColor={'#BC3939'}
                        activeStrokeColor={'#2ecc71'} 
                        maxValue={totalTime}
                        initialValue={totalTime}
                        progressValueColor={'#ABAA32'}
                        activeStrokeWidth={28}
                        inActiveStrokeWidth={20}
                        duration={duration}
                        progressFormatter={(value) => {
                            'worklet';
                            const hours = Math.floor(value / 3600); 
                            const minutes = Math.floor((value % 3600) / 60);
                            const seconds = Math.floor(value % 60);

                            const hoursStr = String(hours).padStart(2, '0');
                            const minutesStr = String(minutes).padStart(2, '0');
                            const secondsStr = String(seconds).padStart(2, '0');
                        
                            return (value ?`${hoursStr}:${minutesStr}:${secondsStr}` :"00:00:00");
                        }}
                    />
            </View>
            <View style={{marginBottom:"200%",flexDirection:"row",justifyContent:"space-evenly"} }>
                <TouchableOpacity onPress={isPaused ? PlayHandler : PushHandler} style={styles.button}>
                     <Text style ={styles.textBottom}>{isPaused ? 'Resume' : 'Stop'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={RePlayHandler} style={styles.button}>
                     <Text style ={styles.textBottom}>{isReset ? 'Clear' : 'Start'}</Text>
                </TouchableOpacity>
            </View>
            </LinearGradient>
        </View>
       
    )
};

const styles =StyleSheet.create({
    text :{
        alignSelf:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    inputBox: {
        backgroundColor: "#B6A896",
        padding: 8,
        margin: 10,
        borderRadius: 10,
        fontSize: 15,
    },
    button: {
        backgroundColor: 'rgba(57, 54, 54, 0.8)',
        width:Dimensions.get("window").width/3.6,
        padding: 10,
        borderRadius: 10,
        borderWidth:2,
        borderColor:'#ABAA32',
        alignItems: "center",
        
    },
    textBottom:{
        fontWeight:"bold",
        fontFamily:"Inter",
        fontSize: 20,
        color:'#ABAA32'
    }

})