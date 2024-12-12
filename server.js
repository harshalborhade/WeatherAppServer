var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var mongoApi = require('./mongo_calls');
var path = require('path');
var weatherApi = require('./tomorrow_api_calls');
var express = require('express');
var cors = require('cors');
var app = express();
var port = 8080;
app.use(cors());
app.use(express.static(path.join(__dirname, '../weather-app/browser')));
//api routes
app.get('/api/currentWeather', function (req, res) {
    weatherApi.getCurrentWeather(req.query.lat, req.query.lng)
        .then(function (weather) {
        return res.json(weather);
    })
        .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching current weather' });
    });
});
app.get('/api/weekReport', function (req, res) {
    weatherApi.getWeekReport(req.query.lat, req.query.lng)
        .then(function (weekReport) { return res.json(weekReport); })
        .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching weekly report' });
    });
});
app.get('/api/temperatureTimeline', function (req, res) {
    //console.log(req.query.lat, req.query.lng);
    weatherApi.getTemperatureTimeline(req.query.lat, req.query.lng)
        .then(function (temperatureTimeline) { return res.json(temperatureTimeline); })
        .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching temperature timeline' });
    });
});
app.get('/api/hourlyWeather', function (req, res) {
    weatherApi.getHourlyWeather(req.query.lat, req.query.lng)
        .then(function (hourlyWeather) { return res.json(hourlyWeather); })
        .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching hourly weather' });
    });
});
app.get('/api/weatherDetails', function (req, res) {
    weatherApi.getWeatherDetails(req.query.lat, req.query.lng, req.query.date)
        .then(function (weatherDetails) { return res.json(weatherDetails); })
        .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching weather details' });
    });
});
app.get('/api/favorites', function (req, res) {
    mongoApi.getFavorites()
        .then(function (favorites) { return res.json(favorites); })
        .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching favorites' });
    });
});
app.delete('/api/favorites/:id', function (req, res) {
    var id = req.params.id;
    mongoApi.deleteFavorite(id)
        .then(function () { return res.json({ success: true }); })
        .catch(function (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting favorite' });
    });
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../weather-app/browser/index.html'));
});
// Start the server
mongoApi.startDbConn();
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
process.on('SIGINT', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoApi.closeDbConn()];
            case 1:
                _a.sent();
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
