const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./Routes/Api/items');

const app = express();

//Body Parser middleware
app.use(bodyParser.json());

//MongoDB conifguration
const DB = require('./config/keys.js').mongoURI;
//Ran to error: When IP whitelisting, use /0 after IP to enable configuraion on all ports
//connecting to mongoDB
mongoose
    .connect(DB, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

//routes init
app.use('/api/items', items);

//environment varaible for Heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))