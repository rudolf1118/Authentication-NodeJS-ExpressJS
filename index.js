const express = require ('express');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const authRouter = require('./authRouter');
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
const start = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_SRV);
        app.listen(PORT, ()=>console.log(`server started successfully on port ${PORT}`))
    }catch(e) {
        console.error(e);
    }
}
start();