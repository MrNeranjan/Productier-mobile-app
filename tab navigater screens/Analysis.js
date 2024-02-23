import { View , Text, StatusBar, ScrollView, Dimensions, SafeAreaView,StyleSheet} from "react-native";
import {Header,SearchBox,AddTaskList,TaskComponent} from "../components/tabnavigatorComponents";
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../store/Store";

export default function Analysis(){

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

    // completed tasks
    const completedTasks = totalTasks.filter(task => task.isCompleted === true);


    return(
        
        <View>
            <LinearGradient
                colors={['rgba(57, 54, 54, 0.8)', 'rgba(166, 138, 103, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
            <StatusBar/>
            <Header
                headerName = "Analysis"
            />
            <SearchBox
                isVisibleADD = {false}
            />
            <AddTaskList
                name = "Today's Task Analysis"
                displayI={false}
            />
            <View style ={{alignSelf:"center",marginTop:20,marginBottom:20}}>
                <CircularProgress
                    value={totalTasks.length !== 0 ? (completedTasks.length/totalTasks.length)*100 : 0}
                    radius={Dimensions.get('window').width / 3.5}
                    duration={2000}
                    progressValueColor={'#2ecc71'}
                    maxValue={100}
                    valueSuffix={'%'}
                    title={'Success'}
                    titleColor={'white'}
                    titleStyle={{fontWeight: 'bold'}}
                    activeStrokeWidth={28}
                    inActiveStrokeWidth={20}
                    inActiveStrokeColor={'#BC3939'}
                />
            </View>
            <View style={{marginBottom:"200%"}}>
                <Text style ={[styles.text,{color:"rgba(57, 54, 54, 1)"}]}>Total tasks      : {totalTasks.length}</Text>
                <Text style ={[styles.text,{color:"#2ecc71"}]}>Completed      : {completedTasks.length}</Text>
                <Text style ={[styles.text,{color:"#BC3939"}]}>Uncompleted  : {totalTasks.length-completedTasks.length}</Text>

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
    }
})