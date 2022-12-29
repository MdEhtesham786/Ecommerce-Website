const express = require('express');
const router = express.Router();
const { homePage, loginPage, signUpPage, forgotPage, forgotPassword, createPasswordPage, productOverviewPage, categoryPage, adminDashboardPage, shoppingCartPage, verifyEmailPage, verifyNumberPage, verifyOtpPage, verifyOtp, pageNotFound } = require('../controllers/control.js');
//GET
router.get('/', homePage);
router.get('/login', loginPage);
router.get('/sign-up', signUpPage);
router.get('/verify-otp', verifyOtpPage);
router.get('/forgot', forgotPage);
router.get('/verify-email', verifyEmailPage);
router.get('/verify-number', verifyNumberPage);
router.get('/create-password', createPasswordPage);
router.get('/product-overview/:id', productOverviewPage);
router.get('/category', categoryPage);
router.get('/admin-dashboard', adminDashboardPage);
router.get('/shopping-cart', shoppingCartPage);
router.get('*', pageNotFound);
//POST
router.post('/forgot', forgotPassword);
router.post('/verify-otp', verifyOtp);
module.exports = router;
