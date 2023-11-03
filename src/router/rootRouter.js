const express = require('express');
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');
// const productRouter = require('./productRouter');
const rootRouter = express.Router();
rootRouter.use('/user', userRouter);
rootRouter.use('/admin', adminRouter);
// rootRouter.use('/product', productRouter);
module.exports = rootRouter;