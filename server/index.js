const express = require('express');
const app = express();
const path = require('path');
const lambda = require('../lambda/index')
const port = 8000;


app.use(express.json());

// Ruta de ejemplo
app.post('/addUser', async (req, res) => {
  const respose = await lambda.getRequest(req.body, "postUser");
  res.status(respose.status)
  res.json(respose.data);
});

app.get('/listUser', async (req, res) => {
  const respose = await lambda.getRequest(req.body, "getUsers");
  res.status(respose.status)
  res.json(respose.data);
});

//pulbic
app.use(express.static(path.join(__dirname, 'js')))


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});