const express = require('express')
const app = express()

app.use(express.json())
app.set("view engine","ejs")
app.use(express.urlencoded({extended: true}))

// Global contacts array with dummy data
const contacts = [
    {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, I'd like to get in touch"
    },
    {
        name: "Jane Smith",
        email: "jane@example.com", 
        message: "Please contact me about your services"
    },
    {
        name: "Bob Wilson",
        email: "bob@example.com",
        message: "I have some questions about your products"
    }
];

app.get('/contact', (req, res) => {
    // Get all contacts and render form.ejs
    res.render('form', {
        contacts: contacts
    });
})

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    // Validate request body
    if (!name || !email || !message) {
        return res.status(400).send('Name, email and message are required');
    }
    
    // Add the new contact to the contacts array
    contacts.push({ name, email, message });
    
    // Redirect back to the contacts page
    res.redirect('/contact');
});

app.listen(4040, () => {
    console.log('Server running on port 4040')
})