const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const Users = require('./mongodb');
const PORT = process.env.PORT || 3000;



const filePath = path.join(__dirname, 'public','style.css');
const filePath1 = path.join(__dirname, 'public', 'style1.css');
const scriptPath = path.join(__dirname, 'public', 'java.js');   
const scriptPath1= path.join(__dirname, 'public', 'script.js');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , 'public')));


//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'login.html'));
});

app.post('/signup', async (req, res)=> {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    const newUser = new Users(data);
    await newUser.save();
    res.redirect('/');
})

app.post('/login', async (req, res)=> {
    const check = await Users.findOne({email: req.body.email});
    try {
        if (check.password == req.body.password ) {
            console.log('Login Successful');
            res.redirect('/');
        }
        else{
            console.log('Wrong Password');
        }
    } catch (err) {
        console.log('User not found');
    }
})

app.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm; // Assuming the input field has a name attribute 'searchTerm'
    // Logic for search functionality
    res.send('Search results for: ' + searchTerm);
});

// Other routes for handling form submissions, user authentication, etc.

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
