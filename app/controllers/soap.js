var soap = require('soap')
const url = 'https://pruebassiif.usac.edu.gt/WSGeneracionOrdenPagoV2/WSGeneracionOrdenPagoV2SoapHttpPort?WSDL'
var parseString = require('xml2js').parseString

exports.generarBoleta = async (req, res) => {
  var carnet = req.body.carnet
  var unidad = req.body.unidad
  var extension = req.body.extension
  var carrera = req.body.carrera
  var nombre = req.body.nombre
  var monto = req.body.monto
  var aniotemporada = req.body.anio_temporada
  var idrubro = req.body.id_rubro
  var idvarianterubro = req.body.id_variante_rubro
  var subotal = req.body.subotal

  const args = {
    pxml: '<GENERAR_ORDEN>' +
              '<CARNET>' + carnet + '</CARNET>' +
              '<UNIDAD>' + unidad + '</UNIDAD>' +
              '<EXTENSION>' + extension + '</EXTENSION>' +
              '<CARRERA>' + carrera + '</CARRERA>' +
              '<NOMBRE>' + nombre + '</NOMBRE>' +
              '<MONTO>' + monto + '</MONTO>' +
              '<DETALLE_ORDEN_PAGO>' +
                  '<ANIO_TEMPORADA>' + aniotemporada + '</ANIO_TEMPORADA>' +
                  '<ID_RUBRO>' + idrubro + '</ID_RUBRO>' +
                  '<ID_VARIANTE_RUBRO>' + idvarianterubro + '</ID_VARIANTE_RUBRO>' +
                  '<SUBTOTAL>' + subotal + '</SUBTOTAL>' +
              '</DETALLE_ORDEN_PAGO>' +
            '</GENERAR_ORDEN>'
  }
  const client = await soap.createClientAsync(url)
  const result = await client.generarOrdenPagoAsync(args)
  // console.log(String(result[0].result).split('|'))
  // console.log(result[0].result)

  parseString(result[0].result, (err, result) => {
    console.dir(result.RESPUESTA)
    // console.log(result.CODIGO_RESP)
    var respuesta = JSON.stringify({
      codigo_resp: result.RESPUESTA.CODIGO_RESP[0],
      descripcion: result.RESPUESTA.DESCRIPCION[0],
      id_orden_pago: result.RESPUESTA.ID_ORDEN_PAGO[0],
      monto: result.RESPUESTA.MONTO[0],
      fecha: result.RESPUESTA.FECHA[0],
      checksum: result.RESPUESTA.CHECKSUM[0],
      rubro: result.RESPUESTA.RUBROPAGO[0],
      nombre: result.RESPUESTA.NOMBRE[0]
    })
    res.json(respuesta)
  })
}

exports.consultarBoleta = async (req, res) => {
  const correlativo = req.params.correlativo // req.params.correlativo
  const boleta_de_pago = req.params.boletapago // req.params.boletapago
  var args = {
    cadena: `<CONFIRMAPAGO_OV>
        <CORRELATIVO>${correlativo}</CORRELATIVO>
        <BOLETAPAGO>${boleta_de_pago}</BOLETAPAGO>
    </CONFIRMAPAGO_OV>`
  }
  const client = await soap.createClientAsync('http://www.usac.edu.gt/services/ov_chf/confirmapago_ov_chf.php?wsdl')
  const result = await client.verpago_ov_rtAsync(args)
  console.log(result[0].return.$value)
  const [encontrado, r_correlativo, param2, r_boleta_de_pago, status, banco, boleta_banco, fecha_pago, nombre, monto, fecha_generacion, param3] = result[0].return.$value.split('|')
  // res.json(result)
  const rsp = {
    pagado: !!parseInt(status || 0), // 0: no pagado, 1: pagado
    encontrado: encontrado == '1' ? true : encontrado == '2' ? false : false,
    correlativo,
    boleta_de_pago,
    boleta_banco,
    banco,
    fecha_generacion,
    fecha_pago,
    nombre,
    monto: parseFloat(monto),
    param2, // 0
    param3 // OV
  }
  res.json(rsp)
}
