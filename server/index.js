require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
// const lotesRouter = require('./routes/lotes');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-loto.iffyt.mongodb.net/mern-loto?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
// app.use('/api/lotes', lotesRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
