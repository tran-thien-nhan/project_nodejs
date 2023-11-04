const fs = require('fs');
const User = require('../models/User');

const viewUserIndex = (req, res) => {
    res.render('user/index', { title: 'Trang người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
}

const signupForm = (req, res) => {
    res.render('user/signup', { title: 'Trang đăng ký người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
}

const loginForm = (req, res) => {
    res.render('user/login', { title: 'Trang đăng nhập người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
}

const checkLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        // Set the user data in the session
        req.session.user = user;

        if (user.role === "admin") {
            return res.redirect('/admin'); // Redirect to the admin page
        } else {
            return res.redirect('/user'); // Redirect to the user page
        }
    } else {
        return res.render('login', { error: 'fail', data: { email, password } });
    }
};


const signup = async (req, res) => {
    const data = req.body;
    await User.create(data)
        .then(result => {
            req.session.message = "user signed up successfully";
            res.redirect("/user");
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                let errors = {};
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.render('create', { errors, data });
            }
        })
}

const getDetailUser = (req, res) => {
    //dựa vào session để in thông tin ra
    res.render('user/detail', { title: 'thông tin người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
}

const getFormUpdateUser = async (req, res) => {
    const { id } = req.params;
    await User.findById(id)
        .then(result => {
            res.render('user/update', { title: 'Trang cập nhật thông tin người dùng', layout: 'layouts/userLayout', data: result, errors: null, user: req.session.user });
        })
        .catch(err => {
            res.render('user/detail', { title: 'thông tin người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
        })
}

const updateUser = async (req, res) => {
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
        req.session.user = user;

        req.session.message = "User updated successfully";
        res.redirect("/user/detail");
    } catch (err) {
        if (err.name === 'ValidationError') {
            let errors = {};
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            res.render('user/update', { errors, data: req.body });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
}


const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
}

module.exports = {
    viewUserIndex, signupForm, loginForm, signup, checkLogin, logout, getDetailUser, getFormUpdateUser, updateUser
}