const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(port, () => {
    console.log('Up and running on port:', port);
});