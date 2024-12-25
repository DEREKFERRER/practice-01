const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '',
      database: '',
    },
  });


const app = express();

app.use(bodyParser.json())
app.use(cors())


app.get ('/', (req, res) => {
    res.send(db.users)
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.json("All input should have value!")
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        //sync
        const isValid  = bcrypt.compareSync(password, data[0].hash); 
        if (isValid) {
            return db.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch( err => {
                    res.status(400).json("FAIL")
                })
        } else {
            res.status(400).json("wrong credentials")
        }
    })
})

app.post('/signup', (req, res) => {
    const { email, name, password } = req.body;
    if ( !email || !name || !password) {
        return res.json("All input should have value!")
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt);

    //transactions => to chain any query
    db.transaction(trx => {
        db('login')
            .transacting(trx)
            .insert({
               hash: hash,
               email: email
            })
            .returning('email') // need to return the 'email' to match the email in users
            .then(matchEmail => {
            return trx('users')
            .returning('*') // you need to return this so it will display the result
            .insert({
                name: name,
                email: matchEmail[0].email
            })
                .then(user => {
                     res.json(user[0]) 
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch(err => res.status(400).json("ERROR"))
})

    
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.select('*')
      .from('users')
      .where({id}) //match with the req.params
      .then(user => {
        if (user.length) {
           res.json(user)
        } 
        return res.status(400).json("NO USER!")
      })
})

app.put('/updateInfo/:id', (req, res) => {
    const {id} = req.params;
    const { birthdate, motto } = req.body

        db.select('*')
            .from('users')
            .where({id})
            .update({ 
                birthdate: birthdate, 
                motto: motto
            })
            .then(data => {
                if (data) {
                res.json(data)
                } 
            })
            .catch(err => console.log("ERROR"))
})

app.listen(3000, () => {
    console.log('The port 3000 is running')
})

