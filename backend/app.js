const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');

const MONGO_URL = process.env.MONGOURL;
const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use(categoriesRoutes);
app.use(notesRoutes);

app.use(cors());



// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use((error, req, res, next) => {
    console.log("Error");
    console.log(error); 
    const statusCode = 500;
    const message = error.message;
    // console.log("message is " + error.message);
    res.status(statusCode).json({message: message});

});


mongoose
.connect(
    MONGO_URL
)
.then(result => {
    app.listen(process.env.PORT || 8080);
})
.catch(err => {
    console.log(err);
});
