const express = require('express');
const multer = require('multer');
const upload = multer();
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, uploadImages } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
//Get
router.post('/get-all-products', isAuthenticatedUser, authorizeRoles('admin', 'seller', 'user'), getAllProducts);
//Post
router.route('/product/:id').get(isAuthenticatedUser, authorizeRoles('admin', 'seller', 'user'), getProduct).post(isAuthenticatedUser, authorizeRoles('admin', 'seller', 'user'), getProduct);

router.post('/seller/product/create-product', isAuthenticatedUser, authorizeRoles('admin', 'seller'), createProduct);
router.post('/seller/product/update-product/:id', isAuthenticatedUser, authorizeRoles('admin', 'seller'), updateProduct);
router.post('/seller/product/delete-product/:id', isAuthenticatedUser, authorizeRoles('admin', 'seller'), deleteProduct);


module.exports = router;