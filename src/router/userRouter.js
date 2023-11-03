const express = require('express');
const { viewUserIndex } = require('../controllers/userController');

const upload = require('../controllers/middleware/uploadFile');
const userRouter = express.Router();
userRouter.get('/', viewUserIndex);
// productRouter.get('/create', getFormCreate);
// productRouter.post('/create', upload.single('image'), createProduct);
// productRouter.get('/delete/:id', deleteProduct);
// productRouter.get('/edit/:id', getFormEdit);
// productRouter.post('/edit/:id', upload.single('image'), editProduct);

module.exports = userRouter;
