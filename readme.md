# API para integração com o Fluxki

Este é um pequeno exemplo de como se comunicar com o [fluxki](https://www.fluxki.com.br) utilizando a API e os gatilhos.

Com este exemplo você poderá criar chatbots ou se conectar com outros aplicativos de chat que não estão disponíveis de forma nativa dentro do Fluxki.

## Instalação

### Instalar as dependências

Instale as dependências com o `npm install`

### Configurações 

Crie uma cópia do arquivo `.env.example` para o arquivo `.env`

Neste arquivo você vai precisar configurar a URL da API do fluxki e o token. Normalmente a URL da API é a mesma do seu fluxki seguida de `/api/`

No exemplo abaixo o endereço https://demonstracao.fluxki.com.br

```
FLUXKI_API_URL=https://demonstracao.fluxki.com.br/api/
```

### Criando um token para a API

Para gerar um token siga do seguinte artigo explicando [como criar um token de autenticação para a API do Fluxki](https://suporte.cimsw.com.br/bc/autenticao/209)

Certifique-se de liberar as permissões apenas para os módulos necessários. Para este exemplo será necessário apenas as seguintes permissões:

* Editar usuários
* Gravar chamados
* Gravar respostas dos chamados
* Gravar e Visualizar arquivos

Após criar o token configure o arquivo .env conforme o exemplo abaixo:

```
FLUXKI_API_TOKEN=seu token aqui
```

## Executar

Este exemplo irá criar um pequeno servidor web com 3 rotas. Para iniciar este servidor execute o seguinte comando na pasta do projeto:

``` bash
npm run start
```