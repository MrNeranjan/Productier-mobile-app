import React from 'react';
import {StyleSheet,View,Text, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Task from "../tab navigater screens/Task.js";
import Timer from "../tab navigater screens/Timer.js";
import Analysis from "../tab navigater screens/Analysis.js";
import Settings from "../tab navigater screens/Settings.js";
import Notifications from "../tab navigater screens/Notifications.js";


const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return (
        <Tab.Navigator
            initialRouteName="Task"
            screenOptions={{
                headerShown:false,
                tabBarHideOnKeyboard:true,
                tabBarShowLabel:false,
                tabBarStyle:styles.tabBarStyle,
                
                
            }}  
        >   
            <Tab.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="cog" 
                            size={23} 
                            color= {focused ? 'rgba(180,183,33,1)': "#141921"}
                            
                        />
                    )
                }}
                />
            <Tab.Screen 
                name="Timer" 
                component={Timer} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="clock-o" 
                            size={23} 
                            color= {focused ? 'rgba(180,183,33,1)': "#141921"}
                            
                        />
                    )
                }}
                />     
            <Tab.Screen 
                name="Task" 
                component={Task} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="home" 
                            size={23} 
                            color= {focused ? 'rgba(180,183,33,1)':"#141921"}
                        />
                    )
                }}
                />
            <Tab.Screen  
                name="Analysis" 
                component={Analysis} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="line-chart" 
                            size={23} 
                            color= {focused ? 'rgba(180,183,33,1)': "#141921"}
                        />
                    )
                }}
                />
            <Tab.Screen 
                name="Notifications" 
                component={Notifications} 
                options={{
                    tabBarIcon:({focused,size,color}) => (
                        <FontAwesome 
                            name="bell" 
                            size={23} 
                            color= {focused ? 'rgba(180,183,33,1)': "#141921"}
                        />
                    )
                }}
                 />

            
        </Tab.Navigator>
    )
};

const styles = StyleSheet.create({
    tabBarStyle :{
        position:'absolute',
        bottom:Dimensions.get("window").height/30,
        left:20,
        right:20,
        elevation:0,
        backgroundColor: "rgba(174, 174, 174, 0.3)", 
        opacity:0.6,
        borderRadius:30,
        height:60,
        borderTopColor:'transparent',
    
    
    },
    blurStyle:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:100,
    }
    
});