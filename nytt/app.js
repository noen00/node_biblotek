const express = require('express');
const mysql = require('mysql');
const path = require('path');
const jwt = require('jsonwebtoken');

require('dotenv').config();
process.env.TOKEN_SECRET;

const app = express();
const PORT = process.env.PORT;
var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "password", 
    database: "utlån"
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function klick() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
      });
  };

async function login(){
    console.log("Logging in...");
  
    try {
        const [players] = await con.promise().query("SELECT * FROM brukere WHERE brukernavn = ?", ['test']);
        const token = jwt.sign(payload, secretKey, options);

        if(players.length === 0){
            console.log("Does not exist");
        } else {  
            
            console.log("This user exists"); 
            console.log(players[0].passord);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function generateAccessToken(username, password) {
  console.log(username, process.env.TOKEN_SECRET);
  return jwt.sign({ username: username, password: password }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

}









app.get('/brukere', (req, res) => {
  var brukernavn = req.headers['brukernavn'];
  var passord = req.headers['passord'];
  con.connect(function(err) {
    con.query("SELECT * FROM brukerer WHERE brukernan = ${brukernavn}", function(err, result, field){
      if(result.length === 0){
         console.log("no") 
      } else {  
        con.query("SELECT * FROM brukerer WHERE passord = ${passord}", function(err, result, field){
          if(result.length === 0){
              console.log("Does not exist");
          } else {  
            token = generateAccessToken(brukernavn, passord);
            res.json(token);     
          }
      });

      }
  })});

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