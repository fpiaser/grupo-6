const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const PORT= process.env.PORT || 3000
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const logMiddleware = require('./middlewares/logMiddleware');
const session = require('express-session');
app.use(session({secret: 'secreto'}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//app.use(cookieParser());

//app.use(session({
//    secret: 'secret',
//    //cookie: { maxAge: 60000 },
//}));


app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
//const rememberMe = require('./middlewares/rememberMe');
//const cookieParser = require('cookie-parser');

//app.use(rememberMe);

// configuarcion de public static
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('http://localhost:'+PORT));
