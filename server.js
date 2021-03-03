// express

// const, require
require('dotenv').config();
const express = require("express");
const serveStatic = require('serve-static');
const app = express();
const weather = require('./My-module/weather')
const port = process.env.PORT || 5000;
const key = process.env.WeatherK;
const www = process.env.openWeatherUrl;
// use
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(require("body-parser").json());
app.use(serveStatic('Public', { 'index': ['index.html', 'index.htm'] }))


// get
app.get('/w', async function(req, res){
  console.log(req.query.city)
  let openWeatherData = await weather.getWeather(`${www}?q=${req.query.city}&appId=${key}&lang=pl&units=metric`);
  res.json(openWeatherData);
})

// listen
app.listen(port, () => {
  console.log(`Dziłający port ${port}!`);
});


