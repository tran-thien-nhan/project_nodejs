const fs = require('fs');
const Admin = require('../models/Admin');
const User = require('../models/User');

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
            return res.render('admin/listUser', { title: 'Trang danh sách người dùng', layout: 'layouts/adminLayout', data: null, errors: null, user: req.session.user, users }); // Điều chỉnh đường dẫn template ở đây
        } else {
            return res.redirect('/user/index');
        }
    } else {
        return res.redirect('/user/login');
    }
}

const getFormUpdateRoleUser = async (req, res) => {
    const { id } = req.params;
    await User.findById(id)
        .then(result => {
            res.render('admin/updaterole', { title: 'Trang cập nhật thông tin người dùng', layout: 'layouts/adminLayout', data: result, errors: null, user: req.session.user });
        })
        .catch(err => {
            res.render('admin', { title: 'Trang quản trị', layout: 'layouts/adminLayout', data: null, errors: null, user: req.session.user });
        })
}

const updateRoleUser = async (req, res) => {
    const { id, name, email, password, phone, address, gender, role } = req.body;

    // Find the user by id and update their information
    try {
        const user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password,
            phone,
            address,
            gender,
            role
        }, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update the user data in the session
        req.session.message = "User updated successfully";
        res.redirect("/admin/ulist");
    } catch (err) {
        if (err.name === 'ValidationError') {
            let errors = {};
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            res.render('admin/updaterole', { errors, data: req.body });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = {
    viewAdminIndex, signupForm, getAllUsers, getFormUpdateRoleUser, updateRoleUser
}