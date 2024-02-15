import { View , Text, StatusBar, ScrollView, Dimensions, SafeAreaView,StyleSheet} from "react-native";
import {Header,SearchBox,TaskList,TaskComponent} from "../components/tabnavigatorComponents";
import CircularProgress from 'react-native-circular-progress-indicator';
import { LinearGradient } from "expo-linear-gradient";

export default function Analysis(){
    return(
        
        <View>
            <LinearGradient
                colors={['rgba(57, 54, 54, 0.8)', 'rgba(166, 138, 103, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
            <StatusBar/>
            <Header/>
            <SearchBox/>
            <TaskList
                name = "Today's Task Analysis"
                displayI={false}
            />
            <View style ={{alignSelf:"center",marginTop:20,marginBottom:20}}>
                <CircularProgress
                    value={70}
                    radius={Dimensions.get('window').width / 4}
                    duration={2000}
                    progressValueColor={'#2ecc71'}
                    maxValue={100}
                    valueSuffix={'%'}
                    title={'Success'}
                    titleColor={'white'}
                    titleStyle={{fontWeight: 'bold'}}
                    activeStrokeWidth={25}
                    inActiveStrokeColor={'#BC3939'}
                />
            </View>
            <View style={{marginBottom:"200%"}}>
                <Text style ={[styles.text,{color:"rgba(57, 54, 54, 1)"}]}>Total tasks      : {8}</Text>
                <Text style ={[styles.text,{color:"#2ecc71"}]}>Completed      : {2}</Text>
                <Text style ={[styles.text,{color:"#BC3939"}]}>Uncompleted  : {6}</Text>

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