const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(lat) + '&lon='+ encodeURIComponent(lon) + '&mode=json&units=metric&appid=037cc161c826a37080adc95a9c5a6f30'
    request({url}, (error, {body}) => {
        const data = JSON.parse(body)
        if(error){
            callback('Error getting data', undefined)
        }else if(data.cod !== 200){
            callback('Not found location', undefined)
        }else{
            callback(undefined, 'It is currently ' + data.main.temp + ' degrees out. There are ' + data.weather[0].description + ' in ' + data.name + '.')
        }
    })
}

module.exports = forecast