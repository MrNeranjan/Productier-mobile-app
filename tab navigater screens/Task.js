import { View , Text, StatusBar, ScrollView, Dimensions, SafeAreaView,StyleSheet} from "react-native";
import {Header,SearchBox,TaskList,TaskComponent} from "../components/tabnavigatorComponents"
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../store/Store";

export default function Task(){


    // demonstration of the task components
    const taskList =[
        
        {id:1,taskName :" have a company meeting ",taskTime :"10.00 am - 11.00 am",taskCategory:"Company task"},
        {id:2,taskName :" have a company meeting ",taskTime :"10.00 am - 11.00 am",taskCategory:"Company task"},
        {id:3,taskName :" have a company meeting ",taskTime :"10.00 am - 11.00 am",taskCategory:"Company task"},
        {id:4,taskName :" have a company meeting ",taskTime :"10.00 am - 11.00 am",taskCategory:"Company task"},
        {id:5,taskName :" have a company meeting ",taskTime :"10.00 am - 11.00 am",taskCategory:"Company task"},
        {id:6,taskName :" have a company meeting ",taskTime :"10.00 am - 11.00 am",taskCategory:"Company task"},
        {id:7,taskName :" have a company meeting ",taskTime :"10.00 am - 11.00 am",taskCategory:"Company task"},
        {id:8,taskName :" have a company meeting ",taskTime :"10.00 am - 11.00 am",taskCategory:"Company task"},
    ]


    // Task list mapping 

    function TaskCreator(props){

        return(
            <TaskComponent
                 taskName = {props.taskName}
                 taskTime={props.taskTime}
                 taskCategory={props.taskCategory}
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
            <TaskList
                name = "Today's Task"
                displayI={true}
            /> 
            <ScrollView>
                {taskList.map(TaskCreator)}
                <View style ={{marginBottom:"200%"}} ></View>
            </ScrollView>
            </LinearGradient>
        </View>
    )
};

const styles =StyleSheet.create({

})