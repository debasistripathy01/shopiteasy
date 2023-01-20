const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {USER} = require("../models/user.model");
const { Router } = require("express");
const userControll = Router();

userControll.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  await bcrypt.hash(password, 8, async (err, hash) => {
    if (err) {
      return res.status(511).send("password not hashed");
    }
    const user = await USER.create({ name, email, password: hash });
    return res.status(200).send({ mess: "Registred", user: user });
  });
});

userControll.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);
  const user = await USER.findOne({ email });
  if (!user) {
    return res.status(404).send("Invalid User");
  }
  const hashed_pass = user.password;

  await bcrypt.compare(password, hashed_pass, (err, result) => {
    if (err) {
      return res.status(511).send("bcryption failed");
    }
    if (result) {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.TOKEN_KEY
      );
      res.send({
        message: "login successful",
        token: token,
        email: email,
        name: user.name,
      });
    } else {
      res.send("Inavalid Password");
    }
  });
});


// userControll.post("/")


const loggedInUser =async(req, res)=>{

    try{

        let token = req.headers.authorization || "";
        // token = token.split(" ")[1];

        if(token){
            const tokenRes = jwt.verify(token, process.env.TOKEN_KEY);
            let userData = USER.findById(tokenRes._id);
            // userData = userData.json();
            delete userData.password;

            return res.send({data: userData, status:"User data Deleted"});

        }
        else{
            return res.status(404).send({message: "User is Not Logged in so Password deleted", status: "Error whole deleteing the passsword"});

        }
        // user add . Database = permanently. User if not logged in Uska  sab data delete denge hum
    }   // Jitne user create kar rahe hain utna data POST ho raha hey Mongo Atlas me. 512MB only. Agar user Logged in Nehi hey , DB se TOken user ka delete hoga
    catch(err){
        console.log(err);
        res.send({ status: 404, message: "USer not logged in Invalid Token"})
    }
}


module.exports = {userControll};