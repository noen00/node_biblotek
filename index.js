const express = require('express')
const path = require('path');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(express.json()); 
app.use(bodyParser.json());

function klick() {
  console.log("clicked");
  
  con.connect(function(err) {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    
    var sql = "CREATE TABLE cuss (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log("Table created");
    });
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/create-table', (req, res) => {
  klick();
  res.send('Table creation initiated');
});

app.listen(port, () => {
  console.log('Server running on http://localhost:3000');
});
var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "password",
  database: "F21"
});
