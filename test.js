//codigo que puede llegar a servir, pero no creo xd

function buildEnvelope(bodyContent) { // empaquetado del xml con interpolación con variables
    return `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="${this.soap}" xmlns:${this.prefijo}="${this.namespace}">
        <soap: Header />
            <soap:Body>
                ${bodyContent}
            </soap:Body>
        </soap:Envelope>`;
}


function buildRequest(body) {
    let request = `<${this.prefijo}:postUser>\n`;

    function buildXML(obj, prefix = '') {
        for (const key in obj) {
            const value = obj[key];
            if (typeof value === 'object') {
                request += `\t${prefix}<${key}>\n`;
                buildXML(value, `${prefix}\t`);
                request += `\t${prefix}</${key}>\n`;
            } else {
                request += `\t${prefix}<${key}>${value}</${key}>\n`;
            }
        }
    }

    buildXML(body, '\t\t\t\t\t');

    request += `\t\t\t\t</${this.prefijo}:postUser>`;
    return request;
}
