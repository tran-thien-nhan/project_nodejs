const fs = require('fs');
const Admin = require('../models/Admin');

const viewAdminIndex = (req, res) => {
    res.render('admin/index', { title: 'Trang quản trị' });
}

module.exports = {
    viewAdminIndex
}