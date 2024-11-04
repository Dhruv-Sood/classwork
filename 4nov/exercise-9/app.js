const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let imageCounter = 1

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function(req, file, cb) {
        cb(null, imageCounter++ + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const fs = require('fs')
if (!fs.existsSync('uploads')){
    fs.mkdirSync('uploads')
}

app.use('/uploads', express.static('uploads'))

const products = []

app.get('/upload', (req, res) => {
    res.render('add-product')
})

app.get('/getAllProduct', (req, res) => {
    res.render('products', { products: products })
})

app.post('/upload', upload.single('image'), (req, res) => {
    const { name, description } = req.body
    const imagePath = req.file ? `/uploads/${req.file.filename}` : ''

    if (!name || !description) {
        return res.status(400).send('Name and description are required')
    }

    products.push({
        name,
        description,
        image: imagePath
    })

    res.redirect('/getAllProduct')
})

app.listen(3030)