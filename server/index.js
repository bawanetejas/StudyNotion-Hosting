
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
        origin:'*', 
        credentials:true,           
        optionSuccessStatus:200
    })
)

// const allowCors = fn => async (req, res) => {
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     if (req.method === 'OPTIONS') {
//       res.status(200).end()
//       return
//     }
//     return await fn(req, res)
//   }
  
//   const handler = (req, res) => {
//     const d = new Date()
//     res.end(d.toString())
//   }

  // allowCors(handler)
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
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    return res.json({
        success:true,
        message:"hello welcome to the default route"
    })
})

// listen app

app.listen(PORT ,()=>{
    console.log(`App is running at ${PORT}`)
});