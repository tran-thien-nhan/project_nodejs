const express = require('express');
const { viewUserIndex, signupForm, loginForm, signup, checkLogin, logout } = require('../controllers/userController');

const upload = require('../controllers/middleware/uploadFile');
const userRouter = express.Router();

// Middleware to set the user variable based on the session
userRouter.use((req, res, next) => {
  if (req.session.user) {
      res.locals.user = req.session.user; // Set 'user' to res.locals to make it available in templates
  }
  next();
});

userRouter.get('/', viewUserIndex);
userRouter.get('/signup', signupForm);
userRouter.post('/signup', signup);
userRouter.get('/login', loginForm);
userRouter.post('/login', checkLogin);
userRouter.get('/logout', logout);

module.exports = userRouter;
