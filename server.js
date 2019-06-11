const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const path = require('path');
const items = require('./Routes/Api/items');
const config = require('config');

const app = express();

//Body Parser middleware
app.use(express.json());

//MongoDB conifguration
const DB = config.get('mongoURI');
//Ran to error: When IP whitelisting, use /0 after IP to enable configuraion on all ports
//connecting to mongoDB
mongoose
    .connect(DB, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

//routes init
app.use('/api/items', require('./Routes/Api/items'));
app.use('/api/users', require('./Routes/Api/Users'));
app.use('/api/auth', require('./Routes/Api/auth'));

//allowing us to deploy to production/heroku
if(process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
    });
}

//environment varaible for Heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))