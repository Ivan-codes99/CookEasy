/*
 * Backend Base URL: http://localhost:5000
 * Backend Register API Endpoint: http://localhost:5000/api/register
 * Backend Login API Endpoint: http://localhost:5000/api/login
 */

/* 
 * Backend register function expects req with name, email, password
*/

/* 
 * Backend login function expects req with email, password
*/
import 'dotenv/config';
import axios from "axios";
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}`, {
            name,
            email,
            password
        });

        return response.data;
    }  catch (error: any) {
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

export {register};


