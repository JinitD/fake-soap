const env = require('../env/env.conf')
const xmlResponseTransform = require('../layout/xmlResponseTransform')


async function getRequest(body) {
    const xml = creteByPlantilla(body);
    const response = await sendRequest(xml);
    return response;

}

function creteByPlantilla(body) {
    const SoapRequestBuilder = require('../layout/SoapRequestBuild');
    const soapBuilder = new SoapRequestBuilder(env.global.soapNamespace, env.global.prefijo, env.global.soapSchema);
    const xmlRequest = soapBuilder.buildEnvelope(soapBuilder.buildRequest(body));
    return xmlRequest;
}

async function sendRequest(xml) {
    console.log("\n",xml,"\n")
    const postUserOptions = {
        method: 'POST',
        body: xml,
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'postUser',
            //	GetUserInfo PostUser
        },
    };

    try {
        const response = await fetch(env.global.url, postUserOptions);
        const responseText = await response.text();
        return xmlResponseTransform.getResponseXml(responseText);
    } catch (error) {
        return { message: `Error al ejecutar la operacion : ${error}` }; // o manejar el error según sea necesario
    }

}



module.exports = {
    'getRequest': getRequest
}




