require('dotenv').config({ path: '../.env' }); //! in an actual build this should be .config()
import axios from "axios";

const BACKEND_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_BASE_URL;

const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/api/register`, {
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
        const response = await axios.post(`${BACKEND_BASE_URL}/api/login`, {
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