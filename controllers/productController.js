const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const multer = require('multer');
const fs = require('fs');

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const { name, description, moreInfo } = req.body;
    const product = await productModel.find();
    if (product) {
        return res.status(200).json({
            success: true,
            nhBits: product.length
            ,
            product
        });
    } else {
        return res.status(404).json({

            success: false,
            product: 'product not found'
        });
    }
});

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    //Seller id
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./static/img/product-img/`);
        },
        filename: function (req, file, cb) {
            cb(null, `${req.user.id}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    };
    let upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter });
    let images = [];
    let newProduct = {};
    let moreInfo = {};
    upload.array('product_image', 5)(req, {}, async (err) => {
        if (err) {
            console.log('err aaya');
            console.log(err);
            throw err;
        } else {
            if (req.files.length == 0) {
                console.log('error');
                req.files.forEach((file) => {
                    fs.unlinkSync(`./static/img/product-img/${req.user.id}-${file.originalname}`);
                });
                console.log('files are removed');
                return next(new ErrorHandler('Image not found', 403));
            } else {
                req.files.forEach((file) => {
                    let obj = {
                        name: file.originalname,
                        url: `${req.user.id}-${file.originalname}`,
                        size: file.size,
                        mimetype: file.mimetype
                    };
                    images.push(obj);
                });
                const { product_name: name, product_price: price, product_description: description, product_category: category, product_stock: stock, about_product, specifications } = req.body;
                if (about_product) {
                    moreInfo.about_product = about_product;
                }
                if (specifications) {
                    moreInfo.specifications = specifications;
                }
                if (!name || !price || !description || !category || !stock || !images) {
                    req.files.forEach((file) => {
                        console.log(file.originalname);
                        fs.unlinkSync(`./static/img/product-img/${file.originalname}`);
                    });
                    console.log('files are removed');
                    return next(new ErrorHandler('Correctly fill the form'));
                } else {
                    newProduct = {
                        name,
                        price,
                        description,
                        category,
                        stock,
                        images,
                        productOwnerId: req.user._id
                    };
                    if (Object.keys(moreInfo).length > 0) {
                        newProduct.moreInfo = moreInfo;
                    }

                    const finalProduct = new productModel(newProduct);
                    console.log(finalProduct);
                    await finalProduct.save();
                    req.user.notifications.products++;
                    await req.user.save();
                    return res.status(200).redirect('/api/v1/seller/product/create-product');
                }
            }
        }
    });

});

exports.getProduct = catchAsyncErrors(async (req, res) => {
    console.log(req.body);
    console.log('req.params', req.params.id);
    console.log('req.query', req.query);
    // const product = productModel.findById()
    res.send('workiing');

});
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.params.id);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./static/img/product-img/`);
        },
        filename: function (req, file, cb) {
            cb(null, `${req.user.id}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    };
    let upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter });
    let images = [];
    let newProduct = {};
    let moreInfo = {};
    upload.array('product_image', 5)(req, {}, async (err) => {
        if (err) {
            console.log('err aaya');
            console.log(err);
            console.log('laude idr to aana bhi mt');
            throw err;
        } else {
            if (req.files.length == 0) {
                console.log('error');
                req.files.forEach((file) => {
                    fs.unlinkSync(`./static/img/product-img/${req.user.id}-${file.originalname}`);
                });
                console.log('files are removed');
                return next(new ErrorHandler('Image not found', 403));
            } else {
                req.files.forEach((file) => {
                    let obj = {
                        name: file.originalname,
                        url: `${req.user.id}-${file.originalname}`,
                        size: file.size,
                        mimetype: file.mimetype
                    };
                    images.push(obj);
                });
                const { product_name: name, product_price: price, product_description: description, product_category: category, product_stock: stock, about_product, specifications } = req.body;
                if (about_product) {
                    moreInfo.about_product = about_product;
                }
                if (specifications) {
                    moreInfo.specifications = specifications;
                }
                if (!name || !price || !description || !category || !stock || !images) {
                    req.files.forEach((file) => {
                        console.log(file.originalname);
                        fs.unlinkSync(`./static/img/product-img/${file.originalname}`);
                    });
                    console.log('files are removed');
                    return next(new ErrorHandler('Correctly fill the form'));
                } else {
                    newProduct = {
                        name,
                        price,
                        description,
                        category,
                        stock,
                        images,
                        productOwnerId: req.user._id
                    };
                    if (Object.keys(moreInfo).length > 0) {
                        newProduct.moreInfo = moreInfo;
                    }
                    await productModel.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true, runValidators: true }).then(finalProduct => {
                        console.log('Updated product', finalProduct);
                        return res.redirect('/api/v1/seller/manage-product');
                    }).catch(err => {
                        return next(new ErrorHandler(`No product with id ${err.value}`, 400));
                    });
                }
            }
        }
    });
});
exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    // console.log(req.body);
    console.log(req.params.id);
    const product = await productModel.findByIdAndDelete(req.params.id);
    console.log(product);
    res.redirect('/api/v1/seller/manage-product');

});