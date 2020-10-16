const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    console.log('req.body:', req.body);
    
    let task = req.body.task;

    let queryText = `INSERT INTO "todos" ("task") VALUES ('${task}');`;
    pool.query(queryText).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('ERROR in post router', error);
        res.sendStatus(500);
    });
});

module.exports = router;