const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

const getWeatherInfo = require('./utils/getweatherinfo')

/*
app.get('/', function (req, res) {
    res.send('Hello World')
})
*/
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

const publicDirPath = path.join(__dirname, '../public')
console.log(publicDirPath)
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        content: 'Hello From hbs123',
        author: 'Andrew Programming',
        title: 'Weather'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        content: 'Hello From hbs',
        author: 'Andrew Programming',
        title: 'Help'
    })
})


app.get('/weather', ((req, res) => {
    let city = req.query.city;
    if (!city) {
        return res.send({
            error: 'You must provide a city'
        })
    }
    console.log(city)
    getWeatherInfo(city, (error, data) => {
        console.log('Error', error)
        console.log('Data', data)

        res.send({
            data: data
        })
    })
}))

app.get('/help/*', ((req, res) => {
    res.render('404', {
        current: 'It is sunny',
        location: 'New York',
        errorMessage: 'Sub page of Help not found!'
    })
}))

app.get('*', ((req, res) => {
    res.render('404', {
        current: 'It is sunny',
        location: 'New York',
        errorMessage: 'Page not found!'
    })
}))

app.listen(3001)
