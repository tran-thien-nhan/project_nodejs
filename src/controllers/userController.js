const fs = require('fs');
const User = require('../models/User');

const viewUserIndex = (req, res) => {
    res.render('user/index', { title: 'Trang người dùng', layout: 'layouts/userLayout' });
}

const signupForm = (req, res) => {
    res.render('user/signup', { title: 'Trang đăng ký người dùng', layout: 'layouts/userLayout' });
}

const logginForm = (req, res) => {
    res.render('user/loggin', { title: 'Trang đăng nhập người dùng', layout: 'layouts/userLayout' });
}

module.exports = {
    viewUserIndex, signupForm, logginForm
}