import React,{useEffect} from "react";
import {create} from "zustand";
import {persist,createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";   
import personalDetails from "../Deatails/personal";
import {motivations,motiTime} from "../Deatails/motivations";





export const useStore = create(
    persist(
      (set, get) => ({
        CategoryList: [],

        PersonalDetails: personalDetails,
        setPersonalDetails: (details) => set((state) => ({ ...state, PersonalDetails: { ...state.PersonalDetails, ...details } })),

        MotivationList:motivations,
        setMotivationList: (item) => set((state) => {
              // Add the new item to the list
              const newMotivationList = [...state.MotivationList, item];
      
              // If the list has more than 30 items, remove the first 30
              if (newMotivationList.length > 30) {
                newMotivationList.splice(0, 30);
              }
      
              return { ...state, MotivationList: newMotivationList };
            }),
        //setMotivationList: () => set((state) => ({ ...state, MotivationList: [] })),

        DailyMotivation : true,
        setDailyMotivation: (item) => set((state) => ({ ...state, DailyMotivation: item })),

        MotiTime : motiTime,
        setMotiTime: (item) => set((state) => ({ ...state, MotiTime: item })),
      }),
      {
        name: "Note Keeper data",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );

