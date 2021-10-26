const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Creating an app using Express
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory
app.use(express.static(publicDirectoryPath))


// Setup routes

    //Index
    app.get('', (req, res) => {  
        res.render('index', {
            title: 'Weather',
            name: 'Sayem'
        })
    })

    //About
    app.get('/about', (req, res) => {  
        res.render('about', {
            title: 'About Me',
            name: 'Sayem'
        })
    })

    //Help
    app.get('/help', (req, res) => {  
        res.render('help', {
            title: 'Help',
            name: 'Sayem',
            helpText: 'This is some helpful text.'
        })
    })

    //Weather
    app.get('/weather', (req, res) => {  
        if(!req.query.address) {
            return res.send({
                error: 'You must provide an address!'
            })
        }

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({ error: error })
            }

            forecast(latitude, longitude, (error, {forecast} = {}) => {
                if(error) {
                    res.send({ error: error })
                }

                res.send({
                    forecast,
                    location: location,
                    address: req.query.address
                })
            })
        })
    })

    //Products
    app.get('/products', (req, res) => {  
        if(!req.query.search) {
            return res.send({
                error: 'Your must provide a search term!'
            })
        }
        res.send({
            products: []
        })
    })

    // 404 nop rersult found
    app.get('/help/*', (req, res) => {  
        res.render('error', {
            title: '404',
            errorMessage: 'Sorry, no result found!',
            name: 'Sayem'
        })
    })

    // 404 page not found
    app.get('*', (req, res) => {  
        res.render('error', {
            title: '404',
            name: 'Sayem',
            errorMessage: 'Page not found!' 
        })
    })



// Server starts to listen
app.listen(port, () => {
    console.log('>>> Server is up on port ' + port + ' >>>')
})