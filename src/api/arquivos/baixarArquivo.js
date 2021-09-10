const {createWriteStream} = require("fs");
const axios = require("axios");

const fluxkiApiToken = process.env.FLUXKI_API_TOKEN;

/**
 * Baixar um arquivo e salvar na pasta desejada
 * @param {string} url
 * @param {string} caminho
 */
module.exports = async function baixarArquivo(url, caminho) {

    const writer = createWriteStream(caminho);

    const {data} = await axios({
        url,
        method: "GET",
        responseType: "stream",
        headers: {
            Authorization: fluxkiApiToken
        }
    })

    return new Promise((resolve, reject) => {
        data.pipe(writer);
        let error = null;
        writer.on('error', err => {
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                resolve(true);
            }
        });
    });

}