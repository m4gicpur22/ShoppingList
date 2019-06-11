const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
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