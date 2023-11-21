import fetch from "node-fetch";
import { global } from "../env/env.config";
import { TransformBuilderXml } from "../layout/TransformBuilderXml";
import { User } from "../model/User";

const soapBuilder: TransformBuilderXml = new TransformBuilderXml(
  global.soapNamespace,
  global.prefijo,
  global.soapSchema
);

export const getRequest = async (event: User, context: any) => {
  let xmlParser = "";
  try {
    const soapAction = context;
    const json = event;

    if (json != null && soapAction == "postUser") {
      xmlParser = createByPlantilla(json);
    }

    return sendRequest(xmlParser, soapAction);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error en este procesos: ${error}`,
      }),
    };
  }
};

function createByPlantilla(body: User) {
  return this.soapBuilder.buildXml(body);
}

async function sendRequest(xml: string, soapAction: string) {
  const postUserOptions = {
    method: "POST",
    body: xml,
    headers: {
      "Content-Type": "text/xml;charset=UTF-8",
      SOAPAction: `${soapAction}`,
    },
  };

  try {
    const response = await fetch(global.url, postUserOptions);
    const responseText = await response.text();
    const data = this.soapBuilder.getResponseXml(responseText, soapAction);
    return { data, status: 200 };
  } catch (error) {
    const data = {
      message: `Error al ejecutar la operacion sendRequest : ${error}`,
    };
    return {
      data,
      status: 500,
    };
  }
}
