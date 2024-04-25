'use strict';
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const apiKeyTime = process.env.OPENWEATHER_API_KEY;
const apiKeyIMG = process.env.UNSPLASH_API_KEY;

app.use(express.static(path.join(__dirname,'..','client', '/')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..','client', 'index.html'));
});
app.get('/weather/:city', async(req,res)=>{
  const city= req.params.city;
  const fetch = await import('node-fetch');
  const apiWeatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeyTime}&lang=pt_br`;
  try{
    const response= await fetch.default(apiWeatherURL);
    const data=await response.json();
    res.json(data);
  }catch(error){
    console.error('Erro ao obter dados climaticos', error);
    res.status(500).json({error:'Erro ao obter dados climaticos'});
  }
});
app.get('/image/:city', async(req,res)=>{
  const city =req.params.city;
  const fetch = await import('node-fetch');
  const apiImageURL=`https://api.unsplash.com/photos/random?query=${city}&client_id=${apiKeyIMG}`;
  try{
    const response= await fetch.default(apiImageURL);
    const data= await response.json();
    res.json(data);
  }catch(error){
    console.error('Erro ao buscar imagem');
    res.status(500).json({error:'Erro ao buscar imagem'});
  }
});

