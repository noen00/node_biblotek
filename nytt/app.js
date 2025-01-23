const express = require('express');
const mysql = require('mysql');
const path = require('path');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

require('dotenv').config();
process.env.TOKEN_SECRET;
var logedin=false
const app = express();
const PORT = process.env.PORT;
var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "password", 
    database: "utlån"
});
con.connect()


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function klick() {
  //con.query("INSERT INTO lån (brukeren, bok1, bok2, bok3) VALUES (?, ?, ?, ?)", ['a', 'b', 'c', 'd']);
  
};   

async function login(){

}


function generateAccessToken(username, password) {

  console.log(username, process.env.TOKEN_SECRET);

  return jwt.sign({ username: username, password: password }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

}

app.get('/api/klick', (req, res) => {
  const token = req.headers.authorization
  console.log('Token:', token)

  try {
    const decodedToken = jwt.decode(token, { complete: false });
    const brukernavn = decodedToken.username;

    const query = 'SELECT id FROM brukere WHERE brukernavn = '+`'${brukernavn}'`;
    con.query(query, (err, results, fields) => {
      if (err) {
        throw err;
      }
      data = JSON.parse(JSON.stringify(results));
      data = data[0];
      id = data.id;
      console.log("id:", id)
      var boknvan = req.headers['boknav'];
      console.log(boknvan)
      con.query("UPDATE lån SET "+boknvan+" ='1' WHERE id ="+id);
  });


  } catch (error) {
    console.log('error:', error)
  }
  
  
  
})

app.post('/brukere', (req, res) => {
  brukernavn = req.body['brukernavn'];
  var passord = req.body['passord'];
  const query = 'SELECT * FROM brukere WHERE brukernavn = ? AND passord = ?';
  logedin==true
    
  con.query(query, [brukernavn, passord], (err, result) => {
      if (err) {
          console.error('Error:', err);
          res.status(500).send('Database error');
      } else if (result.length > 0) {
        token = generateAccessToken(brukernavn, passord);
        res.json(token);
      } else {
          res.status(404).send('User not found');
      }
  });



})

app.post('/api/klick', async (req, res) => {

  klick();
});

app.post('/api/log', async (req, res) => {

  login();

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
