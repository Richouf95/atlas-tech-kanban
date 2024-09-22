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
const projectRoutes = require('./routes/projectRoutes');

// Express app instance
const app = express();

// Middlewares
app.use(cors({
    origin: "https://atlas-tech-kanban.vercel.app",
    optionsSuccessStatus: 200
}));

app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/board', boardRoutes);
app.use('/column', columnRoutes);
app.use('/card', cardRoutes);
app.use('/label', labelRoutes);
app.use('/project', projectRoutes);

// MongoDB connection & server launch
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`App connected to DB`);
        // app.listen(process.env.PORT, () => {
        //     console.log(`And runing on port ${process.env.PORT}`)
        // })
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    })

module.exports = app;