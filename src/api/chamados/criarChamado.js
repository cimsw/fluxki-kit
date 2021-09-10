const fluxkiApi = require('../index');

/**
 *
 * @param {string} assunto
 * @param {number} idUsuarioCliente
 * @param {0|1} modoChat
 * @return {Promise<{}>}
 */
module.exports = async function criarChamado(assunto, idUsuarioCliente, modoChat = 1) {
    const post = {
        id_usuario: idUsuarioCliente,
        id_usuario_solicitante: idUsuarioCliente,
        id_setor: 1,
        nome: assunto,
        modo_chat: modoChat,
        origem: 4,
        ativo: 1,
    }
    const resposta = await fluxkiApi.post('chamados/gravar', post);
    return resposta.data;
}