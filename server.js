const express = require('express');
const path = require('path');

const app = express();

// Configurar Express para servir archivos estáticos desde la carpeta './app'
app.use(express.static(path.join(__dirname, 'app')));

// Definir una ruta básica
app.get('/', (req, res) => {
  // Redireccionar a index.html
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

// Configurar el Content-Type para archivos CSS
app.use(express.static(path.join(__dirname, 'app'), { 
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
