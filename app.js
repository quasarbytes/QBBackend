const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors('Access-Control-Allow-Origin', '*'));

connection_uri = "mongodb://localhost:27017/";
mongoose.Promise = global.Promise;
system_db = mongoose.connect(connection_uri.concat("quasarBytes"),{ useFindAndModify: false }, {
    native_parser : true
}, function(err){
    if (err) throw err;
});
mongoose.set('useUnifiedTopology', true);


const QuasarContact = require('./api/routes/QuasarContact')


app.use('/connect',QuasarContact)


app.use(express.static(__dirname + '/assets/'));
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
            responseCode: 404,
            responseMessage: error.message
        
    })
})

module.exports = app;