const express = require('express');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('view'));



// Sample product data (in a real app, this would come from a database)
const products = [
    { name: 'Product 1', price: 19.99 },
    { name: 'Product 2', price: 29.99 },
    { name: 'Product 3', price: 39.99 },
    { name: 'Product 4', price: 49.99 }
];

// Route for /products
app.get('/products', (req, res) => {
    res.render('products', { products: products });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
