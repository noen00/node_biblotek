const express = require('express');
const mysql = require('mysql');
const path = require('path');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

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
var brukernavn
con.connect()


app.use(express.static(path.join(__dirname, 'public')));

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
    var noe=boknvan
    console.log(boknvan)
    con.query("UPDATE lån SET "+noe+" ='1' WHERE id ="+id);
    console.log("o8asugdsk")
  });

  
  
  
})

app.get('/brukere', (req, res) => {
  brukernavn = req.headers['brukernavn'];
  var passord = req.headers['passord'];
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
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QiLCJpYXQiOjE3Mzc2MjUzMzksImV4cCI6MTczNzYyNzEzOX0.z3QmqVhBmuREdL_sghqRRCLrM6GDQyF0KTSPNq_UBBw
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QiLCJpYXQiOjE3Mzc2MjUzNjYsImV4cCI6MTczNzYyNzE2Nn0.GU2DUE3UY5_eP-zabGs_4uMTgv9Pucx1jtqWF1hxHIc