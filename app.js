let express = require('express');
let app = express();
const http = require('http').Server(app);
let router  = express.Router();
let path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
 * Host the static page.
 */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/addemail', (req, res) => {
    data = req.body;

    // Send the post
    axios({
        method: 'post',
        url: process.env.MAILCHIMP_API_URL,
        auth: {
            username: 'x', // username doesn't matter w/ M.C api
            password: process.env.MAILCHIMP_API_KEY,
        },
        data: {
            'email_address': data.email,
            'status': 'subscribed'
        }
    })
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        // TODO: Let them download anyway??
        console.log('Error: ' + error.response.data);
        res.sendStatus(200);
    })
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on port');
});
