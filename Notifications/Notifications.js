import { useState, useEffect,useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useStore } from "../store/Store";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";



//  to show tha alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



// Fetch the motivation from the server
async function fetchMotivation(setMotivationList, MotivationList) {
  try {
    const lastFetchDate = await AsyncStorage.getItem('lastFetchDate');
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date

    if (lastFetchDate !== currentDate) {
      const state = await NetInfo.fetch();

      if (state.isConnected && state.isInternetReachable) {
        const response = await axios.get('http://192.168.8.178:3000/getMotivation', {
          params: {
            motiID: MotivationList[MotivationList.length - 1].motiID +1
          }
        });
        const motivation = response.data;
        if (motivation) { // Check if motivation is not null
          setMotivationList(motivation);
          await AsyncStorage.setItem('lastFetchDate', currentDate); // Store the current date
        }
      }
    }
  } catch (error) {
    // setMotivationList([]);
    console.error("Error fetching motivation", error);
  }
}



// Main notification function
export default function Notification() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const setMotivationList = useStore((state) => state.setMotivationList);
  const MotivationList = useStore((state) => state.MotivationList);
  const categoryList = useStore((state) => state.CategoryList);

  useEffect(() => {
    fetchMotivation(setMotivationList, MotivationList);

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    scheduleMotivationNotification(MotivationList);
    scheduleNotificationsForCategoryList(categoryList);

  }, [MotivationList,categoryList]); 
}


// Motivation notify function
export async function scheduleMotivationNotification(MotivationList) {

  await Notifications.cancelAllScheduledNotificationsAsync();

  const moti = MotivationList[MotivationList.length -1];
  console.log(moti.motiID)
  console.log(MotivationList);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Motivation 🌞",
      body: `"${moti.Body}"-${moti.Author}`,
      
    },
    trigger: { 
      hour: 5, 
      minute: 0, 
      repeats: true
     },
  });

}


// task reminder function
export async function scheduleTaskNotification(task) {
  if (task.isReminderOn) {
    const taskTime = new Date(task.startTime);
    const trigger = new Date(task.startTime);
    trigger.setSeconds(trigger.getSeconds() - task.reminderTime);

    const taskDate = new Date(task.date);
    const today = new Date();

    let dateString;
    if (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    ) {
      dateString = "today";
    } else {
      dateString = taskDate.toLocaleDateString();
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey! Reminder 🔔",
        body: `Get ready,you have ${task.title} ${dateString} at ${taskTime.toLocaleTimeString()}.`,
      },
      trigger,
    });
  }
}

// Function to schedule notifications for all tasks in a category list
export async function scheduleNotificationsForCategoryList(categoryList) {
  categoryList.forEach(category => {
    category.items.forEach(scheduleTaskNotification);
  });
}


// Function to get all scheduled notifications
export async function getAllScheduledNotifications() {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  console.log(notifications);
}
getAllScheduledNotifications();



//  cancel notification function
export async function cancelTaskNotification(notificationId) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}
