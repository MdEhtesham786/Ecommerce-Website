require('dotenv').config();
const hostname = '127.0.0.1';
const port = 5000 || process.env.PORT;
const cookieParser = require('cookie-parser');
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();
//IMPORTS
const router = require('./routes/routes');
const connectDB = require('./db/connect.js');
app.set('views', 'views');
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout.ejs');
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.use(cookieParser());
mongoose.set('strictQuery', true);
app.use('/', router);
const start = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`This server is running on port http://${hostname}:${port}`);
        });
    } catch (err) {
        console.log(err);

    }
};
start();
