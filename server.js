const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const methodOverride = require("method-override");
const morgoan = require('morgan');

require('./config/database');

const Car = require('./models/car.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgoan('dev'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs')
});

app.post('/cars', async (req, res) => {
    
    await Car.create(req.body);
    
    res.redirect('/cars');
});

app.get('/cars', async (req, res) => {

    const cars = await Car.find();
    res.render('cars/index.ejs', {cars});
});

app.get('/cars/:carId', async (req, res) => {
    const car = await Car.findById(req.params.carId);
    res.render('cars/show.ejs', {car});
});

app.delete('/cars/:carId', async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId);
    res.redirect('/cars');
});

app.get('/cars/:carId/edit', async (req, res) => {
    const car = await Car.findById(req.params.carId);
    res.render('cars/edit.ejs', { car });
});

app.put('/cars/:carId', async (req, res) => {
    await Car.findByIdAndUpdate(req.params.carId, req.body);
    res.redirect(`/cars/${req.params.carId}`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});