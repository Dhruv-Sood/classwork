const express = require('express');
const app = express();


app.set('view engine', 'ejs');


const users = {
    john: { age: 30, hobby: 'Cycling' },
    jane: { age: 25, hobby: 'Reading' },
    bob: { age: 35, hobby: 'Hiking' }
};

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    const user = users[username];
    if (user) {

        res.render('profile', { username, user });
    } else {

        res.status(404).send('User not found');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});