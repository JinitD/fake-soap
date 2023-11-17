class SoapRequestBuilder {
  constructor(namespace, prefijo, soap) {
    this.namespace = namespace;//http://demo8229239.mockable.io/service/1
    this.prefijo = prefijo;//mio
    this.soap = soap; //http://schemas.xmlsoap.org/soap/envelope/
  }

  buildEnvelope(bodyContent) { // empaquetado del xml con interpolación con variables
    return `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="${this.soap}" xmlns:${this.prefijo}="${this.namespace}">
        <soap: Header />
            <soap:Body>
                ${bodyContent}
            </soap:Body>
        </soap:Envelope>`;
  }


  buildRequest(body) {//cuerpo del xml

    let request = `<${this.prefijo}:postUser>\n`;

    for (const key in body) {
      request += `\t\t\t\t\t<${key}>${body[key]}</${key}>\n`;
    }

    request += `\t\t\t\t</${this.prefijo}:postUser>`; //${func} por si se necesita que cambie la funcion
    
    return request;
  }


}

module.exports = SoapRequestBuilder;
