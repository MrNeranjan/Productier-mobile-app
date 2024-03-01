import React,{useEffect} from "react";
import {create} from "zustand";
import {persist,createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";   
import personalDetails from "../Deatails/personal";
import motivations from "../Deatails/motivations";




export const useStore = create(
    persist(
      (set, get) => ({
        CategoryList: [],

        PersonalDetails: personalDetails,
        setPersonalDetails: (details) => set((state) => ({ ...state, PersonalDetails: { ...state.PersonalDetails, ...details } })),

        MotivationList:motivations,
        setMotivationList: (item) => set((state) => ({ ...state, MotivationList: [...state.MotivationList, item] })),
        //setMotivationList: () => set((state) => ({ ...state, MotivationList: [] })),
      }),
      {
        name: "Note Keeper data",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );

