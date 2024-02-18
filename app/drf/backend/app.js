require('dotenv').config();


const express =  require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const bcrypt = require("bcryptjs");

const mongoUrl = process.env.API_KEY;

mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((e)=>{
    console.log(e);
})

require("./schemas/UserDetails");
const User = mongoose.model("UserInfo");

app.get("/", (req,res)=>{
    res.send({status: "started"})
})

app.post('/register', async(req, res)=>{
    const {username, email, password} = req.body;
    const oldUser = await User.findOne({email:email});
    if(oldUser){
        return res.send({data: "User already exists"});
    }

    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        await User.create({
            username: username, 
            email: email,
            password: encryptedPassword,
        });
        res.send({status:"ok", data:"User Created"});
    } catch (error) {
        res.send({status:'error', data: error});
    }
})

app.listen(5001, ()=>{
    console.log('Server Started');
});