# adopets
Repositório criado para avaliação de projeto teste para Adopets


## Iniciar os containers do projeto

docker-compose up -d


## Parar e excluir os containers do projeto

docker-compose down -v --remove-orphans

# criar base de dados adopets no MongoDB e Postgres

# Para o Postgress, executar as migrations e seeders

yarn sequelize db:seed:all
yarn sequelize db:migrate
