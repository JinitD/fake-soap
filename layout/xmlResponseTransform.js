const xml2js = require('xml2js');
const parser = new xml2js.Parser();

function getResponseXml(xmlString) {
    console.log(xmlString)
    let json = {};
    parser.parseString(xmlString, (err, result) => {
        const body = result['soap:Envelope']['soap:Body'][0]['m:response'][0]['return'][0];
        Object.keys(body).forEach((key) => {
            const value = body[key];
            json[key] = value;
        });
    });

    return json; //lo que devuelve el xml pero paraseado a json
}

function convertToJSONObject(data) {// manera de como poder formatear la estrucutura del json - pendiente!
    if (Array.isArray(data)) {
        return data.map((item) => convertToJSONObject(item));
    } else if (typeof data === 'object') {
        const result = {};
        for (const key in data) {
            if (Array.isArray(data[key]) && data[key][0] instanceof Object) {
                result[key] = convertToJSONObject(data[key]);
            } else if (typeof data[key][0] === 'object') {
                result[key] = convertToJSONObject(data[key][0]);
            } else {
                result[key] = data[key][0];
            }
        }
        return result;
    }
    return data;
}

module.exports = {
    'getResponseXml': getResponseXml
}