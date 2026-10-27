import { create } from "zustand";
import API from "../api/axios";

const useAuthStore = create((set) => ({
    user: null,

    token: localStorage.getItem(
        "token"
    ) || null,
    loading: false,
    profile: null,

    // register
    register: async (formData) => {
        try {
            set({
                loading: true,
            });

            const response = await API.post("/auth/register",formData);
            const {
                token,
                user,
            } = response.data;

            localStorage.setItem(
                "token",
                token
            );
            set({
                token,
                user,
                loading: false,
            });
            return {
                success: true,
            };
        }catch (error) {
            set({
                loading: false,
            });
            console.log(error.response?.data
            );

            return {
                success: false,
                message: error.response?.data?.message || "Registration Failed",
            };
        }
    },

    login: async (formData) => {
        try {
            set({
                loading: true,
            });
            const response = await API.post(
                "/auth/login",formData
            );
            const { token, user,} = response.data;
            
            localStorage.setItem(
                "token",
                token
            );

            set({
                token,
                user,
                loading: false,
            });

            return {
                success: true,
            };
        } catch(error) {
            set({
                loading: false,
            });
            return {
                success: false,
                message: error.response
                ?.data
                ?.message || 
                "Login failed",
            };
        }
    },

    // load current user

    loadUser: async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            const response = await API.get("/auth/me");

            set({
                user: response.data.user,
                token,
            });
        }  catch (error) {
            localStorage.removeItem("token");

             set({
            user: null,
            token: null,
        });
        };
    },

    
    // get profile

    getProfile: async () => {
        try {
            const response = await API.get("/auth/profile");

            set({
                profile: response.data.profile,
            });

            return {
                sucess: true,
            };
        }  catch (error) {
            return {
                success: false,

                message: error.response
                ?.data
                ?.message || "Failed to load frofile",
            };
        }
    },

    // logout 
    logout: () => {
        localStorage.removeItem(
            "token"
        );

        set({
            user: null,
            token: null,
        });
    },

}));

export default useAuthStore;