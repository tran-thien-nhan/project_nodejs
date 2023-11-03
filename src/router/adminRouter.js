const express = require('express');
const { viewAdminIndex } = require('../controllers/adminController');

const upload = require('../controllers/middleware/uploadFile');
const adminRouter = express.Router();
adminRouter.get('/', viewAdminIndex);
// productRouter.get('/create', getFormCreate);
// productRouter.post('/create', upload.single('image'), createProduct);
// productRouter.get('/delete/:id', deleteProduct);
// productRouter.get('/edit/:id', getFormEdit);
// productRouter.post('/edit/:id', upload.single('image'), editProduct);

module.exports = adminRouter;
