const express = require('express');
const app = express();
const path = require('path');
const lambda = require('../lambda/index')
const port = 3000;


app.use(express.json());

// Ruta de ejemplo
app.post('/soap', async (req, res) => {
  console.log(req.body)
  const message = await lambda.getRequest(req.body);
  res.json(message);
});

//pulbic
app.use(express.static(path.join(__dirname, 'js')))


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});