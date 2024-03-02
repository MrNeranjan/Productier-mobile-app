import React,{ useEffect } from "react";
import { View , Text, StatusBar, ScrollView, Dimensions, SafeAreaView,StyleSheet} from "react-native";
import {Header,SearchBox,AddTaskList,TaskComponent} from "../components/tabnavigatorComponents"
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../store/Store";



export default function Task(){

    const categaryList = useStore(state => state.CategoryList);

    //checking today's date
    const today = new Date().toDateString();
    const totalTasks = categaryList.reduce((tasks, category) => {
        const todayTasks = category.items.filter(item => {
            const taskDate = new Date(item.date).toDateString();
            return taskDate === today;
        });
        return tasks.concat(todayTasks);
    }, []);


    // Task list mapping 
    function TaskCreator(props){

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

        //time formatting
        const Stime = new Date(props.startTime);
        const Etime = new Date(props.endTime);
        const tasktime = formatTime(Stime) + " - " + formatTime(Etime);

        return(
            <TaskComponent
                 taskId = {props.taskId}
                 isCompleted={props.isCompleted}
                 taskName = {props.title}
                 taskCategory = {props.category}
                 taskTime = {tasktime}
                 isDisplayCategory = {true}
            />
        )
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
                headerName = "Task"
            />
            <SearchBox/>
            <AddTaskList
                name = "Today's Task"
                displayI={true}
                
            /> 
            <ScrollView>
                {totalTasks.map(TaskCreator)}
                <View style ={{marginBottom:"200%"}} ></View>
            </ScrollView>
            </LinearGradient>
        </View>
    )
};

