import axios from 'axios'
import { axiosInstance } from './axios'

const registerUser = async (value) => {
    try {
        const response = await axiosInstance.post("/api/user/register", value)
        return response.data
    } catch (error) {
        throw error
    }
}

const loginUser = async (values) => {
    try {
        const response = await axiosInstance.post("/api/user/login", values)
        return response.data
    } catch (error) {
        throw error
    }
}

const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/api/user/get-current-user")
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

const resetPassword = async (value) => {
    try {
        const response = await axiosInstance.post("/api/user/reset-password", value)
        return response.data
    } catch (error) {
        throw error        
    }
}

const validateOtp = async (value) => {
    try {
        const response = await axiosInstance.post("/api/user/validate-otp", value)
        return response.data
    } catch (error) {
        throw error        
    }
}

const newPassword = async (value) => {
    try {
        const response = await axiosInstance.post("/api/user/new-password", value)
        return response.data
    } catch (error) {
        throw error        
    }
}
export {
    registerUser,
    loginUser,
    getCurrentUser,
    resetPassword,
    validateOtp,
    newPassword
}