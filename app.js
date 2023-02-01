const express = require('express')
const bodyParser = require('body-parser')
const postRoutes = require('./routes/posts')
const adRoutes = require('./routes/ad')
const authroutes = require('./routes/auth')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')

const app = express()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('hi');
        
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        
        cb(null, new Date().toISOString().replace(/:/g, '-')+'-' + file.originalname.replace(' ','-'))
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

app.use(bodyParser.json())
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/auth',authroutes)
app.use('/post',postRoutes)
app.use(adRoutes)

app.use((error, req, res, next) => {
    console.log(error);

    const statusCode = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(statusCode).json({
        message: message,
        data : data
    })

})

mongoose.connect(
    'mongodb+srv://anirudh:vOeVRoy9QSM6iLjs@cluster0-qrafd.mongodb.net/test',
)
app.listen(8080);

// mongodb+srv://anirudh:<password>@cluster0.qrafd.mongodb.net/test