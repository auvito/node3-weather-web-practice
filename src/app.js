const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('../../weather-app/utils/forecast')
const geocode = require('../../weather-app/utils/geocode')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Vito'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vito'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        help: 'Caranya adalah klik kanan->quit application :)',
        name: 'Vito'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'Please enter address!'})
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, data) => {
          if(error){
            return res.send({error})
          }
    
          return res.send({
            address:location,  
            forecast: data
        })
        })
    })
})

// app.get('/products', (req,res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send ({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404' ,{
        error: '404 HELP PAGE NOT FOUND'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: '404 PAGE NOT FOUND'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})