const fs = require('fs');
// const Admin = require('../models/Admin');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

const viewAdminIndex = (req, res) => {
    res.render('admin/index', { title: 'Trang quản trị', layout: 'layouts/adminLayout', data: null, errors: null, user: req.session.user });
}

const getAllProduct = async (req, res) => {
    const products = await Product.find({});
    res.render('admin/listProduct', { title: 'Trang danh sách sản phẩm', layout: 'layouts/adminLayout', data: null, errors: null, user: req.session.user, products });
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

const getFormCreateProduct = (req, res) => {
    res.render('admin/create', { title: 'Trang thêm sản phẩm', layout: 'layouts/adminLayout', data: null, errors: null, user: req.session.user });
}

const createProduct = async (req, res) => {
    let { title, price, quantity, des, category } = req.body;
    let imageUrl = req.file ? `/upload/${req.file.filename}` : '';
    const dataSubmit = {
        title: title,
        price: price,
        quantity: quantity,
        des: des,
        category: category,
        image: imageUrl
    }
    await Product.create(dataSubmit)
        .then(result => {
            req.session.message = "Product create successfully";
            res.redirect('/admin/plist');
        })
        .catch(err => {
            let errors = {};
            if (err.title === 'ValidationError') {
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.render('/admin/create', { errors, data: dataSubmit });
            }
        })
}

const getFormUpdateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        console.log(product);
        res.render('admin/productUpdate', {
            title: 'Trang update sản phẩm',
            layout: 'layouts/adminLayout',
            errors: null,
            data: product,
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        res.render('admin', {
            title: 'Trang quản trị',
            layout: 'layouts/adminLayout',
            data: null,
            errors: null,
            user: req.session.user
        });
    }
}

const updateProduct = async (req, res) => {
    let { id, title, price, des, category, quantity, current_image } = req.body;
    let imageUrl;
    if (req.file) {
        imageUrl = `/upload/${req.file.filename}`;
    } else {
        imageUrl = current_image;
    }
    const dataSubmit = {
        id: id,
        title: title,
        price: price,
        des: des,
        category: category,
        quantity: quantity,
        image: imageUrl
    }
    const opts = { runValidators: true };
    await Product.updateOne({}, dataSubmit, opts)
        .then(result => {
            req.session.message = "Product updated successfully";
            console.log(result);
            res.redirect("/admin/plist");
        })
        .catch(err => {
            let errors = {};
            if (err.name === 'ValidationError') {
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.render('admin/productUpdate', { errors, data: dataSubmit });
            }
        })
}

const getAllOrder = async (req, res) => {
    const orders = await Order.find({});
    res.render('admin/listOrder', { title: 'Trang danh sách đơn hàng', layout: 'layouts/adminLayout', data: null, errors: null, user: req.session.user, orders });
}

module.exports = {
    viewAdminIndex, signupForm, getAllUsers, getFormUpdateRoleUser, updateRoleUser, getFormCreateProduct, createProduct, getAllProduct, getAllOrder, getFormUpdateProduct, updateProduct
}