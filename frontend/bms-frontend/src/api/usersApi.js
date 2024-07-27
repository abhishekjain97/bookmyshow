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

export {
    registerUser,
    loginUser,
    getCurrentUser
}