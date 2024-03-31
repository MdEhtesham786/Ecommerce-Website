const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();
//GET
exports.loginPage = catchAsyncErrors(
    async (req, res, next) => {
        const credentials = req.cookies.signUp;
        if (credentials) {
            const verify = jwt.verify(credentials, process.env.JWT_SECRET);
            if (req.token) {
                return res.redirect('/');
            } else {
                return res.render('form', { formType: 'login', message: '', signUpData: verify, layout: 'layouts/formLayout' });
            }
        } else {
            if (req.token) {
                return res.redirect('/');
            } else {
                return res.render('form', { formType: 'login', message: '', signUpData: '', layout: 'layouts/formLayout' });
            }
        }
    }
);

exports.signUpPage = catchAsyncErrors(async (req, res) => {
    if (req.token) {
        res.redirect('/');
    } else {
        res.render('form', { formType: 'signUp', message: '', layout: 'layouts/formLayout' });
    }
});
exports.recoveryEmailPage = catchAsyncErrors(async (req, res) => {
    res.render('form', { formType: 'recoveryEmail', message: '', layout: 'layouts/formLayout' });
});
exports.verifyOtpPage = catchAsyncErrors(async (req, res) => {

    res.render('form', { formType: 'verifyOtp', verificationType: '', phone_number: '', email: '', layout: 'layouts/formLayout' });

});
exports.forgotPage = catchAsyncErrors(async (req, res) => {

    res.render('form', { formType: 'forgot', layout: 'layouts/formLayout' });

});
exports.createPasswordPage = catchAsyncErrors(async (req, res) => {
    const authenticated = req.cookies.createPassword;
    if (authenticated) {
        res.render('form', { formType: 'createPassword', message: '', layout: 'layouts/formLayout' });
    } else {
        res.redirect('/api/v1/auth/forgot');
    }

});
exports.verifyEmailPage = catchAsyncErrors(async (req, res) => {

    res.render('form', { formType: 'verifyEmail', layout: 'layouts/formLayout' });

});
exports.verifyNumberPage = catchAsyncErrors(async (req, res) => {
    res.render('form', { formType: 'verifyNumber', layout: 'layouts/formLayout' });

});
exports.categoryPage = catchAsyncErrors(async (req, res) => {

    res.render('category', { layout: 'category' });

});
exports.productOverviewPage = catchAsyncErrors(async (req, res) => {
    // const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const product = await productModel.findById({ _id: req.params.id });
    let productID = product.id;
    console.log(product);
    let totalStar = product.reviews.length * 5;
    let receivedStar = 0;
    let starObj = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };
    let starArr = []; ``;

    product.reviews.forEach((review) => {
        receivedStar += review.rating;
        starObj[review.rating]++;
    });
    for (let star in starObj) {
        starArr.push(Math.round(starObj[star] / 12 * 100));
    }
    let totalRating = Math.round((receivedStar / totalStar) * 100);
    let averageRating = totalRating / 20;
    // console.log('total star', totalStar);
    // console.log('received star', receivedStar);
    // console.log('overAll Rating', totalRating, '%');
    // console.log('starArr', starArr);
    return res.render('productOverview', { layout: 'productOverview', product, productID, token: req.token, averageRating, starArr });
});
exports.shoppingCartPage = catchAsyncErrors(async (req, res) => {

    res.render('shoppingCart', { layout: 'shoppingCart' });

});
exports.adminDashboardPage = catchAsyncErrors(async (req, res) => {
    res.render('adminDashboard', { layout: 'adminDashboard' });
});
exports.sellerDashboardPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    const products = await productModel.find({ productOwnerId: verify.id });
    let deliveredItems = 0;
    products.forEach((product) => {
        deliveredItems += product.sold;
    });
    console.log('dashboard pe aaya');
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', deliveredItems, role: 'seller', user, products, content: 'dashboard' });
});
exports.sellerOrdersPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', role: 'seller', user, content: 'orders' });
});
exports.createProductPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', role: 'seller', product: '', user, content: 'createProduct' });
});
exports.updateProductPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    const product = await productModel.findById(req.params.id);
    console.log(product);
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', role: 'seller', user, product, content: 'updateProduct' });

});
exports.sellerProductManagePage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    user.notifications.products = 0;
    await user.save();
    const allProducts = await productModel.find({ productOwnerId: verify.id });
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', role: 'seller', user, allProducts, content: 'manageProduct' });
});
exports.sellerReviewPage = catchAsyncErrors(async (req, res, next) => {
    const verify = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await userModel.findById(verify.id);
    user.notifications.products = 0;
    await user.save();
    const products = await productModel.find({ productOwnerId: verify.id });
    let Data = [];

    products.forEach((product) => {
        product.reviews.forEach((review) => {
            const obj = {
                productName: product.name,
                name: review.name,
                rating: review.rating,
                comment: review.comment
            };
            Data.push(obj);
        });
    });
    res.render('dashboard', { layout: 'layouts/dashboardLayouts', Data, role: 'seller', user, content: 'productReviews' });
});
exports.shippingPage = catchAsyncErrors(async (req, res) => {

    if (req.token) {
        console.log(req.user);
        return res.render('shipping', { layout: 'shipping', products: req.params.id, user: req.user, page: 'shipping' });
    } else {
        return res.redirect('/api/v1/auth/login');
    }

});
exports.confirmOrderPage = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.orderDetails) {
        return res.redirect(`/api/v1/order/${req.params.id}/shipping`);
    }
    // const product = await productModel.find({ _id: req.params.id });
    const token = req.cookies.orderDetails;
    const productArray = req.params.id.split(',');
    let orderItems = [];

    // Map the productArray to an array of promises
    const promises = productArray.map(async (product) => {
        let data = await productModel.findById(product);
        let item = {
            name: data.name,
            price: data.price,
            image: data.images[0],
            id: data.id
        };
        orderItems.push(item);
    });

    // Wait for all promises to resolve
    Promise.all(promises)
        .then(() => {
            let totalPrice = 0;
            orderItems.forEach((item) => {
                totalPrice += item.price;
            });
            return res.render('confirmOrder', { layout: 'confirmOrder', productsId: req.params.id, products: orderItems, totalPrice, page: 'confirmOrder' });
        })
        .catch((error) => {
            console.error(error);
        });
});
exports.paymentPage = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.confirmOrder) {
        return res.redirect(`/api/v1/order/${req.params.id}/confirm-order`);
    }
    // const decodedData = jwt.verify(req.cookies.confirmOrder, process.env.JWT_SECRET);
    // res.json({ decodedData });
    console.log('YOOOOOOO');
    return res.render('payment', { layout: 'payment', products: req.params.id, user: req.user, page: 'payment' });
});
exports.paymentSuccessfulPage = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.confirmOrder) {
        return next(ErrorHandler('Cookie Expired!'));
    }
    const confirmOrder = jwt.verify(req.cookies.confirmOrder, process.env.JWT_SECRET);
    console.log(confirmOrder.totalPrice);
    console.log('Working');
    return res.render('paymentSuccessfulPage', { layout: 'paymentSuccessfulPage', totalPrice: confirmOrder.totalPrice, });
});
exports.orderpage = catchAsyncErrors(async (req, res, next) => {
    if (req.token) {
        return res.render('orderPage', { token: req.token, layout: 'orderPage' });

    } else {
        return res.redirect('/api/v1/auth/login');
    }
});
exports.pageNotFound = catchAsyncErrors(async (req, res) => {
    const token = req.cookies.orderDetails;
    const shippingInfo = jwt.verify(token, process.env.JWT_SECRET);
    res.render('pageNotFound', { layout: 'pageNotFound' });

});
//POST
// module.exports = { homePage, loginPage, signUpPage, forgotPage, forgotPassword, createPasswordPage, productOverviewPage, categoryPage, shoppingCartPage, adminDashboardPage, verifyEmailPage, verifyNumberPage, verifyOtpPage, verifyOtp, pageNotFound };