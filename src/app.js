const express = require('express');
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const rootRouter = require('./router/rootRouter');
const { default: mongoose } = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/userdb')
    .then(() => console.log("connect success"))
    .catch(error => console.log("error:", error));

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public")); //để đọc đường dẫn hình ảnh
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

//cai dat session
app.use(session({
    secret: 'abc123', //ma de doc session tu client
    resave: false,
    saveUninitialized: false
}))

//xu ly middleware
app.use((req, res, next) => {
    res.locals.errorMessage = req.session.errorMessage;
    res.locals.message = req.session.message;
    delete req.session.message;
    delete req.session.errorMessage;
    next();
})

app.use(rootRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}/user`);
})