const env = require('../env/env.conf')
const xmlResponseTransform = require('../layout/xmlResponseTransform')

async function getRequest(jsonBody, soapAction) {
    let xmlParser = '';
    if (Object.keys(jsonBody).length !== 0 && body.constructor === Object) {
        xmlParser = creteByPlantilla(jsonBody);
    }
    return sendRequest(xmlParser, soapAction);
}

function creteByPlantilla(body) {
    const SoapRequestBuilder = require('../layout/SoapRequestBuild');
    const soapBuilder = new SoapRequestBuilder(env.global.soapNamespace, 
        env.global.prefijo, env.global.soapSchema);
    return soapBuilder.buildXml(body);
}

async function sendRequest(xml, soapAction) {
    const postUserOptions = {
        method: "POST",
        body: xml,
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': `${soapAction}`,
        },
    };

    try {
        const response = await fetch(env.global.url, postUserOptions);
        const responseText = await response.text();
        const data = xmlResponseTransform.getResponseXml(responseText, soapAction)
        return { data, status: 200 };
    } catch (error) {
        const data = { message: `Error al ejecutar la operacion sendRequest : ${error}` };
        return {
            data,
            status: 500
        };
    }

}



module.exports = {
    'getRequest': getRequest
}




