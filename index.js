require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {USER} = require("./models/user.model");
const app = express();

// ROuter for User and PRoducts
const {userRoutes} = require("./router/user.router")
const {productRoutes} = require("./router/product.router")

const port = process.env.URL
const { connection }= require("./configs/db");
const { default: mongoose } = require("mongoose");
app.use(express.json());


app.use(
    cors({
      origin: "*",
      credentials: true,
      optionSuccessStatus: 200,
    })
  );

const {userControll} = require("./controllers/user.controll"); // Login , Signup including Schema
const {menControll} = require("./controllers/men.controll");
const {womenControll} = require("./controllers/women.controll");
const {Authentication} = require("./middlewares/auth.middleware");
const {cartControll} = require("./controllers/cart.controll");






app.use('/user',userControll)
app.use('/men',menControll)
app.use('/women',womenControll)
app.use('/cart',Authentication,cartControll);


app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);


// app.use("/admin", admin, adminControll); // Users get API endPoint 


app.get("/", (req, res) => {
    res.send("homepage");
  });



  // Register 



  

// Login

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log(`Connected to DB ${process.env.URL}`)

    }catch(err){
        console.log(err);
        console.log("Error while connecting to DB");
    }
})