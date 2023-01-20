const userRoutes = require("express").Router();



const bcrypt = require("bcrypt");
const _ = require("lodash")
const otp = require("otp-generator");

const {USER} = require("../models/user.model")


const { Otp } = require("../models/Otp.model");
const { router } = require("json-server");

userRoutes.post("/signup", async(req, res)=>{

    const userInfo = await USER.findOne({number: req.body.number});
    if(userInfo){
        res.status(400).send("User has already been registered");
    }
    const OTP_value = otp.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars:false
    })

    const number = req.body.number;

    const smsValue = new URLSearchParams();

    smsValue.append("token", "05fa33c4caewiufhow239829kjdnka")
    smsValue.append("to", `+${number}`);
    smsValue.append("message", `Verification code ${OTP_value}`);
    axios.post("http://api.greenweb.com.bd/api.php", smsValue).then((res)=>{
        console.log(res.data);
    })

    const otp = new Otp({number: number, otp: OTP_value})

    const anything = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, anything);

    const result = await otp.save();
    return res.status(200).send({status: "Success", otp: OTP_value});
});



userRoutes.post("/signup/verify", async(req, res)=>{
    const otpValue = await Otp.find({number: req.body.number})

    if(otpValue.length ===0){
        return res.status(404).send("Entered Wrong OTP")
    }
    const outputValue = otpValue[otpValue.length-1];
    const validUser = await bcrypt.compare(req.body.otpValue, outputValue.otp)


    if(outputValue.number === req.body.number && validUser){
        const user = new USER(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        const result = await user.save();

        const OTP_delete = await Otp.deleteMany({ number: outputValue.number});
        return res.status(200).send({
            message: "User Registration is Done",
            token: token,
            data: result
        })
    }
    else{
        return res.status(400).send("Your OTP is wrongs")
    }
    

})


module.exports ={ userRoutes}