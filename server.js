const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./configs/db_setup');

const app = express();
const port = require('./configs/keys').PORT.PORT;

//SERVE STATIC FILES and PARSE url&json MIDDLEWARES
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.json({ express: 'Hello From Express (Server)' });
});

app.get('/lists', (req, res) => {
  const sql = `
                SELECT * FROM lists
              `;
  const query = db.query(sql, (err, result)=>{
    if(err) throw err;
    res.json(result)
  })
});
app.get('/items', (req, res) => {
  const sql = `
                SELECT * FROM items
              `;
  const query = db.query(sql, (err, result)=>{
    if(err) throw err;
    res.json(result)
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
