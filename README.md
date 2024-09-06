# Documentação da API

## Visão Geral

Esta API permite o gerenciamento multiplos de dispositivos de leitura facial da Control ID e pelo cadastro de usuários nesses dispositivos. A API permite o cadastros de novos dispositivos, o registro de novos usuarios, horarios e departamentos.

Documentação Oficial do equipamento utilziado para criação desta API: https://www.controlid.com.br/docs/access-api-pt/

Abaixo está uma descrição detalhada de cada rota disponível, os dados esperados e as respostas possíveis.

#

# Download

### Docker
- **Pre requisitos**
  - Docker
  - Docker-compose
  - git
  
#### 1. Baixar o projeto do Git Hub  
    gh repo clone joao-victorr/LockManager
#### 2. Atualize o arquivo .env
  Na raiz do projeto edite o arquivo .env, conferme sua necessidade.
#### 3. Executar o Docker-compose 
    docker-compose up -d

### NodeJs
- **Pre requisitos**
  - NodeJs Versão minima 18
  - npm versão minima 8.5.0
  - Banco de Dados Mysql versão minima 8.0
  - git
#### 1. Baixar o projeto do Git Hub  
    gh repo clone joao-victorr/LockManager
#### 2. Crie o arquivo .env
##### Entre na pasta api e crie o arquivo .env.
  ```Env
    # URL de acesso ao Banco de Dados
    DATABASE_URL="mysql://{youuser}:{youpassword}@{DB_ADDRESS:3306}/{db_name}"

    # Porta em que irá rodar a aplicação
    PORT=3000

    # Chave secreta de criptografio do JWT
    JWT_SECRE= SeuHash
  ```

#### 3. Instalar pacotes do Node
    npm install

#### 4. Buildar o Tyescript
    npm run build

#### 5. Iniciar à aplicação
    npm run prod

# Endpoints

### Login e Autenticação

#### 1. Login

- **POST `/login`**
  - **Descrição**: Autentica o usuário utilizando e-mail e senha.
  - **Body**:
    ```json
    {
      "email": "usuario@exemplo.com",
      "password": "senha123"
    }
    ```
  - **Respostas**:
    - **200 OK**: Retorna o usuário autenticado e um token JWT.
      ```json
      {
        "user": {
          "id": "user_id",
          "name": "user_name",
          "email": "usuario@exemplo.com",
        },
        "token": "jwt_token"
      }
      ```
    - **400 Bad Request**: E-mail ou senha não fornecidos.
      ```json
      {
        "error": "Dados Não Encontrados"
      }
      ```
    - **401 Unauthorized**: E-mail ou senha incorretos.
      ```json
      {
        "error": "E-mail ou senha incorretos"
      }
      ```

#### 2. Token
- **GET `/token`**
  - **Descrição**: Retorna informações sobre o usuário autenticado.
  - **Heander**: Requer `Authorization: Bearer jwt_token`.
  - **Respostas**:
    - **200 OK**: Retorna informações do usuário.
      ```json
      {
        "user": {
          "id": "user_id",
          "email": "usuario@exemplo.com",
        }
      }
      ```
    - **401 Unauthorized**: Token inválido ou não fornecido.
      ```json
      {
        "error": "Não Autorizado"
      }
      ```

### Gerenciamento de Dispositivos (Locks)

As rotas a seguir são usadas para gerenciar dispositivos de leitura facial da Control ID.

#### 1. Listar Dispositivos

- **GET `/locks`**
  - **Descrição**: Retorna uma lista de todos os dispositivos de leitura facial com todos os departamentos e usuarios cadastrados em cada dispositivo.
  - **Cabeçalhos**: Requer `Authorization: Bearer jwt_token`.
  - **Respostas**:
    - **200 OK**:
      ```json
      [
        {
          "id": "Device_id",
          "name": "Device 1",
          "GroupsLocks": [{
            "id": "Gruop_id",
            "code": "Gruop_code",
            "Gruop": "Gruop_name"
          }],
          "UsersLocks": [{
            "id": "User_id",
            "code": "User_code",
            "Gruop": "User_name"
          }]
        },
        {
          "id": "Device_id",
          "name": "Device 2",
        }
      ]
      ```
    - **401 Unauthorized**: Token inválido ou não fornecido.
      ```json
      {
        "error": "Não Autorizado"
      }
      ```

#### 2. Registrar um Novo Dispositivo

- **POST `/locks`**
  - **Descrição**: Registra um novo dispositivo de leitura facial no sistema.
  - **Cabeçalhos**: Requer `Authorization: Bearer jwt_token`.
  - **Corpo da Requisição**:
    ```json
    {
      "name": "Device_name",
      "ip": "IP_ADDRESS",
      "user": "User",
      "password": "Password"
    }
    ```
  - **Respostas**:
    - **201 Created**: Dispositivo registrado com sucesso.
      ```json
      {
        "name": "Device_name",
        "ip": "IP_ADDRESS",
      }
      ```
    - **400 Bad Request**: Dados de entrada inválidos ou incompletos.
      ```json
      {
        "error": "Dados de entrada inválidos"
      }
      ```
    - **401 Unauthorized**: Token inválido ou não fornecido.
      ```json
      {
        "error": "Não Autorizado"
      }
      ```


#### 3. Em breve      
<!-- 
#### 3. Atualizar Informações de um Dispositivo

- **PUT `/locks/:id`**
  - **Descrição**: Atualiza as informações de um dispositivo existente.
  - **Cabeçalhos**: Requer `Authorization: Bearer jwt_token`.
  - **Parâmetros de URL**: `id` (ID do dispositivo a ser atualizado).
  - **Corpo da Requisição**:
    ```json
    {
      "name": "Dispositivo Atualizado",
      "location": "Nova Localização",
      "ip_address": "192.168.0.2"
    }
    ```
  - **Respostas**:
    - **200 OK**: Dispositivo atualizado com sucesso.
      ```json
      {
        "id": "device_id",
        "name": "Dispositivo Atualizado",
        "location": "Nova Localização",
        "ip_address": "192.168.0.2",
        "status": "active"
      }
      ```
    - **400 Bad Request**: Dados de entrada inválidos ou incompletos.
      ```json
      {
        "error": "Dados de entrada inválidos"
      }
      ```
    - **401 Unauthorized**: Token inválido ou não fornecido.
      ```json
      {
        "error": "Não Autorizado"
      }
      ```
    - **404 Not Found**: Dispositivo não encontrado.
      ```json
      {
        "error": "Dispositivo não encontrado"
      }
      ``` -->

#### 4. Excluir um Dispositivo

- **DELETE `/locks`**
  - **Descrição**: Exclui um dispositivo do sistema.
  -  **Cabeçalhos**: Requer `Authorization: Bearer jwt_token`.
  - **Corpo da Requisição**:
    ```json
    {
      "id": "Device_id"
    }
    ```
  - **Respostas**:
    - **200 OK**: Dispositivo excluído com sucesso.
      ```json
      {
        "message": "Dispositivo excluído com sucesso"
      }
      ```
    - **401 Unauthorized**: Token inválido ou não fornecido.
      ```json
      {
        "error": "Não Autorizado"
      }
      ```
    - **404 Not Found**: Dispositivo não encontrado.
      ```json
      {
        "error": "Dispositivo não encontrado"
      }
      ```
      **400 Not Found**: Dispositivo não pôde ser apagado.
      ```json
      {
        "error": "Ainda há registro no dispositivo."
      }
      ```

### Notas

- Todos os endpoints que requerem autenticação utilizam tokens JWT. Certifique-se de incluir o token no cabeçalho `Authorization` para rotas protegidas.


### A ser continuado...

Endpoints adicionais e informações detalhadas serão adicionados aqui conforme mais controladores forem analisados.

## Notas

- Todos os endpoints que requerem autenticação utilizam tokens JWT. Certifique-se de incluir o token no cabeçalho `Authorization` para rotas protegidas.
- Para funcionalidades completas e integração, consulte o código-fonte da API e as instruções de configuração.