const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//ROUTES
let todoRouter = require('./routes/todo_router');
app.use('/tasks', todoRouter);

app.listen(port, () => {
    console.log('Up and running on port:', port);
});