#!/bin/bash

# Fechando o serviço Docker API
# echo "Fechando o serviço Docker API 'docker stop lock-manager-api'."
# docker stop lock-manager-api &> /dev/null

# Função para verificar se o banco de dados está disponível
check_db() {
    # Substitua "endereco_do_banco_de_dados" pelo endereço do seu banco de dados na rede local
    if ping -c 1 172.19.0.2 &> /dev/null; then
        return 0 # Banco de dados está disponível
    else
        return 1 # Banco de dados não está disponível
    fi
}

# Loop enquanto o banco de dados não estiver disponível
while ! check_db; do
    echo "Banco de dados não encontrado. Tentando novamente em 5 segundos..."
    sleep 5
done

# Se o banco de dados for encontrado, iniciar o serviço Docker e executar npm
echo "Banco de dados encontrado. Iniciando o serviço Docker API 'docker start lock-manager-api'."
docker start lock-manager-api

echo "Executando 'npm run deploy'."
npm run deploy &
npm start &
