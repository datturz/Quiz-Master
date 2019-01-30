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