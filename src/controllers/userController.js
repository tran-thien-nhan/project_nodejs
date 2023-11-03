const fs = require('fs');
const User = require('../models/User');

const viewUserIndex = (req, res) => {
    res.render('user/index', { title: 'Trang người dùng' });
}

module.exports = {
    viewUserIndex
}