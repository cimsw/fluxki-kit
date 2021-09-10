const fluxkiApi = require('../index');

/**
 * Responder um chamado em nome do um cliente
 * @param {number} idChamado
 * @param {number} idUsuarioCliente
 * @param {string} descricao
 * @param {number[]} arquivos
 * @return {Promise<{}>}
 */
module.exports = async function responderChamadoComoCliente(idChamado, idUsuarioCliente, descricao, arquivos = []) {
    const postData = {
        id_usuario: idUsuarioCliente,
        id_chamado: idChamado,
        // 4 para informar que a origem é da API
        origem: 4,
        // 0 para resposta pública 1 para resposta privada
        tipo: 0,
        ativo: 1,
        descricao,
        arquivos
    }
    const response = await fluxkiApi.post('chamados_respostas/gravar/como-cliente', postData);
    return response.data;
}