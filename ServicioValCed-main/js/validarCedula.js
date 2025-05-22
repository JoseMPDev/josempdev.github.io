function validarCedulaDominicana(cedula) {
  if (!cedula || cedula.length !== 11 || !/^\d+$/.test(cedula)) {
    return false; // Cédula incorrecta por formato
  }

  let sumapar = 0;
  let sumainp = 0;
  let digitoValidador = parseInt(cedula[10]);

  for (let i = 1; i < cedula.length - 1; i += 2) {
    let multi = parseInt(cedula[i]) * 2;
    sumapar += (multi > 9) ? (multi - 9) : multi;
  }

  for (let i = 0; i < cedula.length - 1; i += 2) {
    sumainp += parseInt(cedula[i]);
  }

  let totalS = (sumapar + sumainp) % 10;

  return (totalS === 0 || (10 - totalS) === digitoValidador);
}

module.exports = validarCedulaDominicana;