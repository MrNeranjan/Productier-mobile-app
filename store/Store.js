import React,{useEffect} from "react";
import {create} from "zustand";
import {persist,createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";   
import personalDetails from "../Deatails/personal";



export const useStore = create(
    persist(
      (set, get) => ({
        CategoryList: [],
        PersonalDetails: personalDetails,
        setPersonalDetails: (details) => set((state) => ({ ...state, PersonalDetails: { ...state.PersonalDetails, ...details } })),
      }),
      {
        name: "Note Keeper data",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );