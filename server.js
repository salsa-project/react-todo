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

app.get('/lists', (req, res) => {
  const sql = `
                SELECT * FROM lists
              `;
  const query = db.query(sql, (err, result)=>{
    if(err) throw err;
    res.json(result)
  })
});
app.get('/todos', (req, res) => {
  const sql = `
              SELECT todo.id, todo.body FROM todo
              `;
  const query = db.query(sql, (err, result)=>{
    if(err) throw err;
    setTimeout(()=>{
      res.json(result)
    }, 2500)
  })
});
app.get('/inprogress', (req, res) => {
  const sql = `
              SELECT * FROM inprogress
              `;
  const query = db.query(sql, (err, result)=>{
    if(err) throw err;
    setTimeout(()=>{
      res.json(result)
    }, 1500)
  })
});
app.get('/done', (req, res) => {
  const sql = `
              SELECT * FROM done
              `;
  const query = db.query(sql, (err, result)=>{
    if(err) throw err;
    setTimeout(()=>{
      res.json(result)
    }, 4000)
  })
});
app.post('/newTodo', (req, res)=>{
  const sql = `
                INSERT INTO todo(body) VALUES ('${req.body.body}')
              `;
  const query = db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    if(result.affectedRows){
      res.json({status: true, item_id: result.insertId})
    }else{
      res.json({status: false})
    }
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
