const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');

app.use(express.urlencoded({
    extended: true
}));

app.use(cors('Access-Control-Allow-Origin', '*'));

connection_uri = "mongodb+srv://quasarbytes:wHKYdAj2Z9Y5GQFf@cluster0.apczzwy.mongodb.net/dev";

mongoose.Promise = global.Promise;
system_db = mongoose.connect(connection_uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
}, function(err){
    if (err) throw err;
    console.log('Connected to MongoDB');
});


const QuasarContact = require('./api/routes/QuasarContact')


app.use('/connect',QuasarContact)


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