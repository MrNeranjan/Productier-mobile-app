import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet, StatusBar ,Image,Dimensions, TextInput, ScrollView,TouchableOpacity, Modal,Button,Alert} from "react-native";
import { useStore}  from "../store/Store.js";
import { FontAwesome } from '@expo/vector-icons';
import {useFonts} from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from 'expo-checkbox';
import { AppLoading } from "expo";
import { useNavigation } from '@react-navigation/native';

function CategoryButton({id,categoryName}){
    const navigation = useNavigation();
    // delete or rename the category
    const [renameModalVisible, setRenameModalVisible] = useState(false);
    const [newName, setNewName] = useState('');

    

    // importing categarylist from store
    const CategoryList=  useStore(state=>state.CategoryList)

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });

    function handleLongPress() {
        Alert.alert(
            "Category Options",
            "Would you like to delete or rename this category?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        useStore.setState((state) => {
                            const newCategoryList = state.CategoryList.filter(category => category.id !== id);
                            return { ...state, CategoryList: newCategoryList };
                        });
                    }
                },
                {
                    text: "Rename",
                    onPress: () => {
                        setRenameModalVisible(true);
                    }
                }
            ]
        );
    }

    function handleRename() {

         // Check if a category with the entered name already exists
        const categoryExists = CategoryList.some(category => category.name.toLowerCase() === newName.toLowerCase());
        
        if (categoryExists) {
            alert('A category with this name already exists. Please enter a different name.');
            return;
        }
        useStore.setState((state) => {
            const newCategoryList = state.CategoryList.map(category => 
                category.id === id ? { ...category, name: newName } : category
            );
            return { ...state, CategoryList: newCategoryList };
        });
        setNewName('');
        setRenameModalVisible(false);
    }

    // routing to the Task List page
    function handlePress() {
        // Find the category in the CategoryList
        const category = CategoryList.find(cat => cat.id === id);

        // Navigate to the TaskList page with the category object
        navigation.navigate("TaskList", { category: category });
    }



    return(
        <View>
       
            <TouchableOpacity
                    onLongPress={handleLongPress}
                    onPress={handlePress}
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

            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={renameModalVisible}
                    onRequestClose={() => {
                        setRenameModalVisible(!renameModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Enter the new name for this category:</Text>
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={setNewName}
                                value={newName}
                            />
                            <View style={{flexDirection:"row"}}>
                                <Button
                                    title="Rename"
                                    onPress={handleRename}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Button
                                        title="Cancel"
                                        color="red"
                                        onPress={() => setRenameModalVisible(false)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
        </View>

        
    )
}

// search box with categories 
function SearchBox({isVisibleADD= true}){
    // create a new category
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    // searching box handling 
    const [searchText, setSearchText] = useState("");
    

    // importing categarylist from store
    const CategoryList=  useStore(state=>state.CategoryList)

    // create the category 
    function CreateCategory({props}){
        return(
            <CategoryButton 
                key={props.id}
                id = {props.id}
                categoryName={props.name} />
        )
    }



    function SearchTextHandler(text){
            setSearchText(text);
        };
    
    // Filter CategoryList based on searchText
    const filteredCategoryList = CategoryList.filter(category => 
        category.name.toLowerCase().includes(searchText.toLowerCase())
    );


    function handleCreateButtonPress() {

        if (inputText.trim() === '') {
            alert('Please enter a category name');
            return;
        }
        
        // Check if a category with the entered name already exists
        const categoryExists = CategoryList.some(category => category.name.toLowerCase() === inputText.toLowerCase());

        if (categoryExists) {
            alert('A category with this name already exists. Please enter a different name.');
            return;
        }

        useStore.setState((state) => {
            const newCategory = {
                id: state.CategoryList.length + 1, // Generate a new id
                name: inputText,
                items: []
            };
    
            return {
                ...state,
                CategoryList: [...state.CategoryList, newCategory]
            };
        });
        
        setInputText('');
        setModalVisible(false);
    }

    function openModal() {
        setModalVisible(true);
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
                
                {/* MAPPING THE CATEGORY LIST */}
                {filteredCategoryList.map(item => CreateCategory({props: item}))}

                {isVisibleADD ? <TouchableOpacity
                   onPress={openModal}
                 >
                    <LinearGradient
                        colors={['rgba(180,183,33,1)', 'rgba(180,183,33,0.481)', 'rgba(210,211,151,0.30)']}
                        start={{x: 1, y: 1}}
                        end={{x: 0, y: 0}} 
                        style={[styles.categoryButton,{width:50}]} 
                    >
                        <FontAwesome name= "plus" size={28} alignSelf ="center" color="rgba(57, 54, 54, 1)"/>
                    </LinearGradient>  
                </TouchableOpacity>:null}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Enter the name of the new Category</Text>
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={setInputText}
                                value={inputText}
                            />
                            <View style={{flexDirection:"row"}}>
                                <Button
                                    title="Create"
                                    onPress={handleCreateButtonPress}
                                />
                            <View style={{ marginLeft: 10 }}>
                                <Button
                                    title="Cancel"
                                    color="red"
                                    onPress={() => setModalVisible(false)}
                                />
                            </View>
                            </View>
                        </View>
                    </View>
                </Modal>


            </ScrollView>
        </View>
    )
};

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



// add task button
function AddTaskList({name,displayI}){

    const navigation = useNavigation();
    
    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });


    function AddTaskHandler(){
        navigation.navigate("AddTask");
    }


    if (!fontsLoaded) {
        return AppLoading;
    }    
    
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

        </View>
    )
}




function Header({headerName}){

    // get the image from the store
    const personalDetails = useStore((state) => state.PersonalDetails);
    const image = personalDetails.image;

    const dayList = getDaysArray();

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });

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
                        source={image ? { uri: image } : require("../assets/sources/loginpages/profilePic.png")}
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
function TaskComponent({taskName,taskTime, Description,taskCategory,DATE,isDisplayDate,isDisplayCategory,isDisplayDes}){

    const categaryList = useStore(state=>state.CategoryList);
     
    const [isChecked, setChecked] = useState(false);

    const [fontsLoaded] = useFonts({
        "Inter": require("../assets/sources/fonts/Inter-VariableFont_slnt,wght.ttf")
    });
    if (!fontsLoaded) {
        return AppLoading;
    }  



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
            <TouchableOpacity>
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
                        {isDisplayCategory ?<Text style ={{fontFamily:"Inter",fontSize:12}}>
                                            {taskCategory}
                                            </Text>:null}
                        {isDisplayDate ?<Text style ={{fontFamily:"Inter",fontSize:12}}>
                                            {DATE}
                                        </Text>:null}
                        {isDisplayDes ?<Text style ={{fontFamily:"Inter",fontSize:12}}>
                                        
                                            Description  :{Description}
                                        </Text>:null}
                    </View>
                </LinearGradient> 
            </TouchableOpacity>              
        </View>
    )
}




export {Header,SearchBox,AddTaskList,TaskComponent};


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
        },
        
        // ccs for the modal
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center",
            fontFamily: "Inter",
        },
        modalInput: {
            height: 40,
            width: Dimensions.get("window").width/2,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        }
        

    }
)