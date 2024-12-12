WeatherAppBackend

Node server which makes calls to MongoDB and Tomorrow.io API used for the WeatherApp.
Features

    Fetch weather data from Tomorrow.io API
    Store and retrieve weather data from MongoDB
    Provide weather data to frontend applications via APIs

Setup and Installation

    Clone the repository:
    sh

git clone https://github.com/harshalborhade/weatherAppBackend.git
cd weatherAppBackend

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory and add the following:
Code

MONGODB_URI=your_mongodb_uri
TOMORROW_API_KEY=your_tomorrow_api_key

Run the server:

npm start

Usage

    To start the server, use npm start.
    The server will be running on http://localhost:8000.

Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.
