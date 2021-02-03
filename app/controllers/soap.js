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
  const idpersona = req.params.idcarnet// '201105846'//  req.params.correlativo // req.params.correlativo
  const boleta_de_pago = req.params.boleta // '11029820' // req.params.boletapago
  console.log(idpersona)
  console.log(boleta_de_pago)
  var args = {
    pxml: `<CONSULTA_ORDEN>
        <ID_ORDEN_PAGO>${boleta_de_pago}</ID_ORDEN_PAGO>
        <ID_PERSONA>${idpersona}</ID_PERSONA>
    </CONSULTA_ORDEN>`
  }
  const client = await soap.createClientAsync('https://pruebassiif.usac.edu.gt/WSGeneracionOrdenPagoV2/WSGeneracionOrdenPagoV2SoapHttpPort?WSDL')
  const result = await client.consultaOrdenPagoAsync(args)
  // console.log(result[0].result)
  parseString(result[0].result, (err, result) => {
    console.dir(result.RESPUESTA)
    // console.log(result.CODIGO_RESP)
    var respuesta = JSON.stringify({
      CODIGO_RESP: result.RESPUESTA.CODIGO_RESP[0],
      DESCRIPCION: result.RESPUESTA.DESCRIPCION[0],
      id_orden_pago: result.RESPUESTA.ID_ORDEN_PAGO[0],
      monto: result.RESPUESTA.MONTO[0],
      fecha: result.RESPUESTA.FECHA_GENERACION[0],
      nombre: result.RESPUESTA.NOMBRE[0],
      ID_PERSONA: result.RESPUESTA.ID_PERSONA[0],
      STATUS: result.RESPUESTA.STATUS[0],
      BANCO: result.RESPUESTA.BANCO[0],
      NO_BOLETA_DEPOSITO: result.RESPUESTA.NO_BOLETA_DEPOSITO[0],
      NO_TRAN_BANCO: result.RESPUESTA.NO_TRAN_BANCO[0],
      FECHA_CERTIF_BANCO: result.RESPUESTA.FECHA_CERTIF_BANCO[0],
      UNIDAD: result.RESPUESTA.UNIDAD[0],
      EXTENSION: result.RESPUESTA.EXTENSION[0],
      CARRERA: result.RESPUESTA.CARRERA[0]
    })
    res.json(respuesta)
  })
}
