const express = require('express')
const path = require('path');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express()
import test from './import.mjs'
app.use(bodyParser.json())
if (test=true){
  klick()
}
var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "password", 
  database: "utlån"
});

function klick() {
  console.log("test")
  var sql = `CREATE TABLE test (name VARCHAR(255), address VARCHAR(255))`
  con.query(sql, function (err, result) {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log(`Table ${name} created`);
  });
}

app.post('/create-table', (req, res) => {
  let { bookName } = req.body;
  let bok = req.body.booknavn;
  console.log(`Creating table ${bok}`);
  
  klick(bok);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});
