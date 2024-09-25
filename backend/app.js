const express = require("express")
const cors = require('cors')
const app = express()

app.use(cors())

const dotenv = require("dotenv")
dotenv.config()

const userRouter = require("./routes/userRoute")
const movieRouter = require("./routes/movieRoute")
const theatreRouter = require("./routes/theatreRoutes")
const showsRouter = require("./routes/showRoutes")
const bookingRouter = require("./routes/bookingRoute")

// Add in middleware to handle request body as JSON
app.use(express.json())

// Registering my root level routes
app.use("/api/user", userRouter)
app.use("/api/movie", movieRouter)
app.use("/api/theatre", theatreRouter)
app.use("/api/shows", showsRouter)
app.use("/api/bookings", bookingRouter)

const { connectDB } = require("./config/db")
connectDB()

app.listen(process.env.PORT, () => {
    console.log("Backend application has been started!");
})