let express = require('express')
let app = express()
let mysql = require('mysql')
let bodyParser = require('body-parser')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '01041992',
    database: 'tescase'
})

db.connect(() => {
    console.log('Connect To Mysql')
})
app.get('/', (req, res) => {
    res.send('<h1>Welcome To React Quiz API</h1>')
})

app.get('/crud', (req, res) => {
    let sql = "select * from question"
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
app.post('/crud', (req, res) => {
    let data = {
        question: req.body.question,
        answer: req.body.answer
    }
    let sql = "insert into question set ?"
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})

app.get('/crud/:id', (req, res) => {
  
    let sql = `select * from question where id = '${req.params.id} '`
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
app.put('/crud/:id', (req, res) => {
    let data = {
        question: req.body.question,
        answer: req.body.answer
    }
    let sql = `update question set ? where id = ?`
    db.query(sql, [data, req.params.id], (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
app.delete('/crud/:id', (req, res) => {
    let data = req.params.id
    let sql = `DELETE from question where id = ?`
    db.query(sql, data, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})
app.post('/check', (req, res) => {
    let answer = req.body.answer
    db.query('select * from question where answer = ?', [answer], (err, result) => {
        if (err) {
            res.send({
                "code": 400,
                "failed": "error ocured"
            })
        } else {
            if (result.length > 0) {
                if (result[0].answer === answer) {
                    res.send({
                        "code": 200,
                        "succes": "correct"
                    })
                }
            } else {
                res.send({
                    "code": 204,
                    "succes": "answer Not Found"
                })
            }

        }
    })
})


app.listen(3001, () => {
    console.log('Server Running On 3001')
})