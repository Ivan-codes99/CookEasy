import axios from "axios";
import Constants from 'expo-constants';

const BACKEND_BASE_URL = Constants.expoConfig?.extra?.backendBaseUrl || 'https://default-backend-url.com';

const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/register`, {
            name,
            email,
            password
        });

        return response.data;
    }  catch (error: any) {
        console.log(error)
        if (error.response) {
            //backend responded with error
            throw new Error(error.response.data.message || "Registration failed.");
        }
        else {
            //some other error
            throw new Error("Something is not working. Maybe try again later");
        }
    }
}

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/login`, {
            email,
            password
        });

        return response.data;
    } catch (error: any) {
        if (error.response) {
            //backend responded with error
            throw new Error(error.response.data.message || "Login failed.");
        }
        else {
            //some other error
            throw new Error("Something is not working. Maybe try again later");
        }
    }
}

export {register, login};