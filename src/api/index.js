const axios = require("axios");
const fluxkiApiToken = process.env.FLUXKI_API_TOKEN;
const fluxkiApi = axios.create({
    baseURL: process.env.FLUXKI_API_URL,
    headers: {
        authorization: fluxkiApiToken
    }
})

module.exports = fluxkiApi;