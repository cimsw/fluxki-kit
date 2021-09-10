const FormData = require("form-data");
const {createReadStream} = require("fs");

const fluxkiApi = require('../index');
const fluxkiApiToken = process.env.FLUXKI_API_TOKEN;

/**
 * Enviar um arquivo
 * @param {string} caminho
 * @return {Promise<{id: number}>}
 */
module.exports = async function enviarArquivo(caminho) {

    const form = new FormData();
    form.append('arquivo', createReadStream(caminho));

    const resposta = await fluxkiApi.post('arquivos/gravar/upload', form, {
        headers: {
            ...form.getHeaders(),
            authorization: fluxkiApiToken
        }
    });

    return resposta.data.original;

}