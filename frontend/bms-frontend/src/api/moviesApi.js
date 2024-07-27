import { axiosInstance } from './axios'

const addMovie = async (value) => {
    try {
        const response = await axiosInstance.post("/api/movie/add-movie", value)
        return response.data
    } catch (error) {
        throw error
    }
}

const deleteMovie = async (value) => {
    try {
        const response = await axiosInstance.post("/api/movie/delete-movie", value)
        return response.data
    } catch (error) {
        throw error
    }
}

const updateMovie = async (values) => {
    try {
        const response = await axiosInstance.put("/api/movie/update-movie", values)
        return response.data
    } catch (error) {
        throw error
    }
}

const getAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/api/movie/get-all-movies")
        return response.data
    } catch (error) {
        throw error
    }
}

const getMovieById = async (id) => {
    try{
        console.log(id);
        const response = await axiosInstance.get(`/api/movie/movie/${id}`)
        console.log(response);
        return response.data;
    }catch(err){
        return err.response
    }
}


export {
    addMovie,
    updateMovie,
    getAllMovies,
    deleteMovie,
    getMovieById
}