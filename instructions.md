# Guia para rodar a aplicação.

- Para iniciar a aplicação é necessário possui o Docker e docker-compose instalado em sua máquina.

- Guia ubuntu: https://docs.docker.com/engine/install/ubuntu/
- Guia Windows: https://docs.docker.com/desktop/install/windows-install/

# Rodando a aplicação.

A aplicação será iniciada ao rodar o comando:
```bash
docker compose -f docker-compose.dev.yml up
```
ou

```bash
npm run start
```

Serão criados 6 containers.
- Kafka (localhost:9091) 
- KafDrop (localhost:9000) Ideal para conferir a criação dos tópicos
- Init-Kafka - utilizado para iniciar os tópicos dinamicamente.
- Zookeper - dependência do Kafka
- Growth-core - Backend NestJS
- Database - Banco postgres

O backend possui 3 controllers:

* CustomerController
* OpportunityController
* CartController


## Fluxo da aplicação
Cada controller possui um arquivo de mesmo nome com extensão .http para ser utilizado usando a extensão REST Client do VSCODE, caso não possua a extensão ou o VSCode basta utilizar Postman ou Imsonia para realizar as chamadas http.

O fluxo é, ao enviar o DTO de um carrinho a rota /save/abandoned com uma requisição POST para o core, será chamado o CartService identificando as informações do carrinho, em uma aplicação real seria utilizado o id do carrinho para buscar o mesmo no Repository, em nosso caso as informações são inseridas hardcoded.

Após pegar as informações do carrinho será enviada uma mensagem com o DTO do carrinho via kafka no tópico cart-abandoned. A mensagem será processada pelo OpportunityService, salvando uma oportunidade no banco.