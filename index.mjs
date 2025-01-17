// dist/src/index.js
const { app } = require('./dist/src/index');
app.listen(3000);
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.json());

function klick(bok) {
    console.log("test");
    var sql = `CREATE TABLE ${bok} (name VARCHAR(255), address VARCHAR(255))`;
    con.query(sql, function (err, result) {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log(`Table ${bok} created`);
    });
}

// Add your routes here
app.post('/', (req, res) => {
    const { bookName } = req.body;
    let bok = bookName;
    klick(bok);
    res.send(`Table ${bok} created`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Export app as module
module.exports = { app };

