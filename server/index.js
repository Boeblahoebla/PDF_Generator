// Imports
//////////

const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const dotenv = require('dotenv');
const PDFTemplate = require('./pdf-templates');

// Initialize app
/////////////////

dotenv.config();

const app = express();
const port = process.env.NODE_PORT;


// Middleware
/////////////

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Routes
/////////

// Create PDF document
app.post('/create-pdf', (req, res) => {
    pdf
        .create(PDFTemplate(req.body), {})
        .toFile('receipt.pdf', (err) => {
            if(err) {
                return console.log('error');
            }
        res.send(Promise.resolve())
    });
});

// Download PDF document
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/receipt.pdf`)
});


// Server run
/////////////

app.listen(port,
    () => console.log(`Server running on port ${port}`)
);