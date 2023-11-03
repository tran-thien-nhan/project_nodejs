const fs = require('fs');
const Admin = require('../models/Admin');

const viewAdminIndex = (req, res) => {
    res.render('admin/index', { title: 'Trang quản trị', layout: 'layouts/adminLayout' });
}

const signupForm = (req, res) => {
    res.render('admin/signup', { title: 'Trang đăng ký người dùng', layout: 'layouts/userLayout' });
}

module.exports = {
    viewAdminIndex, signupForm
}