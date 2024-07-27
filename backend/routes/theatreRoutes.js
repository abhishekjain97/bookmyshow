const express = require("express")
const Theatre = require("../model/theatreModel")
const theatreRouter = express.Router()
const authMiddlewares = require("../middlewares/authMiddlewares")


theatreRouter.post("/add-theatre", authMiddlewares, async (req, res) => {
    try {
        const data = new Theatre(req.body)

        await data.save()

        res.send({
            status: true,
            message: "Theatre added is successfull",
            data
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
    
})

theatreRouter.get("/get-all-theatres", authMiddlewares, async (req, res) => {
    try {
        const data = await Theatre.find()
        return res.send({
            status: true,
            message: "Theatre fetched!",
            data
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Somethis went wrong! Try again"
        })
    }
})

// Getting all theatres for a particular user ID as owner
theatreRouter.get("/get-all-theatres-by-owner/:ownerID", authMiddlewares, async (req, res) => {
    try {
        const allTheatresByOwner = await Theatre.find({
            owner: req.params.ownerID
        })

        // console.log(allTheatresByOwner)

        res.send({
            status: true,
            message: "Theatres by owners fetched!",
            allTheatresByOwner
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Internal Server Error!",
        })
    }
})


theatreRouter.put("/update-theatre", authMiddlewares, async (req, res) => {
    try {
        const data = await Theatre.findOneAndUpdate({ _id: req.body.theatreId }, req.body)
        return res.send({
            status: true,
            message: "Theatre updated successfully!",
            data
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Somethis went wrong! Try again",
        })
    }
})

theatreRouter.post("/delete-theatre", authMiddlewares, async (req, res) => {
    try {
        const data = await Theatre.findByIdAndDelete({ _id: req.body.theatreId})
        res.send({
            status: true,
            message: "Theatre deleted successfull",
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
    
})


module.exports = theatreRouter