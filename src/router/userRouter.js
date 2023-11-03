const express = require('express');
const { viewUserIndex, signupForm, logginForm } = require('../controllers/userController');

const upload = require('../controllers/middleware/uploadFile');
const userRouter = express.Router();

// Thiết lập layout cho tất cả các route trong userRouter
userRouter.use((req, res, next) => {
  res.locals.layout = 'userLayout'; // Thay 'your-layout-file' bằng tên tệp layout của bạn
  next();
});

userRouter.get('/', viewUserIndex);
userRouter.get('/signup', signupForm);
userRouter.get('/loggin', logginForm);

module.exports = userRouter;
