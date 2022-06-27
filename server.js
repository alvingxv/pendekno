const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const app = express();
const { publicrouter: public } = require('./routes/public');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path')


console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to mongodb');
    }).catch(err => {
        console.log(err);
    });
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, './views/'))
app.set('view engine', 'ejs');
app.use("/public", express.static('public'))
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(session({
    secret: 'something',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use('/', public)



app.listen(PORT, () => {
    console.log(`server is listening on ${PORT},
    http://localhost:${PORT}`);
});