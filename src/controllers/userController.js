const fs = require('fs');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const viewUserIndex = (req, res) => {
    res.render('user/index', { title: 'Trang người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
}

const signupForm = (req, res) => {
    res.render('user/signup', { title: 'Trang đăng ký người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
}

const loginForm = (req, res) => {
    res.render('user/login', { title: 'Trang đăng nhập người dùng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user });
}

const getAllProduct = async (req, res) => {
    const products = await Product.find({});
    res.render('user/listProduct', { title: 'Trang danh sách sản phẩm', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user, products });
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

const getProductDetail = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
        const title = product.title; // Lấy tiêu đề sản phẩm
        res.render('user/productDetail', {
            title: title, // Sử dụng tiêu đề sản phẩm làm tiêu đề của trang
            layout: 'layouts/userLayout',
            product: product,
            errors: null,
            user: req.session.user
        });
    } else {
        res.render('user/index', {
            title: '',
            layout: 'layouts/userLayout',
            data: null,
            errors: { message: 'Sản phẩm không tồn tại' },
            user: req.session.user,
            products: []
        });
    }
}

const viewOrder = async (req, res) => {
    const orders = await Order.find({});
    res.render('user/order', { title: 'Trang giỏ hàng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user, orders });
}

const createOrder = async (req, res) => {
    const { title, price, number, image } = req.body;
    const dataSubmit = {
        title: title,
        price: price,
        number: number,
        image: image
    }

    try {
        const order = await Order.create(dataSubmit);
        req.session.message = "add to cart successfully";

        const orders = await Order.find({});
        res.render('user/order', { title: 'Trang giỏ hàng', layout: 'layouts/userLayout', data: null, errors: null, user: req.session.user, orders });
    } catch (err) {
        let errors = {};
        if (err.name === 'ValidationError') {
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            res.render('user/productDetail', { errors, data: dataSubmit });
        }
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).send('Order not found');
        }

        req.session.message = 'Order deleted successfully';
        res.redirect('/user/order');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};



const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
}

module.exports = {
    viewUserIndex, signupForm, loginForm, signup, checkLogin, logout, getDetailUser, getFormUpdateUser, updateUser, getAllProduct, getProductDetail, createOrder, viewOrder, deleteOrder
}