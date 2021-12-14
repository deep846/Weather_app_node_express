const express = require('express');
const https = require("https");
const bodypr = require("body-parser");
const app = express();

app.use(bodypr.urlencoded({ extended: true }));

app.listen(5000, function () {
    console.log('Port is open in http://localhost:5000');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function (req, res) {
    const cityname = req.body.cityname;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=29a3c6e4e081b60c8d5f57a2a9dd4766&units=metric`;
    https.get(url, function (response) {
        if (response.statusCode === 200) {
            console.log(response.statusCode);
            response.on("data", function (data) {
                const weatherdata = JSON.parse(data);
                const temp = weatherdata.main.temp;
                const weatherdes = weatherdata.weather[0].description;
                const weathericon = `http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`
                res.write("<h1>The temp in " + weatherdata.name + " is " + temp + " degree celsious<h2>")
                res.write("<p> The weather in " + weatherdata.name + " is " + weatherdes + " </p>")
                res.write(`<img src='${weathericon}' alt='weatherIcon'>`);
                res.send();
            });
        }
        else {
            res.send("Your type wrong city name");
        }
    });
});