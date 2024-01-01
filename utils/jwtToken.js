const ErrorHandler = require("./errorHandler");
exports.sendToken = (model, expireTime) => {
    const token = model.generateToken(expireTime);
    return token;
    // res.status(statusCode).cookie('token', token, options).json({
    //     success: true,
    //     user,
    //     token
    // });
};
exports.sendCookie = (cookieName, token, expiryTime, res) => {
    const options = {
        expires: new Date(Date.now() + parseInt(expiryTime)),
        httpOnly: true,
    };
    return res.cookie(cookieName, token, options);
};
// exports.sendRes = (statusCode, renderPage, res, next) => {
//     if (renderPage) {
//         return res.status(statusCode).render(renderPage);
//     } else {
//         next(new ErrorHandler('RenderPage is not given'));
//     }
// };