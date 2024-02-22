require('dotenv').config();


const express =  require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoUrl = process.env.API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;  

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
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ status: "error", code: "USER_NOT_FOUND", message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ status: "error", code: "INVALID_CREDENTIALS", message: "Invalid credentials." });
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        return res.send({ status: "ok", data: token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send({ status: "error", message: "An internal server error occurred." });
    }
});



app.post("/userdata", async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).send({ status: "error", message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const useremail = decoded.email;

        User.findOne({ email: useremail })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ status: "error", message: "User not found" });
                }
                const userDetails = {
                    username: user.username,
                    email: user.email,
                };
                return res.send({ status: "ok", data: userDetails });
            });
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).send({ status: "error", message: "Invalid or expired token" });
    }
});



app.listen(5001, ()=>{
    console.log('Server Started');
});