const fluxkiApi = require('../index');

/**
 *
 * @param {'whatsapp' | 'email' | 'telefone'} referencia
 * @param {{nome: string, usuario?: string, senha?: string, whatsapp?: string, email?: string, telefone?: string, ativo: 0 | 1, acesso_admin: 0 | 1}} dados
 * @return {Promise<{id: number, id_chamado_atual: number | null}>}
 */
module.exports = async function buscarOuCriarUsuario(referencia, dados) {
    const resposta = await fluxkiApi.post(`usuarios/sincronizar/${referencia}`, dados);
    return resposta.data;
}