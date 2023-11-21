import xml2js from "xml2js";
import { User } from "../model/User";

export class TransformBuilderXml {
  private namespace: string;
  private prefijo: string;
  private soap: string;

  constructor(namespace: string, prefijo: string, soap: string) {
    this.namespace = namespace; // http://demo8229239.mockable.io/service/1
    this.prefijo = prefijo; // sasf
    this.soap = soap; // http://schemas.xmlsoap.org/soap/envelope/
  }

  getResponseXml(xmlString, soapAction) {
    const colum = soapAction === "getUsers" ? "sasf:ListUser" : "sasf:response";
    const parser = new xml2js.Parser({ explicitArray: false });
    var json = {};
    parser.parseString(xmlString, (err, result) => {
      json = result["soapenv:Envelope"]["soapenv:Body"][colum];
    });

    return json; //lo que devuelve el xml pero parseado a json
  }

  buildXml(user: User): string {
    const soapEnvelope = {
      "soapenv:Envelope": {
        $: {
          "xmlns:soap": `${this.soap}`,
          "soapenv:encodingStyle": "http://www.w3.org/2001/12/soap-encoding",
        },
        "soapenv:Header": {},
        "soapenv:Body": {
          $: {
            "xmlns:sasf": `${this.namespace}`,
          },
          user,
        },
      },
    };
    const builder = new xml2js.Builder({
      headless: true,
      renderOpts: { pretty: true },
    });
    
    return builder.buildObject(soapEnvelope);
  }
}
