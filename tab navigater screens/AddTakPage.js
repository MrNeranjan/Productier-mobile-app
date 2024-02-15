import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button,Alert, Platform, StatusBar, ScrollView,KeyboardAvoidingView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'
import ToggleSwitch from 'toggle-switch-react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";

export default function AddTask() {

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    })
    const [date, setDate] = useState(new Date());
    const [Starttime, setStartTime] = useState(new Date());
    const [Endtime, setEndTime] = useState(new Date());
    const [StartOrEnd,setTime] = useState(["",""])
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState("")


    // this data for illustration purpose
    const data = [
        {key:'1', value:'Mobiles', disabled:true},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ]

    function setSelected(val){
        setCategory(val)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showStartTimepicker = () => {
        showMode('time');
        setTime(["Starttime",""])
    };

    const showEndTimepicker = () => {
        showMode('time'); 
        setTime(["","Endtime"])
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        
    };

    const onChangeStartTime = (event, selectedTime) => {
        const currentTime = selectedTime || Starttime;
        setShow(Platform.OS === 'ios');
        setStartTime(selectedTime);
    }

    const onChangeEndTime = (event, selectedTime) => {
        const currentTime = selectedTime || Endtime;
        setShow(Platform.OS === 'ios');
        setEndTime(currentTime);
    }

    //reminders
    const [Minutes,setMinutes]= useState(0)
    const [hours,setHours]= useState(0)
    const [days,setDays]= useState(0)

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

    //toggle switch
    const [onORoff, setonORoff] = useState(false)
    function toggleSwitchHandler(){
        setonORoff(!onORoff)
        
    }

    //save button
    function saveHandler(){
        console.log("save")
    }

    // dropdown and scrollview issue handler
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (

        <LinearGradient
            colors={['rgba(57, 54, 54, 0.8)', 'rgba(166, 138, 103, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar/>
            <View style={styles.topBar}>
                <TouchableOpacity>
                    <FontAwesome name="chevron-left" size={24} color="#8F816F" />
                </TouchableOpacity>
                <Text style={{ color: "#8F816F", fontSize: 18, fontWeight: "bold" ,fontFamily:"Inter" }}>Add Task</Text>
                <View style={{ margin: 20 }}></View>
            </View>
                <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView scrollEnabled={!isDropdownOpen}>
                        <View>
                            <View>
                                <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 18, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter" }}>
                                    Title
                                </Text>
                                <TextInput
                                    placeholder='Write a title'
                                    style={styles.inputBox}
                                />
                            </View>
                            <View>
                                <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 18, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter"}}>
                                    Description
                                </Text>
                                <TextInput
                                    placeholder='Write a Description'
                                    style={styles.inputBox}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </View>
                            <View>
                                <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 18, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter"}}>
                                    Date
                                </Text>
                                <TouchableOpacity onPress={showDatepicker}>
                                    <View style={[{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, styles.inputBox]}>
                                        
                                            <FontAwesome
                                                name="calendar"
                                                size={18}
                                                color="#393636"
                                                style={{ marginHorizontal: 10 }}
                                            />
                                            <Text style={{ color: "#393636", fontSize: 15, padding: 5,fontWeight:"bold" ,fontFamily:"Inter"}}>{date.toLocaleDateString()}</Text>
                                        
                                    </View>
                                </TouchableOpacity>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={mode === 'date' ? date : (mode === 'time' && StartOrEnd[0]=== "Starttime" ?  Starttime : Endtime)}
                                        mode={mode}
                                        is24Hour={false}
                                        display="default"
                                        onChange={mode === 'date' ? onChange : (mode === 'time' && StartOrEnd[0]=== "Starttime" ? onChangeStartTime : onChangeEndTime)}
                                    />
                                )}
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <View style={{alignItems:"center"}}>
                                    <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 18, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter"}}>
                                        Start Time
                                    </Text>
                                    <TouchableOpacity onPress={showStartTimepicker}>
                                        <View style={[{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, styles.inputBox]}>
                                            <FontAwesome
                                                name="clock-o"
                                                size={18}
                                                color="#393636"
                                                style={{ marginHorizontal: 10 }}
                                            />
                                            <Text style={{ color: "#393636", fontSize: 15, padding: 5,fontWeight:"bold",fontFamily:"Inter" }}>{Starttime.toLocaleTimeString()}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems:"center"}}>
                                    <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 18, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter"}}>
                                        End Time
                                    </Text>
                                    <TouchableOpacity onPress={showEndTimepicker}>
                                        <View style={[{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, styles.inputBox]}>
                                            <FontAwesome
                                                name="clock-o"
                                                size={18}
                                                color="#393636"
                                                style={{ marginHorizontal: 10 }}
                                            />
                                            <Text style={{ color: "#393636", fontSize: 15, padding: 5,fontWeight:"bold" ,fontFamily:"Inter"}}>{Endtime.toLocaleTimeString()}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 18, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter" }}>
                                    Select Category
                                </Text>
                                    <SelectList 
                                        onOpen={() => setIsDropdownOpen(true)}
                                        onClose={() => setIsDropdownOpen(false)}
                                        placeholder='Select Category'
                                        fontFamily ="Inter"
                                        color ="#B6A896"
                                        boxStyles={styles.inputBox}
                                        dropdownStyles ={styles.inputBox}
                                        setSelected={setSelected} 
                                        data={data} 
                                        save="value"
                                    />
                            </View>
                            <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 18, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter" }}>
                                    Remind me before
                            </Text >

                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                                <View>
                                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                        <View style={{alignItems:"center"}}>
                                            <Text style={{ marginHorizontal: 10, marginTop: 10, fontSize: 11, color: "#393636", fontWeight: "bold" ,fontFamily:"Inter"}}>
                                                days
                                            </Text>
                                            
                                                <View style={[{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, styles.inputBox]}>
                                                    <TextInput
                                                            editable={onORoff}
                                                            placeholder='00'
                                                            style={{alignSelf:"center",padding:2,fontSize:18}}
                                                            onChangeText={DaysHandler}
                                                            keyboardType='numeric'
                                                            maxLength={3}
                                                            value={days}
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
                                                    
                                                            editable={onORoff}
                                                            value={hours}
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
                                                        editable={onORoff}
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
                                                        value={Minutes}
                                                    />
                                                </View>
                                        </View>
                                    </View>
                                </View>  
                                <View>
                                    <ToggleSwitch
                                        isOn={onORoff}
                                        onColor="green"
                                        offColor="#393636"
                                        label="Set"
                                        labelStyle={{ color: "black", fontWeight: "900" ,fontFamily:"Inter",fontSize:16}}
                                        size="medium"
                                        onToggle={toggleSwitchHandler}
                                        />
                                </View>  
                            </View> 


                            <TouchableOpacity
                                onPress={saveHandler}
                            >
                                <LinearGradient
                                    colors={['rgba(180,183,33,1)', 'rgba(180,183,33,0.481)', 'rgba(210,211,151,0.30)']}
                                    start={{x: 1, y: 1}}
                                    end={{x: 0, y: 0}} 
                                    style={{width:"30%",alignSelf:"center",borderRadius:15,marginBottom:"20%",marginTop:5}} 
                                >
                                <Text style={{color:"#393636",fontFamily:"Inter",fontSize:25,fontWeight:"700",alignSelf:'center',padding:8}}>Save</Text>
                                </LinearGradient>  
                            </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
       
    </LinearGradient>
    )
};

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: "#B6A896",
        padding: 8,
        margin: 10,
        borderRadius: 10,
        fontSize: 15,
    },
    topBar: {
        backgroundColor: "rgb(57, 54, 54)",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 70,
        padding: 20,
        width: "100%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    }
})