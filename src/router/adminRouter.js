const express = require('express');
const { viewAdminIndex, getAllUsers, getFormUpdateRoleUser, updateRoleUser, getFormCreateProduct, createProduct, getAllProduct } = require('../controllers/adminController');

const upload = require('../controllers/middleware/uploadFile');
const adminRouter = express.Router();

// Middleware to set the user variable based on the session
adminRouter.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user; // Set 'user' to res.locals to make it available in templates
    }
    next();
});

adminRouter.get('/', viewAdminIndex);
adminRouter.get('/ulist', getAllUsers);
adminRouter.get('/updaterole/:id', getFormUpdateRoleUser);
adminRouter.post('/updaterole/:id', updateRoleUser);
adminRouter.post('/updaterole/:id', updateRoleUser);
adminRouter.get('/create', getFormCreateProduct);
adminRouter.post('/create', upload.single('image'), createProduct);
adminRouter.get('/plist', getAllProduct);

module.exports = adminRouter;
