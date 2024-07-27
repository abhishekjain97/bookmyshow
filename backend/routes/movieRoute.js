const express = require("express")
const Movies = require("../model/movieModel")
const movieRouter = express.Router()
const authMiddlewares = require("../middlewares/authMiddlewares")


movieRouter.post("/add-movie", authMiddlewares, async (req, res) => {
    try {
        const movie = new Movies(req.body)

        await movie.save()

        res.send({
            status: true,
            message: "Movie added is successfull",
            movie
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
    
})

movieRouter.get("/get-all-movies", authMiddlewares, async (req, res) => {
    try {
        const movies = await Movies.find()

        return res.send({
            status: true,
            message: "Movies fetched!",
            movies
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Somethis went wrong! Try again"
        })
    }
})

movieRouter.put("/update-movie", authMiddlewares, async (req, res) => {
    
    try {
        const movies = await Movies.findOneAndUpdate({ _id: req.body.movieId }, req.body)
        return res.send({
            status: true,
            message: "Movies updated successfully!",
            movies
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Somethis went wrong! Try again",
        })
    }
})

movieRouter.post("/delete-movie", authMiddlewares, async (req, res) => {
    try {
        const movie = await Movies.findByIdAndDelete({ _id: req.body.movieId})
        res.send({
            status: true,
            message: "Movie deleted successfull",
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
    
})

movieRouter.get('/movie/:id', authMiddlewares, async (req, res) => {
    try{
        const movie = await Movies.findById({_id: req.params.id });
        res.send({
            status: true,
            message: "Movie fetched successfully!",
            data: movie
        })

    }catch(err){
        res.send({
            status: false,
            message: err.message
        })
    }
});



module.exports = movieRouter