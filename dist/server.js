"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.get('/api/currentWeather', (req, res) => {
    weatherApi.getCurrentWeather(req.query.lat, req.query.lng)
        .then((weather) => {
        return res.json(weather);
    })
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error fetching current weather' });
    });
});
app.get('/api/weekReport', (req, res) => {
    weatherApi.getWeekReport(req.query.lat, req.query.lng)
        .then((weekReport) => res.json(weekReport))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error fetching weekly report' });
    });
});
app.get('/api/temperatureTimeline', (req, res) => {
    //console.log(req.query.lat, req.query.lng);
    weatherApi.getTemperatureTimeline(req.query.lat, req.query.lng)
        .then((temperatureTimeline) => res.json(temperatureTimeline))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error fetching temperature timeline' });
    });
});
app.get('/api/hourlyWeather', (req, res) => {
    weatherApi.getHourlyWeather(req.query.lat, req.query.lng)
        .then((hourlyWeather) => res.json(hourlyWeather))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error fetching hourly weather' });
    });
});
app.get('/api/weatherDetails', (req, res) => {
    weatherApi.getWeatherDetails(req.query.lat, req.query.lng, req.query.date)
        .then((weatherDetails) => res.json(weatherDetails))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error fetching weather details' });
    });
});
app.get('/api/favorites', (req, res) => {
    mongoApi.getFavorites()
        .then((favorites) => res.json(favorites))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error fetching favorites' });
    });
});
app.delete('/api/favorites/:id', (req, res) => {
    const id = req.params.id;
    mongoApi.deleteFavorite(id)
        .then(() => res.json({ success: true }))
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error deleting favorite' });
    });
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../weather-app/browser/index.html'));
});
// Start the server
mongoApi.startDbConn();
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoApi.closeDbConn();
    process.exit(0);
}));
