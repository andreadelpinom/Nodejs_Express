var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET photos page. */
router.get('/photos', async function(req, res) {
  try {
    const URL = 'https://dawm-fiec-espol-default-rtdb.firebaseio.com/photos.json';
    const response = await axios.get(URL);
    res.render('fotos', { title: 'Fotos', fotos: response.data });
  } catch (error) {
    console.error('Error obteniendo fotos:', error);
    res.status(500).send('Error obteniendo fotos');
  }
});

// Exportamos el router correctamente
module.exports = router;
