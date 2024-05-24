const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3100;

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log("Database Connected");})
    .catch((err)=>{console.log("Error while connecting : ", err);})

app.use('/', require('./routes/authRoutes'));

// Server
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})