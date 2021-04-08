const express = require('express')
const app = express()
const PORT = 4000
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

let db,
    dbConnectionStr = process.env.DB_STRING, 
    dbName = 'toDo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`connected to our ${dbName} database`)
        db = client.db(dbName)
    })
    .catch(err => {
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (request, response) => {
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({ completed: false})
        response.render('index.ejs', {zebra: todoItems, left: itemsLeft})
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     response.render('index.ejs', {zebra: data, left: itemsLeft})
    
    
})

app.post('/createTodo', (request, response) => {
    console.log(request.body.todoItem)
    db.collection('todos').insertOne({todo: request.body.todoItem, completed: false})
    .then( result => {
        console.log('Todo has been added!')
        response.redirect('/')
    })
})

app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne( {todo: request.body.rainbowUnicorn}, {
        $set: {
            completed: true
        }
    })
    .then(result => {
        console.log('marked complete')
        response.json('Marked Complete')
    })
})

app.put('/undo', (request, response) => {
    db.collection('todos').updateOne({todo: request.body.rainbowUnicorn}, {
        $set: {
            completed: false
        }
    })
    .then(result => {
        console.log('marked incomplete')
        response.json('Marked incomplete')
    })
     
})


app.delete('/deleteToDo', (request, response) => {
    db.collection('todos').deleteOne( {todo: request.body.rainbowUnicorn} )
    .then(result => {
        console.log('deleted a todo')
        response.json('Deleted It')
    })
    .catch (err => 
        console.log(err))
})

app.listen(process.env.PORT || PORT, (request, response) => {
    console.log(`Listening on port ${PORT}`)
})











