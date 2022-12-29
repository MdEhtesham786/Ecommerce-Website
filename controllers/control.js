//GET
const homePage = async (req, res) => {
    try {
        res.render('home');
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const loginPage = async (req, res) => {
    try {
        res.render('form', { formType: 'login', message: '', signUpData: '', layout: 'layouts/formLayout' });

    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const signUpPage = async (req, res) => {
    try {
        res.render('form', { formType: 'signUp', message: '', layout: 'layouts/formLayout' });

    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const verifyOtpPage = async (req, res) => {
    try {
        res.render('form', { formType: 'verifyOtp', verificationType: '', phone_number: '', email: '', layout: 'layouts/formLayout' });

    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const forgotPage = async (req, res) => {
    try {
        res.render('form', { formType: 'forgot', layout: 'layouts/formLayout', title: 'Rizwan' });

    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const createPasswordPage = async (req, res) => {
    try {
        res.render('form', { formType: 'createPassword', message: '', layout: 'layouts/formLayout' });
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const verifyEmailPage = async (req, res) => {
    try {
        res.render('form', { formType: 'verifyEmail', layout: 'layouts/formLayout' });
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const verifyNumberPage = async (req, res) => {
    try {
        res.render('form', { formType: 'verifyNumber', layout: 'layouts/formLayout' });
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const categoryPage = async (req, res) => {
    try {
        res.render('category', { layout: 'category' });
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const productOverviewPage = async (req, res) => {
    try {
        res.render('productOverview', { layout: 'productOverview' });
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const shoppingCartPage = async (req, res) => {
    try {
        res.render('shoppingCart', { layout: 'shoppingCart' });
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const adminDashboardPage = async (req, res) => {
    try {
        res.render('adminDashboard', { layout: 'adminDashboard' });
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const pageNotFound = async (req, res) => {
    try {
        res.render('pageNotFound', { layout: 'pageNotFound' });

    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
//POST
const forgotPassword = async (req, res) => {
    try {
        const { email, phone_number, resend } = req.body;
        if (phone_number) {
            let arr = [];
            let phone_numberArr = phone_number.split('');
            phone_numberArr.forEach((digit, i) => {
                if (i > 0 && i < phone_numberArr.length - 2) {
                    arr.push('*');
                } else {
                    arr.push(digit);

                }

            });
            let numberArr = arr.join('');
            return res.render('form', { layout: 'layouts/formLayout', formType: 'verifyOtp', verificationType: 'number', phone_number, numberArr, resend });
        } else if (email) {
            let email_name = email.split('@');
            let arr = [];
            email_name[0].split('').forEach((char, i) => {
                if (i > 1) {
                    arr.push('*');
                } else {
                    arr.push(char);
                }
            });
            arr.push(email_name[1]);
            let emailArr = arr.join('');
            return res.render('form', { layout: 'layouts/formLayout', formType: 'verifyOtp', verificationType: 'email', email, emailArr, resend });

        } else {
            return res.redirect('/forgot');
        }
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
const verifyOtp = async (req, res) => {
    try {
        const { first, second, third, fourth } = req.body;
        let verificationCode = first.concat(second).concat(third).concat(fourth);
        console.log(verificationCode);
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.send(err);

    }
};
module.exports = { homePage, loginPage, signUpPage, forgotPage, forgotPassword, createPasswordPage, productOverviewPage, categoryPage, shoppingCartPage, adminDashboardPage, verifyEmailPage, verifyNumberPage, verifyOtpPage, verifyOtp, pageNotFound };