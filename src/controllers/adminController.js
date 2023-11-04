const fs = require('fs');
const Admin = require('../models/Admin');

const viewAdminIndex = (req, res) => {
    res.render('admin/index', { title: 'Trang quản trị', layout: 'layouts/adminLayout', data: null, errors: null, user: req.session.user });
}

const signupForm = (req, res) => {
    res.render('admin/signup', { title: 'Trang đăng ký người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
}

const getAllUsers = async (req, res) => {
    const users = await User.find({}).exec();
    if (req.session.user) {
        if (req.session.user.role == "admin") {
            return res.render('list', { users });
        } else {
            return res.redirect('/user/detail');
        }
    } else {
        return res.redirect('/user/login');
    }
}

module.exports = {
    viewAdminIndex, signupForm, getAllUsers
}