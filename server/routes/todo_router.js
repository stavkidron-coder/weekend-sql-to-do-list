const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos" ORDER BY "id";`;
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

router.delete('/:idParam', (req, res) => {
    console.log('Helo from DELETE', req.params.idParam);
    let deleteId = req.params.idParam
    let queryText = `DELETE FROM "todos" WHERE "id" = $1`

    pool.query(queryText, [deleteId]).then((result) => {
        console.log('Successfully Deleted!', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE router:', error);
        res.sendStatus(500);
    });
});

router.put('/completed/:id', (req, res) => {
    console.log('hello from PUT', req.body.idParam);
    let completedId = req.params.id;
    let completedYet = req.body.completedStatus;

    let queryText = `UPDATE "todos" SET "completed_status" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [completedYet, completedId]).then((result) => {
        console.log('Successfully Completed!', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in PUT router:', error);
        res.sendStatus(500);
    });
});

module.exports = router;