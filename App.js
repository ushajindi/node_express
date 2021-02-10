const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Article = require('./db.js')
const articles = [{title: 'Example'}]

app.set('port', process.env.PORT || 1024)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err)
        res.send(articles)
    })
    res.send(articles)
})
app.post('/articles', (req, res, next) => {
    const article = {title: req.body.title}
    articles.push(article)
    console.log(article)
    res.send(article)
})
app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id
    console.log(req.params.id)
    res.send(articles[id])
})
app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id
    console.log('Deleting', id)
    res.send({message: "Deleted"})
})
app.listen(app.get('port'), (err) => {
    console.log(`App started on port http://127.0.0.1:${app.get('port')}`)
})
module.exports = app