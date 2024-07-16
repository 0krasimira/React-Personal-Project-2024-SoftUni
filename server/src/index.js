const expressConfigurator = require("./config/expressConfigurator")
const express = require("express")
const mongoose = require("mongoose")
// const router = require('./controllers/paintingController')
const userRouter = require('./controllers/userController')
const cors = require('cors')

const bodyParser = require("body-parser")


const app = express()
expressConfigurator(app)
app.use(cors());

app.use(bodyParser.json({extended: true }))



// app.use(router)
app.use('/auth', userRouter)


mongoose.connect("mongodb://127.0.0.1:27017/reactProject").then(() => {console.log("DB connected succesfully.");
app.listen(3000, () => 
    console.log(`Server is listening on port ${3000}...`))
}).catch(err => console.log("Cannot connect to DB."))