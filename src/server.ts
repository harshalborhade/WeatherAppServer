const dotenv = require("dotenv");
dotenv.config();

const mongoApi = require('./mongo_calls');
const path = require('path');
const weatherApi = require('./tomorrow_api_calls');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, '../weather-app/browser')));

//api routes
app.get('/api/currentWeather', (req: any, res:any) => {
    weatherApi.getCurrentWeather(req.query.lat, req.query.lng)
        .then((weather:any) => {
          return res.json(weather);
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({error: 'Error fetching current weather'});
        });
});

app.get('/api/weekReport', (req:any, res:any) => {
    weatherApi.getWeekReport(req.query.lat, req.query.lng)
        .then((weekReport: any) => res.json(weekReport))
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({error: 'Error fetching weekly report'});
        });
});

app.get('/api/temperatureTimeline', (req: any, res: any) => {
    //console.log(req.query.lat, req.query.lng);
    weatherApi.getTemperatureTimeline(req.query.lat, req.query.lng)
        .then((temperatureTimeline: any) => res.json(temperatureTimeline))
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({error: 'Error fetching temperature timeline'});
        });
});

app.get('/api/hourlyWeather', (req:any, res:any) => {
    weatherApi.getHourlyWeather(req.query.lat, req.query.lng)
        .then((hourlyWeather: any) => res.json(hourlyWeather))
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({error: 'Error fetching hourly weather'});
        });
});

app.get('/api/weatherDetails', (req:any, res:any) => {

    weatherApi.getWeatherDetails(req.query.lat, req.query.lng, req.query.date)
        .then((weatherDetails: any) => res.json(weatherDetails))
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({error: 'Error fetching weather details'});
        });
});

app.get('/api/todayWeatherDetails' , (req:any, res:any) => {
    weatherApi.getTodayWeatherDetails(req.query.lat, req.query.lng)
        .then((weatherDetails: any) => res.json(weatherDetails))
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({error: 'Error fetching weather details'});
        });
});

app.get('/api/favorites', (req:any, res:any) => {

    mongoApi.getFavorites()
        .then((favorites: any) => res.json(favorites))
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({error: 'Error fetching favorites'});
        });
});

app.delete('/api/favorites/:id', (req: any, res:any) => {
    const id = req.params.id;
    mongoApi.deleteFavorite(id)
        .then(() => res.json({success: true}))
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({error: 'Error deleting favorite'});
        });
});

app.get('*', (req:any, res:any) => {
  res.json({success: true, message: "hello world"});
});


// Start the server
mongoApi.startDbConn();

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    await mongoApi.closeDbConn();
    process.exit(0);
});

