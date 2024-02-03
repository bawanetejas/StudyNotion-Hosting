
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payments")
const profileRoutes = require("./routes/Profile")
const courseRoutes = require("./routes/Course")

const database = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");

const cookieParser = require("cookie-parser");
const  cors= require("cors");

const fileUpload = require("express-fileupload");
// new way of import  dot env
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

database.dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser())

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

// flags

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// cloudinary connection

cloudinaryConnect();

//routes
app.use("/api/v1/auth" ,userRoutes);
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)


//default routes

app.get("/", (req,res)=>{
    return json({
        success:true,
        message:"hello welcome to the default route"
    })
})

// listen app

app.listen(PORT ,()=>{
    console.log(`App is running at ${PORT}`)
});