"use strict";
const TOMORROW_API_URL = 'https://api.tomorrow.io/v4/timelines';
const TOMORROW_API_KEY = 'D8G6fVaXgnwrSksMZOWaSq7OynBWPLwi';
function getCurrentWeather(lat, lng) {
    const url = `${TOMORROW_API_URL}?apikey=${TOMORROW_API_KEY}`;
    const payload = {
        location: `${lat},${lng}`,
        fields: [
            "temperature",
            "weatherCode",
            "humidity",
            "visibility",
            "windSpeed",
            "pressureSeaLevel",
            "cloudCover",
            "uvIndex"
        ],
        units: "imperial",
        timesteps: ["current"]
    };
    const headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip",
        "content-type": "application/json"
    };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers
    })
        .then(response => response.json())
        .then(data => data.data.timelines[0].intervals[0].values)
        .catch(error => {
        console.error('Error fetching current weather:', error);
        throw error;
    });
}
function getWeekReport(lat, lng) {
    const url = `${TOMORROW_API_URL}?apikey=${TOMORROW_API_KEY}`;
    const payload = {
        location: `${lat},${lng}`,
        fields: ["weatherCode", "temperatureMax", "temperatureMin", "windSpeed"],
        units: "imperial",
        timesteps: ["1d"],
        startTime: "now",
        endTime: "nowPlus5d"
    };
    const headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip",
        "content-type": "application/json"
    };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers
    })
        .then(response => response.json())
        .then(data => data.data.timelines[0].intervals)
        .catch(error => {
        console.error('Error fetching week report:', error);
        throw error;
    });
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve([
    //             {
    //                 "startTime": "2024-11-10T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 77.9,
    //                     "temperatureMin": 49.44,
    //                     "weatherCode": 1000,
    //                     "windSpeed": 7.55
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-11T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 67.98,
    //                     "temperatureMin": 50.08,
    //                     "weatherCode": 1000,
    //                     "windSpeed": 10.07
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 69.68,
    //                     "temperatureMin": 50.83,
    //                     "weatherCode": 1000,
    //                     "windSpeed": 7.98
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 79.39,
    //                     "temperatureMin": 56,
    //                     "weatherCode": 1000,
    //                     "windSpeed": 7.55
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 70.93,
    //                     "temperatureMin": 54.88,
    //                     "weatherCode": 1000,
    //                     "windSpeed": 8.42
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 60.79,
    //                     "temperatureMin": 52.55,
    //                     "weatherCode": 1100,
    //                     "windSpeed": 11.44
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 60.25,
    //                     "temperatureMin": 52.03,
    //                     "weatherCode": 1000,
    //                     "windSpeed": 9.23
    //                 }
    //             }
    //         ]);
    //     }, 1000);
    // });
}
function getTemperatureTimeline(lat, lng) {
    const url = `${TOMORROW_API_URL}?apikey=${TOMORROW_API_KEY}`;
    const payload = {
        location: `${lat},${lng}`,
        fields: ["temperatureMax", "temperatureMin"],
        units: "imperial",
        timesteps: ["1d"],
        startTime: "now",
        endTime: "nowPlus5d"
    };
    const headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip",
        "content-type": "application/json"
    };
    //console.log(payload);
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
        return data.data.timelines[0].intervals;
    })
        .catch(error => {
        console.error('Error fetching temperature timeline:', error);
        throw error;
    });
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve([
    //             {
    //                 "startTime": "2024-11-10T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 77.9,
    //                     "temperatureMin": 49.44
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-11T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 67.8,
    //                     "temperatureMin": 49.52
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 69.68,
    //                     "temperatureMin": 50.83
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 79.39,
    //                     "temperatureMin": 56
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 70.93,
    //                     "temperatureMin": 54.88
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 60.79,
    //                     "temperatureMin": 52.55
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T14:00:00Z",
    //                 "values": {
    //                     "temperatureMax": 60.25,
    //                     "temperatureMin": 52.03
    //                 }
    //             }
    //         ])
    //     }, 1000);
    // });
}
function getHourlyWeather(lat, lng) {
    const url = `${TOMORROW_API_URL}?apikey=${TOMORROW_API_KEY}`;
    const payload = {
        location: `${lat},${lng}`,
        fields: ["temperature", "windSpeed", "humidity", "windDirection", "pressureSeaLevel"],
        units: "imperial",
        timesteps: ["1h"],
        startTime: "now",
        endTime: "nowPlus5d"
    };
    const headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip",
        "content-type": "application/json"
    };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers
    })
        .then(response => response.json())
        .then(data => data.data.timelines[0].intervals)
        .catch(error => {
        console.error('Error fetching hourly weather:', error);
        throw error;
    });
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve([
    //             {
    //                 "startTime": "2024-11-12T04:00:00Z",
    //                 "values": {
    //                     "humidity": 89,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 59.34,
    //                     "windDirection": 265,
    //                     "windSpeed": 2.94
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T05:00:00Z",
    //                 "values": {
    //                     "humidity": 86.02,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 60.27,
    //                     "windDirection": 256,
    //                     "windSpeed": 5.03
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T06:00:00Z",
    //                 "values": {
    //                     "humidity": 86.2,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 60.31,
    //                     "windDirection": 257.46,
    //                     "windSpeed": 4.25
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T07:00:00Z",
    //                 "values": {
    //                     "humidity": 89.09,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 58.13,
    //                     "windDirection": 155.57,
    //                     "windSpeed": 4.09
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T08:00:00Z",
    //                 "values": {
    //                     "humidity": 90,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 56.38,
    //                     "windDirection": 99.35,
    //                     "windSpeed": 4.34
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T09:00:00Z",
    //                 "values": {
    //                     "humidity": 90.73,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 55.39,
    //                     "windDirection": 67.27,
    //                     "windSpeed": 5.39
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T10:00:00Z",
    //                 "values": {
    //                     "humidity": 88.73,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 55.28,
    //                     "windDirection": 51.49,
    //                     "windSpeed": 5.66
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T11:00:00Z",
    //                 "values": {
    //                     "humidity": 89.67,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 53.69,
    //                     "windDirection": 24.5,
    //                     "windSpeed": 4.63
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T12:00:00Z",
    //                 "values": {
    //                     "humidity": 79.13,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 52.75,
    //                     "windDirection": 14.34,
    //                     "windSpeed": 5.29
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T13:00:00Z",
    //                 "values": {
    //                     "humidity": 75.13,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 51.64,
    //                     "windDirection": 27.95,
    //                     "windSpeed": 6.01
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T14:00:00Z",
    //                 "values": {
    //                     "humidity": 73.88,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 51.7,
    //                     "windDirection": 38.78,
    //                     "windSpeed": 6.58
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T15:00:00Z",
    //                 "values": {
    //                     "humidity": 79.67,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 52.61,
    //                     "windDirection": 42,
    //                     "windSpeed": 6.57
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T16:00:00Z",
    //                 "values": {
    //                     "humidity": 81.76,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 55.31,
    //                     "windDirection": 41.45,
    //                     "windSpeed": 5.42
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T17:00:00Z",
    //                 "values": {
    //                     "humidity": 74.89,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 58.99,
    //                     "windDirection": 61.37,
    //                     "windSpeed": 5.03
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T18:00:00Z",
    //                 "values": {
    //                     "humidity": 68.73,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 60.88,
    //                     "windDirection": 100.28,
    //                     "windSpeed": 5.03
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T19:00:00Z",
    //                 "values": {
    //                     "humidity": 60.59,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 64.24,
    //                     "windDirection": 120.08,
    //                     "windSpeed": 5.03
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T20:00:00Z",
    //                 "values": {
    //                     "humidity": 53.55,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 66.2,
    //                     "windDirection": 142.71,
    //                     "windSpeed": 5.04
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T21:00:00Z",
    //                 "values": {
    //                     "humidity": 50.06,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 68,
    //                     "windDirection": 208,
    //                     "windSpeed": 5.67
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T22:00:00Z",
    //                 "values": {
    //                     "humidity": 47.06,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 68.88,
    //                     "windDirection": 239.84,
    //                     "windSpeed": 6.23
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-12T23:00:00Z",
    //                 "values": {
    //                     "humidity": 47.68,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 67.88,
    //                     "windDirection": 254.71,
    //                     "windSpeed": 7.28
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T00:00:00Z",
    //                 "values": {
    //                     "humidity": 54.3,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 65.05,
    //                     "windDirection": 256,
    //                     "windSpeed": 7.35
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T01:00:00Z",
    //                 "values": {
    //                     "humidity": 61.31,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 61.54,
    //                     "windDirection": 256,
    //                     "windSpeed": 6.74
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T02:00:00Z",
    //                 "values": {
    //                     "humidity": 68.59,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 58.84,
    //                     "windDirection": 288,
    //                     "windSpeed": 5.71
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T03:00:00Z",
    //                 "values": {
    //                     "humidity": 74.02,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 57.17,
    //                     "windDirection": 338.92,
    //                     "windSpeed": 5.08
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T04:00:00Z",
    //                 "values": {
    //                     "humidity": 73.84,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 56.38,
    //                     "windDirection": 41.42,
    //                     "windSpeed": 5.13
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T05:00:00Z",
    //                 "values": {
    //                     "humidity": 71.8,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 55.41,
    //                     "windDirection": 43.19,
    //                     "windSpeed": 5.69
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T06:00:00Z",
    //                 "values": {
    //                     "humidity": 69.27,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 54.1,
    //                     "windDirection": 46.65,
    //                     "windSpeed": 5.97
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T07:00:00Z",
    //                 "values": {
    //                     "humidity": 65.19,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 53.31,
    //                     "windDirection": 52.16,
    //                     "windSpeed": 6.25
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T08:00:00Z",
    //                 "values": {
    //                     "humidity": 64.43,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 52.05,
    //                     "windDirection": 53.43,
    //                     "windSpeed": 6.8
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T09:00:00Z",
    //                 "values": {
    //                     "humidity": 62.94,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 51.96,
    //                     "windDirection": 48.02,
    //                     "windSpeed": 6.81
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T10:00:00Z",
    //                 "values": {
    //                     "humidity": 58.71,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 51.88,
    //                     "windDirection": 46.65,
    //                     "windSpeed": 6.84
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T11:00:00Z",
    //                 "values": {
    //                     "humidity": 57.96,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 50.98,
    //                     "windDirection": 50.43,
    //                     "windSpeed": 7.07
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T12:00:00Z",
    //                 "values": {
    //                     "humidity": 57.21,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 50.29,
    //                     "windDirection": 50.43,
    //                     "windSpeed": 7.28
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T13:00:00Z",
    //                 "values": {
    //                     "humidity": 54.82,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 50.29,
    //                     "windDirection": 49.98,
    //                     "windSpeed": 7.37
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T14:00:00Z",
    //                 "values": {
    //                     "humidity": 49.65,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 50.29,
    //                     "windDirection": 47.72,
    //                     "windSpeed": 7.6
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T15:00:00Z",
    //                 "values": {
    //                     "humidity": 42.67,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 51,
    //                     "windDirection": 48.95,
    //                     "windSpeed": 7.88
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T16:00:00Z",
    //                 "values": {
    //                     "humidity": 31.98,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 56.55,
    //                     "windDirection": 50.91,
    //                     "windSpeed": 7.27
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T17:00:00Z",
    //                 "values": {
    //                     "humidity": 25.03,
    //                     "pressureSeaLevel": 30.09,
    //                     "temperature": 62.75,
    //                     "windDirection": 54.91,
    //                     "windSpeed": 6.81
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T18:00:00Z",
    //                 "values": {
    //                     "humidity": 21.29,
    //                     "pressureSeaLevel": 30.12,
    //                     "temperature": 68.15,
    //                     "windDirection": 60.58,
    //                     "windSpeed": 6.15
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T19:00:00Z",
    //                 "values": {
    //                     "humidity": 19.82,
    //                     "pressureSeaLevel": 30.09,
    //                     "temperature": 71.6,
    //                     "windDirection": 77.89,
    //                     "windSpeed": 5.59
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T20:00:00Z",
    //                 "values": {
    //                     "humidity": 20.35,
    //                     "pressureSeaLevel": 30.06,
    //                     "temperature": 73.38,
    //                     "windDirection": 172.37,
    //                     "windSpeed": 5.95
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T21:00:00Z",
    //                 "values": {
    //                     "humidity": 10.6,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 78.71,
    //                     "windDirection": 234.32,
    //                     "windSpeed": 3.91
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T22:00:00Z",
    //                 "values": {
    //                     "humidity": 10.52,
    //                     "pressureSeaLevel": 30.01,
    //                     "temperature": 79.14,
    //                     "windDirection": 232.85,
    //                     "windSpeed": 5.47
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-13T23:00:00Z",
    //                 "values": {
    //                     "humidity": 12.68,
    //                     "pressureSeaLevel": 30.01,
    //                     "temperature": 77.27,
    //                     "windDirection": 234.14,
    //                     "windSpeed": 8.07
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T00:00:00Z",
    //                 "values": {
    //                     "humidity": 20.03,
    //                     "pressureSeaLevel": 30.02,
    //                     "temperature": 72.38,
    //                     "windDirection": 245.52,
    //                     "windSpeed": 8.29
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T01:00:00Z",
    //                 "values": {
    //                     "humidity": 29.49,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 65.33,
    //                     "windDirection": 269.69,
    //                     "windSpeed": 6.38
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T02:00:00Z",
    //                 "values": {
    //                     "humidity": 30.22,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 63.65,
    //                     "windDirection": 308.85,
    //                     "windSpeed": 4.72
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T03:00:00Z",
    //                 "values": {
    //                     "humidity": 31.3,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 60.79,
    //                     "windDirection": 323.89,
    //                     "windSpeed": 3.97
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T04:00:00Z",
    //                 "values": {
    //                     "humidity": 29.26,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 60.06,
    //                     "windDirection": 355.92,
    //                     "windSpeed": 2.17
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T05:00:00Z",
    //                 "values": {
    //                     "humidity": 30.04,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 57.63,
    //                     "windDirection": 39.65,
    //                     "windSpeed": 3.87
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T06:00:00Z",
    //                 "values": {
    //                     "humidity": 30.03,
    //                     "pressureSeaLevel": 30.03,
    //                     "temperature": 56.55,
    //                     "windDirection": 49.18,
    //                     "windSpeed": 3.58
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T07:00:00Z",
    //                 "values": {
    //                     "humidity": 33.05,
    //                     "pressureSeaLevel": 30.02,
    //                     "temperature": 54.67,
    //                     "windDirection": 45.4,
    //                     "windSpeed": 3.96
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T08:00:00Z",
    //                 "values": {
    //                     "humidity": 28.34,
    //                     "pressureSeaLevel": 30.01,
    //                     "temperature": 58.22,
    //                     "windDirection": 44.81,
    //                     "windSpeed": 2.49
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T09:00:00Z",
    //                 "values": {
    //                     "humidity": 25.76,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 60.18,
    //                     "windDirection": 7.69,
    //                     "windSpeed": 1.57
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T10:00:00Z",
    //                 "values": {
    //                     "humidity": 27.71,
    //                     "pressureSeaLevel": 29.99,
    //                     "temperature": 58.11,
    //                     "windDirection": 28.95,
    //                     "windSpeed": 2.22
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T11:00:00Z",
    //                 "values": {
    //                     "humidity": 30.53,
    //                     "pressureSeaLevel": 29.97,
    //                     "temperature": 55.34,
    //                     "windDirection": 39.07,
    //                     "windSpeed": 2.62
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T12:00:00Z",
    //                 "values": {
    //                     "humidity": 27.24,
    //                     "pressureSeaLevel": 29.96,
    //                     "temperature": 57.55,
    //                     "windDirection": 30.37,
    //                     "windSpeed": 2
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T13:00:00Z",
    //                 "values": {
    //                     "humidity": 25.52,
    //                     "pressureSeaLevel": 29.96,
    //                     "temperature": 58.9,
    //                     "windDirection": 38.5,
    //                     "windSpeed": 1.57
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T14:00:00Z",
    //                 "values": {
    //                     "humidity": 26.94,
    //                     "pressureSeaLevel": 29.97,
    //                     "temperature": 57.3,
    //                     "windDirection": 60.94,
    //                     "windSpeed": 1.9
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T15:00:00Z",
    //                 "values": {
    //                     "humidity": 31.33,
    //                     "pressureSeaLevel": 29.97,
    //                     "temperature": 54.2,
    //                     "windDirection": 50.11,
    //                     "windSpeed": 2.5
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T16:00:00Z",
    //                 "values": {
    //                     "humidity": 25.69,
    //                     "pressureSeaLevel": 29.98,
    //                     "temperature": 59.79,
    //                     "windDirection": 68.6,
    //                     "windSpeed": 2.02
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T17:00:00Z",
    //                 "values": {
    //                     "humidity": 21.7,
    //                     "pressureSeaLevel": 29.99,
    //                     "temperature": 64.14,
    //                     "windDirection": 130.18,
    //                     "windSpeed": 2.67
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T18:00:00Z",
    //                 "values": {
    //                     "humidity": 22.73,
    //                     "pressureSeaLevel": 29.98,
    //                     "temperature": 67.35,
    //                     "windDirection": 169.56,
    //                     "windSpeed": 3.36
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T19:00:00Z",
    //                 "values": {
    //                     "humidity": 23.3,
    //                     "pressureSeaLevel": 29.97,
    //                     "temperature": 69.89,
    //                     "windDirection": 180.66,
    //                     "windSpeed": 4.57
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T20:00:00Z",
    //                 "values": {
    //                     "humidity": 21.49,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 71.95,
    //                     "windDirection": 183.49,
    //                     "windSpeed": 5.73
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T21:00:00Z",
    //                 "values": {
    //                     "humidity": 19.56,
    //                     "pressureSeaLevel": 29.9,
    //                     "temperature": 73.17,
    //                     "windDirection": 188.21,
    //                     "windSpeed": 6.52
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T22:00:00Z",
    //                 "values": {
    //                     "humidity": 21.99,
    //                     "pressureSeaLevel": 29.89,
    //                     "temperature": 72.39,
    //                     "windDirection": 201.62,
    //                     "windSpeed": 7.82
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-14T23:00:00Z",
    //                 "values": {
    //                     "humidity": 31.79,
    //                     "pressureSeaLevel": 29.88,
    //                     "temperature": 68.73,
    //                     "windDirection": 212.44,
    //                     "windSpeed": 8.47
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T00:00:00Z",
    //                 "values": {
    //                     "humidity": 39.76,
    //                     "pressureSeaLevel": 29.88,
    //                     "temperature": 64.27,
    //                     "windDirection": 209.22,
    //                     "windSpeed": 6.41
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T01:00:00Z",
    //                 "values": {
    //                     "humidity": 56.31,
    //                     "pressureSeaLevel": 29.88,
    //                     "temperature": 58.68,
    //                     "windDirection": 184.8,
    //                     "windSpeed": 4.21
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T02:00:00Z",
    //                 "values": {
    //                     "humidity": 67.21,
    //                     "pressureSeaLevel": 29.88,
    //                     "temperature": 56.81,
    //                     "windDirection": 149.06,
    //                     "windSpeed": 4.44
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T03:00:00Z",
    //                 "values": {
    //                     "humidity": 73.17,
    //                     "pressureSeaLevel": 29.89,
    //                     "temperature": 56.09,
    //                     "windDirection": 143.64,
    //                     "windSpeed": 5.29
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T04:00:00Z",
    //                 "values": {
    //                     "humidity": 76.82,
    //                     "pressureSeaLevel": 29.9,
    //                     "temperature": 55.12,
    //                     "windDirection": 145.47,
    //                     "windSpeed": 6.27
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T05:00:00Z",
    //                 "values": {
    //                     "humidity": 73.55,
    //                     "pressureSeaLevel": 29.91,
    //                     "temperature": 55.52,
    //                     "windDirection": 146.24,
    //                     "windSpeed": 5.85
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T06:00:00Z",
    //                 "values": {
    //                     "humidity": 71.2,
    //                     "pressureSeaLevel": 29.92,
    //                     "temperature": 55.46,
    //                     "windDirection": 155.26,
    //                     "windSpeed": 6.19
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T07:00:00Z",
    //                 "values": {
    //                     "humidity": 71.35,
    //                     "pressureSeaLevel": 29.92,
    //                     "temperature": 54.99,
    //                     "windDirection": 169.19,
    //                     "windSpeed": 6.88
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T08:00:00Z",
    //                 "values": {
    //                     "humidity": 70.65,
    //                     "pressureSeaLevel": 29.92,
    //                     "temperature": 54.71,
    //                     "windDirection": 180.14,
    //                     "windSpeed": 6.14
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T09:00:00Z",
    //                 "values": {
    //                     "humidity": 69.15,
    //                     "pressureSeaLevel": 29.92,
    //                     "temperature": 54.75,
    //                     "windDirection": 168.37,
    //                     "windSpeed": 5.12
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T10:00:00Z",
    //                 "values": {
    //                     "humidity": 68.74,
    //                     "pressureSeaLevel": 29.93,
    //                     "temperature": 54.69,
    //                     "windDirection": 171.31,
    //                     "windSpeed": 4.71
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T11:00:00Z",
    //                 "values": {
    //                     "humidity": 67.55,
    //                     "pressureSeaLevel": 29.93,
    //                     "temperature": 54.7,
    //                     "windDirection": 164.5,
    //                     "windSpeed": 3.61
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T12:00:00Z",
    //                 "values": {
    //                     "humidity": 66.34,
    //                     "pressureSeaLevel": 29.93,
    //                     "temperature": 54.66,
    //                     "windDirection": 161.21,
    //                     "windSpeed": 2.75
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T13:00:00Z",
    //                 "values": {
    //                     "humidity": 64.96,
    //                     "pressureSeaLevel": 29.93,
    //                     "temperature": 54.98,
    //                     "windDirection": 165.65,
    //                     "windSpeed": 2.71
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T14:00:00Z",
    //                 "values": {
    //                     "humidity": 66.8,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 54.76,
    //                     "windDirection": 165.97,
    //                     "windSpeed": 2.81
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T15:00:00Z",
    //                 "values": {
    //                     "humidity": 68.55,
    //                     "pressureSeaLevel": 29.95,
    //                     "temperature": 54.69,
    //                     "windDirection": 164.13,
    //                     "windSpeed": 2.7
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T16:00:00Z",
    //                 "values": {
    //                     "humidity": 66.43,
    //                     "pressureSeaLevel": 29.96,
    //                     "temperature": 55.66,
    //                     "windDirection": 184.58,
    //                     "windSpeed": 3.89
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T17:00:00Z",
    //                 "values": {
    //                     "humidity": 63.35,
    //                     "pressureSeaLevel": 29.97,
    //                     "temperature": 56.86,
    //                     "windDirection": 211.03,
    //                     "windSpeed": 5.48
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T18:00:00Z",
    //                 "values": {
    //                     "humidity": 58.75,
    //                     "pressureSeaLevel": 29.97,
    //                     "temperature": 58.2,
    //                     "windDirection": 217.49,
    //                     "windSpeed": 6.65
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T19:00:00Z",
    //                 "values": {
    //                     "humidity": 54.66,
    //                     "pressureSeaLevel": 29.96,
    //                     "temperature": 59.4,
    //                     "windDirection": 223.9,
    //                     "windSpeed": 7.84
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T20:00:00Z",
    //                 "values": {
    //                     "humidity": 52.15,
    //                     "pressureSeaLevel": 29.93,
    //                     "temperature": 60.06,
    //                     "windDirection": 222.04,
    //                     "windSpeed": 9.44
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T21:00:00Z",
    //                 "values": {
    //                     "humidity": 51.43,
    //                     "pressureSeaLevel": 29.91,
    //                     "temperature": 60.17,
    //                     "windDirection": 220.28,
    //                     "windSpeed": 10.87
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T22:00:00Z",
    //                 "values": {
    //                     "humidity": 49,
    //                     "pressureSeaLevel": 29.89,
    //                     "temperature": 60.24,
    //                     "windDirection": 219.99,
    //                     "windSpeed": 11.05
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-15T23:00:00Z",
    //                 "values": {
    //                     "humidity": 45.48,
    //                     "pressureSeaLevel": 29.89,
    //                     "temperature": 60.27,
    //                     "windDirection": 225.96,
    //                     "windSpeed": 11.04
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T00:00:00Z",
    //                 "values": {
    //                     "humidity": 44.31,
    //                     "pressureSeaLevel": 29.89,
    //                     "temperature": 59.67,
    //                     "windDirection": 237.63,
    //                     "windSpeed": 10.48
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T01:00:00Z",
    //                 "values": {
    //                     "humidity": 47.54,
    //                     "pressureSeaLevel": 29.9,
    //                     "temperature": 58.31,
    //                     "windDirection": 249,
    //                     "windSpeed": 10.34
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T02:00:00Z",
    //                 "values": {
    //                     "humidity": 51.82,
    //                     "pressureSeaLevel": 29.92,
    //                     "temperature": 57.13,
    //                     "windDirection": 255.86,
    //                     "windSpeed": 9.24
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T03:00:00Z",
    //                 "values": {
    //                     "humidity": 55.22,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 56.06,
    //                     "windDirection": 251.02,
    //                     "windSpeed": 7.72
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T04:00:00Z",
    //                 "values": {
    //                     "humidity": 58.26,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 55.22,
    //                     "windDirection": 221.53,
    //                     "windSpeed": 6.08
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T05:00:00Z",
    //                 "values": {
    //                     "humidity": 60.17,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 54.5,
    //                     "windDirection": 191.03,
    //                     "windSpeed": 6.02
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T06:00:00Z",
    //                 "values": {
    //                     "humidity": 61.3,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 53.8,
    //                     "windDirection": 168.12,
    //                     "windSpeed": 5.74
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T07:00:00Z",
    //                 "values": {
    //                     "humidity": 62.87,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 53.15,
    //                     "windDirection": 144.98,
    //                     "windSpeed": 5.61
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T08:00:00Z",
    //                 "values": {
    //                     "humidity": 64.12,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 52.67,
    //                     "windDirection": 111.87,
    //                     "windSpeed": 6.35
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T09:00:00Z",
    //                 "values": {
    //                     "humidity": 64.28,
    //                     "pressureSeaLevel": 29.95,
    //                     "temperature": 52.42,
    //                     "windDirection": 87.62,
    //                     "windSpeed": 7.02
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T10:00:00Z",
    //                 "values": {
    //                     "humidity": 64.25,
    //                     "pressureSeaLevel": 29.96,
    //                     "temperature": 52.26,
    //                     "windDirection": 77.26,
    //                     "windSpeed": 7.61
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T11:00:00Z",
    //                 "values": {
    //                     "humidity": 64.69,
    //                     "pressureSeaLevel": 29.95,
    //                     "temperature": 52.04,
    //                     "windDirection": 79.72,
    //                     "windSpeed": 7.39
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T12:00:00Z",
    //                 "values": {
    //                     "humidity": 64.9,
    //                     "pressureSeaLevel": 29.96,
    //                     "temperature": 51.81,
    //                     "windDirection": 76.8,
    //                     "windSpeed": 5.86
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T13:00:00Z",
    //                 "values": {
    //                     "humidity": 64.07,
    //                     "pressureSeaLevel": 29.97,
    //                     "temperature": 51.63,
    //                     "windDirection": 65.57,
    //                     "windSpeed": 4.06
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T14:00:00Z",
    //                 "values": {
    //                     "humidity": 62.54,
    //                     "pressureSeaLevel": 29.98,
    //                     "temperature": 51.37,
    //                     "windDirection": 30.29,
    //                     "windSpeed": 3.16
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T15:00:00Z",
    //                 "values": {
    //                     "humidity": 58.89,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 51.56,
    //                     "windDirection": 131.55,
    //                     "windSpeed": 3.53
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T16:00:00Z",
    //                 "values": {
    //                     "humidity": 52.87,
    //                     "pressureSeaLevel": 30,
    //                     "temperature": 53.39,
    //                     "windDirection": 244.42,
    //                     "windSpeed": 3.29
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T17:00:00Z",
    //                 "values": {
    //                     "humidity": 48.12,
    //                     "pressureSeaLevel": 30.01,
    //                     "temperature": 55.21,
    //                     "windDirection": 304.17,
    //                     "windSpeed": 2.99
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T18:00:00Z",
    //                 "values": {
    //                     "humidity": 43.02,
    //                     "pressureSeaLevel": 30.01,
    //                     "temperature": 56.92,
    //                     "windDirection": 255.04,
    //                     "windSpeed": 3.08
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T19:00:00Z",
    //                 "values": {
    //                     "humidity": 38.89,
    //                     "pressureSeaLevel": 29.98,
    //                     "temperature": 58.3,
    //                     "windDirection": 255.04,
    //                     "windSpeed": 4.36
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T20:00:00Z",
    //                 "values": {
    //                     "humidity": 34.76,
    //                     "pressureSeaLevel": 29.96,
    //                     "temperature": 59.69,
    //                     "windDirection": 217.92,
    //                     "windSpeed": 5.64
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T21:00:00Z",
    //                 "values": {
    //                     "humidity": 30.63,
    //                     "pressureSeaLevel": 29.94,
    //                     "temperature": 61.08,
    //                     "windDirection": 217.92,
    //                     "windSpeed": 6.93
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T22:00:00Z",
    //                 "values": {
    //                     "humidity": 35.49,
    //                     "pressureSeaLevel": 29.93,
    //                     "temperature": 60.01,
    //                     "windDirection": 217.92,
    //                     "windSpeed": 7.89
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-16T23:00:00Z",
    //                 "values": {
    //                     "humidity": 40.35,
    //                     "pressureSeaLevel": 29.93,
    //                     "temperature": 58.94,
    //                     "windDirection": 225.93,
    //                     "windSpeed": 8.85
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-17T00:00:00Z",
    //                 "values": {
    //                     "humidity": 45.21,
    //                     "pressureSeaLevel": 29.92,
    //                     "temperature": 57.87,
    //                     "windDirection": 225.93,
    //                     "windSpeed": 9.81
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-17T01:00:00Z",
    //                 "values": {
    //                     "humidity": 47.63,
    //                     "pressureSeaLevel": 29.93,
    //                     "temperature": 56.76,
    //                     "windDirection": 225.93,
    //                     "windSpeed": 7.67
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-17T02:00:00Z",
    //                 "values": {
    //                     "humidity": 50.05,
    //                     "pressureSeaLevel": 29.95,
    //                     "temperature": 55.64,
    //                     "windDirection": 270.75,
    //                     "windSpeed": 5.54
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-17T03:00:00Z",
    //                 "values": {
    //                     "humidity": 52.47,
    //                     "pressureSeaLevel": 29.96,
    //                     "temperature": 54.53,
    //                     "windDirection": 270.75,
    //                     "windSpeed": 3.4
    //                 }
    //             },
    //             {
    //                 "startTime": "2024-11-17T04:00:00Z",
    //                 "values": {
    //                     "humidity": 49.98,
    //                     "pressureSeaLevel": 29.97,
    //                     "temperature": 54.37,
    //                     "windDirection": 270.75,
    //                     "windSpeed": 3.03
    //                 }
    //             }
    //         ]);
    //     }, 1000)
    // });
}
function getWeatherDetails(lat, lng, date) {
    const url = `${TOMORROW_API_URL}?apikey=${TOMORROW_API_KEY}`;
    const payload = {
        location: `${lat},${lng}`,
        fields: [
            "temperatureMax",
            "temperatureMin",
            "weatherCode",
            "precipitationType",
            "humidity",
            "visibility",
            "windSpeed",
            "precipitationProbability",
            "sunriseTime",
            "sunsetTime"
        ],
        units: "imperial",
        startTime: date,
        timesteps: ["1d"]
    };
    console.log(payload);
    const headers = {
        "accept": "application/json",
        "Accept-Encoding": "gzip",
        "content-type": "application/json"
    };
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers
    })
        .then(response => response.json())
        .then(data => data.data.timelines[0].intervals[0])
        .catch(error => {
        console.error('Error fetching weather details:', error);
        throw error;
    });
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve({
    //         "startTime": "2024-11-12T14:00:00Z",
    //         "values": {
    //             "humidity": 98,
    //             "precipitationProbability": 0,
    //             "precipitationType": 0,
    //             "sunriseTime": "2024-11-12T14:19:00Z",
    //             "sunsetTime": "2024-11-13T00:55:00Z",
    //             "temperatureMax": 70.36,
    //             "temperatureMin": 49.66,
    //             "apparentTemperature": 65.39,
    //             "visibility": 9.94,
    //             "weatherCode": 1000,
    //             "windSpeed": 7.83
    //         }
    //     }), 1000)
    // });
}
module.exports = {
    getCurrentWeather,
    getWeekReport,
    getTemperatureTimeline,
    getHourlyWeather,
    getWeatherDetails
};
