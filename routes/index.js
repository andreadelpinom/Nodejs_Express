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

router.get('/photos/add', function(req, res, next) {
  res.render('fotos_formulario', { title: 'Express' });
});

router.post('/photos/save', async function(req, res, next) {
  let { title, description, rate } = req.body;
  
  const URL = 'http://localhost:4444/rest/fotos/save';
  
  let data = {
      titulo: title,
      descripcion: description,
      calificacion: parseFloat(rate),  // Asegurarse de que 'rate' sea un número
      ruta: ''
  };
  
  const config = {
      proxy: {
          host: 'localhost',
          port: 4444
      }
  };
  
  try {
      const response = await axios.post(URL, data, config);
      
      // Verifica si la respuesta tiene un estado 200
      if (response.status === 200 && response.statusText === 'OK') {
          res.redirect('/photos');
      } else {
          res.redirect('/');
      }
  } catch (error) {
      console.error("Error al hacer la petición:", error.message);
      res.redirect('/');  // En caso de error, redirige a la página de inicio
  }
});
  

// Exportamos el router correctamente
module.exports = router;
