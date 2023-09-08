import { create } from "zustand";
import { persist } from "zustand/middleware"

const initialState = {
    email: "",
    name: "",
    token: ""
}

export const useUserInfo = create(persist(
    (set) => ({
        user: initialState,
        login: (infoLogin) => {
          set({user: infoLogin})
        },
        logout: () => {
          set({user: initialState})
          localStorage.removeItem("userInfo")
        }
    }), 
    {
        name: "userInfo"
    }
))