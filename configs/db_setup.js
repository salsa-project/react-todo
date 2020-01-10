const mysql = require('mysql');
const keys = require('./keys');

//CONNECT TO THE DATABASE
var db = mysql.createConnection({
  host     : keys.db.host,
  user     : keys.db.user,
  password : keys.db.password,
  database : keys.db.database
});

db.connect((err)=>{
  if(err) throw err;
  console.log("DATABASE testDB-> Connected...");
});

module.exports = db;
