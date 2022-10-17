const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
var session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const PORT= process.env.PORT || 3000
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const endpointRoutes = require('./routes/endpointRoutes');
const rememberMe = require('./middlewares/rememberMe');
/*const logMiddleware = require('./middlewares/logMiddleware');*/



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: 'secreto'}));
app.use(cookieParser());
app.use(rememberMe);
/*app.use(logMiddleware);*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//app.use(cookieParser());


app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/api', endpointRoutes);

//const rememberMe = require('./middlewares/rememberMe');




// configuarcion de public static
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('http://localhost:'+PORT));
