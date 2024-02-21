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
    const oldUserEmail = await User.findOne({email:email});
    const oldUserUser= await User.findOne({username:username});
    if(oldUserUser || oldUserEmail){
        if (oldUserUser && oldUserEmail){
        return res.send({status:"user and email taken", data: "user and email taken"});
        }else if (oldUserUser && (!oldUserEmail)){
            return res.send({status:"user taken", data: "user taken"});
        }else if ((!oldUserUser) && oldUserEmail){
            return res.send({status:"email taken", data: "email taken"});
        }
    }
    

    // Proceed with user creation if username and email are unique
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({
            username, 
            email,
            password: encryptedPassword,
        });
        res.status(201).send({status: "ok", message: "User created successfully"});
    } catch (error) {
        res.status(500).send({status: "error", message: "An error occurred during user registration"});
    }
});


app.listen(5001, ()=>{
    console.log('Server Started');
});