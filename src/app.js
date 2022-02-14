import express from "express"
import mongoose from "mongoose"
import routes from "./routes"
import 'dotenv/config'
import cors from "cors"
import morgan from "morgan"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger.json"

const app = express()

const port = process.env.PORT || 3000
const mode = process.env.NODE_ENV || 'development'
const server = async () => {
    try {
        if (mode === "development") {
            await mongoose.connect(process.env.DEVELOPMENT_DB, { useNewUrlParser: true })
            .then(() => {
                console.log("DEV DB CONNECTED")
            })
        } else if (mode === "test") {
            await mongoose.connect(process.env.TEST_DB, { useNewUrlParser: true })
            .then(() => {
                console.log("TEST DB CONNECTED")
            })
        } else if (mode === "production") {
            await mongoose.connect(process.env.PRODUCTION_DB, { useNewUrlParser: true })
            .then(() => {
                console.log("PROD DB CONNECTED")
            })
        }
        app.use(express.json())
        app.use("/api/v1/", routes)
        app.get("/", (req, res) => {
            res.send("Welcome to my API")
        })
        app.use(morgan("dev"))
        app.use(cors())
        app.use("/api-documents", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
        app.use("*", (req, res) => {
            res.status(404).send({
                message: "Not found"
            })
        })
        app.listen(port, () => {
            console.log(`The server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
server()

export default app
