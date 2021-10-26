// Fetching Forecast 

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=56acf3d31c4bf5351439b43b14870091&query=' + latitude + ',' + longitude + '&units=m'

    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the weather service.', undefined)
        }
        else if(body.error) {
            callback('Unable to retrieve the forecast information for the given location.', undefined)
        }
        else {
            const weather = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const precipitation = body.current.precip

            callback(undefined, {
                forecast: weather + ". It is " + temperature + " degrees celcius outside and there is " + precipitation + " % probability of rain today."               
            })
        }
    })
}


module.exports = forecast