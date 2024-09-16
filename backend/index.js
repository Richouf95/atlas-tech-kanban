const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
// require('./jobs/cronJobs')
const boardRoutes = require('./routes/boardRoutes');
const columnRoutes = require('./routes/columnRoutes');
const cardRoutes = require('./routes/cardRoutes');
const labelRoutes = require('./routes/labelRoutes');

// Express app instance
const app = express();

// Middlewares
app.use(cors({
    origin: process.env.DEV_DOMAINE,
    optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/user', userRoutes);
app.use('/board', boardRoutes);
app.use('/column', columnRoutes);
app.use('/card', cardRoutes);
app.use('/label', labelRoutes);

// MongoDB connection & server launch
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App connected to DB`)
            console.log(`And runing on port ${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    })