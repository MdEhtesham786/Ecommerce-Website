require('dotenv').config();
const userModel = require('./models/userModel.js');
const hostname = '127.0.0.1';
const port = 5000 || process.env.PORT;
const cookieParser = require('cookie-parser');
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();
const app = express();
const errorMiddleware = require('./middleware/error.js');
const catchAsyncErrors = require('./middleware/catchAsyncErrors');
const connectDB = require('./db/connect.js');

app.set('views', 'views');
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout.ejs');
app.use('/static', express.static('static'));
app.use('/api/v1/static', express.static('static'));
app.use('/api/v1/seller/static', express.static('static'));
app.use('/api/static', express.static('static'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(expressEjsLayouts);
mongoose.set('strictQuery', true);
mongoose.set('strictPopulate', false);

const router = require('./routes/routes');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoutes');
const { isAuthenticatedUser } = require('./middleware/auth.js');
const jwt = require('jsonwebtoken');
const productModel = require('./models/productModel.js');

app.use('/api/v1', router);
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use(errorMiddleware);

app.post('/api/v1/makeSeller/', catchAsyncErrors(async (req, res, next) => {
    // code removed for brevity
}));

app.get('/', isAuthenticatedUser, catchAsyncErrors(async (req, res) => {
    if (req.token) {
        return res.render('home', { token: req.token });
    } else {
        return res.render('home', { token: '' });
    }
}));

app.get('/users', catchAsyncErrors(async (req, res, next) => {
    const allUsers = await userModel.find();
    res.json({ nhbits: allUsers.length, allUsers });
}));

app.post('/api/v1/', async (req, res) => {
    const users = await userModel.find();
    res.status(200).json({
        nhBits: users.length,
        users
    });
});

app.get('/deleteUser/:id', catchAsyncErrors(async (req, res, next) => {
    if (req.params.id) {
        const User = await userModel.findByIdAndDelete({ _id: req.params.id });
        console.log('Deleted');
        res.json({ message: 'This user is deleted', User });
    } else {
        res.send('send userId of the user you want to delete in params');
    }
}));

const start = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        const server = app.listen(port, () => {
            console.log(`This server is running on port http://${hostname}:${port}`);
        });
        process.on("unhandledRejection", err => {
            console.log(`Error: ${err.message}`);
            console.log('Shutting down the server due to Unhandled Promise Rejection');
            server.close(() => {
                process.exit(1);
            });
        });
    } catch (err) {
        console.log(err);
    }
};
start();
