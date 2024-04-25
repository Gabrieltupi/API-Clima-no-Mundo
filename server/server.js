'use strict';
const express = require('express');
const app = express();
const path = require('path');
const apiController=require('./controller/apiController.js');

app.use(express.static(path.join(__dirname,'..','client', '/')));
app.use('/', apiController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});

module.exports = app;