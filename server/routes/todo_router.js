const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR in GET router', error);
        res.sendStatus(500);
    });
});



router.post('/', (req, res) => {
    console.log('req.body:', req.body);
    
    let task = req.body.task;

    let queryText = `INSERT INTO "todos" ("task") VALUES ($1);`;
    pool.query(queryText, [task]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('ERROR in post router', error);
        res.sendStatus(500);
    });
});

module.exports = router;