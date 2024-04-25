const express= require('express');
const router= express.Router();
const apiService=require('../service/apiService.js');

router.get('/weather/:city',async(req,res)=>{
    const city= req.params.city;
    const weatherData= await apiService.getWeather(city);
    res.json(weatherData);
});
router.get('/image/:city', async(req,res)=>{
    const city=req.params.city;
    const imageData= await apiService.getImage(city);
    res.json(imageData);
});

module.exports = router;