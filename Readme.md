## O que preciso fazer para rodar o projeto?

### Backend

Utilizando o Node, será necessário seguir as seguintes etapas:

1. Instalar o NodeJs na sua máquina.

2. Configurar as variáveis de ambiente no arquivo .env do projeto:

```sh
## Server
PORT=3000
APP_URL=http://localhost:3000
PRODUCT_UPLOAD_PATH=public/uploads/product
FRONTEND_URL=http://localhost:4200

## Database
PGHOST="localhost"
PGDATABASE="products"
PGUSER="postgres"
PGPASSWORD="postgres"
PGPORT=5432
```

3. Instalar as dependências, e executar o projeto:

```sh
npm install

npx run start:dev
```

### Frontend

Utilizando o Node, será necessário seguir a seguinte etapa:

1. Instalar as dependências, e executar o projeto:

```sh
npm install

npx run start
```

## Telas: 

![home](docs/img/home.png)

![management](docs/img/management.png)

![create-product](docs/img/create-product.png)

![view-product](docs/img/view-product.png)
![view-product](docs/img/view-product-extend.png)

![cart](docs/img/cart.png)

![not-found](docs/img/not-found.png)
