#!/bin/sh

# Imprime todas as variáveis de ambiente (opcional, pode ser removido)
echo "Current environment variables:"
env

# Espera até o MySQL estar pronto
until mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1"; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing seed command"

# Executa o script de seed do package.json
npm run seed

>&2 echo "Seed script executed - starting the application"
exec "$@"
