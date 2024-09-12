const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('./jobs/cronJobs')

// Express app instance
const app = express();

// Middlewares
app.use(cors({
    origin: process.env.DEV_DOMAINE,
    optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/user', userRoutes);

// MongoDB connection & server launch
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App connected to DB`)
            console.log(`And runing on port ${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.error(err);
    })