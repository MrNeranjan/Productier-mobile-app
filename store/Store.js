import {create} from "zustand";
import {persist,createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const  useStore= create(
        
        persist((set,get)=>({

            
        }),
        {
            name: "Note Keeper data",
            storage: createJSONStorage(()=>AsyncStorage)
        }
        )
)