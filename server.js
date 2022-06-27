const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
const { publicrouter: public } = require('./routes/public');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to mongodb');
    }).catch(err => {
        console.log(err);
    });
const PORT = process.env.PORT || 3000;


app.use(cors());

app.use('/', public)



app.listen(PORT, () => {
    console.log(`server is listening on ${PORT},
    http://localhost:${PORT}`);
});