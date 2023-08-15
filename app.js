const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const api_key = 'a21dd80e5b4ec185623d937ec4810b73-ee16bf1a-aac15c29'; 
const domain = 'sandbox5dc40f5ca9d14196b470eb867ce9f7b6.mailgun.org'; 
const mailgunInstance = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const mailData = {
        from: 'Gurwinder <dhaliwalpvt@gmail.com>',
        to: email,
        subject: 'HELLOOOOOOO!!!, WHATSS UP',
        text: 'Testing 1 2 3',
    };

    mailgunInstance.messages().send(mailData, function (error, body) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error");
        } else {
            console.log(body);
            res.sendFile(__dirname + '/index.html');
        }
    });
});


app.listen(8000, () => {
    console.log("The Server is running");
});