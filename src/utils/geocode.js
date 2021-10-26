// Geocoding

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicmF5aGFudWxrYWJpciIsImEiOiJja3R1MjIwODQxdnR3MnFwMzExZG1xMzI5In0.g-0g3j4hGrQoQSBkIGDarA&limit=1'

    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the location service.', undefined)
        }
        else if(body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]             
            })
        }
    })
}

module.exports = geocode