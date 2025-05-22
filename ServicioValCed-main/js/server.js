const express = require('express');
const cors = require('cors');
const validarCedulaDominicana = require('./validarCedula');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/validar-cedula', (req, res) => {
  const { cedula } = req.body; 

  if (!cedula) {
    return res.status(400).json({ error: 'Por favor, proporciona una cédula.' });
  }

  const esValida = validarCedulaDominicana(cedula);

  if (cedula.length !== 11) {
    return res.status(400).json({ error: 'La cédula debe tener 11 dígitos.' });
  }
  if (esValida) {
    const digitoValidador = parseInt(cedula[10]);
    res.json({ mensaje: `La cédula ${cedula} es correcta. Dígito validador es: ${digitoValidador}`, valida: true });
  } else {
    res.status(400).json({ error: `La cédula ${cedula} es incorrecta.`, valida: false });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});