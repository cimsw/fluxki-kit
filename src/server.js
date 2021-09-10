require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const baixarArquivo = require('./api/arquivos/baixarArquivo');
const criarChamado = require('./api/chamados/criarChamado');
const responderChamadoComoCliente = require('./api/chamados/responderChamadoComoCliente');
const enviarArquivo = require('./api/arquivos/enviarArquivo');
const buscarOuCriarUsuario = require('./api/usuarios/buscarOuCriarUsuario');

const app = express();
app.use(bodyParser.json());

app.post('/chat', async (request, response) => {

    /**
     * @var {{
     *     id: number | string
     * }}
     */
    const chamado = request.body.chamado;

    /**
     * @var {{
     *     origem: number | string,
     *     anexos: {
     *      arquivo: {
     *          url_baixar: string,
     *          nome: string,
     *          extensao: string
     *      }
     *    }[]
     * }}
     */
    const resposta = request.body.resposta;

    /**
     * Verifica se a mensagem foi enviada pela API
     * @var {bool}
     */
    const respostaEnviadaAPI = resposta.origem == 4;

    // Ignora a reposta caso ela tenha sido enviada pela API
    if (respostaEnviadaAPI) {
        console.log('resposta ignorada');
        return response.json({ignored: true});
    }

    // baixar todos os anexos e salvar na pasta arquivos
    if (Array.isArray(resposta.anexos) && resposta.anexos.length) {
        const baixarArquivos = resposta.anexos.map((anexo) => {
            console.log('baixar anexo', anexo);
            const localParaSalvar = `./arquivos/baixados/${anexo.arquivo.nome}.${anexo.arquivo.extensao}`;
            return baixarArquivo(anexo.arquivo.url_baixar, localParaSalvar);
        })
        await Promise.all(baixarArquivos);
    }

    console.log('resposta recebida', resposta);
    response.json({ok: true});

})

app.post('/enviar-mensagem', async (request, response) => {

    const {nome, whatsapp, descricao} = request.body;
    const usuario = await buscarOuCriarUsuario('whatsapp', {
        nome,
        whatsapp,
        acesso_admin: 0,
        ativo: 1
    });

    let chamadoId = usuario.id_chamado_atual;
    if (!chamadoId) {
        const chamado = await criarChamado('Chat Whatsapp', usuario.id);
        chamadoId = chamado.id;
    }

    const respostaCriada = await responderChamadoComoCliente(chamadoId, usuario.id, descricao);
    response.json(respostaCriada);

})

app.post('/enviar-mensagem-anexo', async (request, response) => {

    const {nome, whatsapp, descricao} = request.body;
    const usuario = await buscarOuCriarUsuario('whatsapp', {
        nome,
        whatsapp,
        acesso_admin: 0,
        ativo: 1
    });

    let chamadoId = usuario.id_chamado_atual;
    if (!chamadoId) {
        const chamado = await criarChamado('Chat Whatsapp', usuario.id);
        chamadoId = chamado.id;
    }

    const arquivo = await enviarArquivo('./arquivos/enviar-arquivo.txt');
    const respostaCriada = await responderChamadoComoCliente(chamadoId, usuario.id, descricao, [arquivo.id]);
    response.json({respostaCriada, arquivo});

})

app.listen(3100, () => console.log('app rodando na porta 3100'))