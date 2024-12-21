# Teste Técnico UEX - Asp Net PL
![image](https://github.com/user-attachments/assets/0b200a4e-0b93-430d-a982-90648b97a576)

Este projeto é um teste técnico desenvolvido para a empresa UEX, utilizando as tecnologias **TypeScript**, **NextJS**, **C# com .NET** e **PostgreSQL**. O projeto consiste em um aplicativo web que gerencia uma lista de contatos e oferece a funcionalidade de visualizar a localização dos contatos no mapa utilizando a API do **Google Maps**.

Gostaria de agradecer à UEX pela oportunidade de realizar este projeto.

## Requisitos

- **Back-End** em **ASP.NET**.
- **Banco de Dados Relacional** (**PostgreSQL**).
- Funcionalidades de **Cadastro e Login**.
- **Persistência de Dados**.
- **Exclusão de conta própria**.
- Gerenciamento da **lista de contatos**.
- **Pesquisa de endereços** para facilitar o cadastro de contatos.
- **Pins** no mapa representando a localização dos contatos.
- **Assistência de preenchimento** para facilitar o cadastro.

Todos os requisitos foram atendidos, mas devido ao curto prazo de dois dias, algumas funcionalidades ficaram de fora, como:

- **Edição** e **exclusão de dados** de contatos.
- **Testes técnicos profundos**.
- **Refatoração de código** mais detalhada.

## Links do Projeto

- **Front-End GitHub**: [Link do Front-End](https://github.com/Mateuscruz19/uex-teste-tecnico-frontend)
- **Back-End GitHub**: [Link do Back-End](https://github.com/Mateuscruz19/uex-teste-tecnico-backend)

## Tecnologias Utilizadas

### Front-End
- **TypeScript**
- **React**
- **NextJS**
- **Material Design V3**
- **MUI**
- **Google Maps API**

### Back-End
- **C#**
- **.NET**
- **BCrypt**
- **JWT (JSON Web Token)**
- **Moq**
- **Npgsql**
- **Swashbuckle**
- **xUnit**

## Tutorial de Instalação - Front-End

1. Instale as dependências:
   ```bash
   npm install
2. Execute o programa com
   npm start
3. O link e porta padrão geralmente são: [http://localhost:3000/](http://localhost:3000/).

4. **Variáveis de ambiente (ENVs):**
```json
- **NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=**
- **NEXT_PUBLIC_API_URL=**
```
Exemplo de configuração:NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=SuaChaveAPI NEXT_PUBLIC_API_URL=http://localhost:5160

---

- **Link do projeto Back-End**: [Link do Back-End](https://github.com/Mateuscruz19/uex-teste-tecnico-backend)

### Tecnologias utilizadas:
- **C#**
- **.NET**
- **BCrypt**
- **JWT**
- **Moq**
- **Npgsql**
- **Swashbuckle**
- **xUnit**

### Tutorial de instalação:

- O banco de dados instalado e o **PostgreSQL** devem estar presentes em sua máquina.

1. Instale o **Npgsql** para .NET:
   dotnet add package Npgsql

2. Instale o **Entity Framework Core**:
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

3. Configure a string de conexão em `appsettings.json`:
 ```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Username=postgres;Password=suasenha;Database=nomedobanco"
  }
}
 ```

Crie a migration:
dotnet ef migrations add InitialCreate

Aplique a migration para criar as tabelas no banco:
dotnet ef database update

Inicie o projeto:
dotnet run

A porta padrão para o app será: http://localhost:5160

Swagger estará disponível ao acessar a URL no Google.

### Jornada do Usuário

![image](https://github.com/user-attachments/assets/d752d2b7-0230-49b9-8aef-b7a75f5def8f)

Após a tela de boas-vindas, o usuário terá a opção de cadastro.
Requisitos para o email:
Deve estar em formato válido, ex: exemplo@dominio.com.
Requisitos para a senha:
Pelo menos 8 caracteres, incluindo:
1 letra maiúscula
1 letra minúscula
1 número
1 caractere especial (ex: @, #, $, %)
A senha que utilizei para testes foi: 1245678Aa!

Rota API: https://localhost:5160/api/user/register

# Objeto:

```json
{ 
  "fullName": "João Silva",
  "email": "joao.silva@example.com",
  "password": "Senha@1234"
}
```

![image](https://github.com/user-attachments/assets/eb45e44d-a79d-4e36-bcb9-f55d3318a2de)

Após o registro, o usuário é redirecionado para a página de login, onde deverá preencher o email e a senha, com os mesmos requisitos do registro.
Rota API: https://localhost:5160/api/user/login

Objeto API:

```json

{
  "email": "teste@gmail.com",
  "password": "1245678Aa!"
}
```

![image](https://github.com/user-attachments/assets/2b0fcd0e-b5f6-4fcf-a9ce-2bd4f8a3d691)

Após o login, o usuário é redirecionado para a área principal do projeto, onde é possível visualizar no mapa os contatos cadastrados. Esta área é protegida e limitada a usuários autenticados. Todas as chamadas de API são protegidas pelo Token JWT, sendo necessárias passá-lo com Bearer Authentication nas chamadas.
Rota para adição de novos contatos: https://localhost:5160/api/contact

**Formato do Objeto**:

```json
{
  "Name": "João Silva",                // Nome completo
  "Cpf": "987.654.321-00",              // CPF fictício (formato: XXX.XXX.XXX-XX)
  "Phone": "+55 11 99876-5432",         // Telefone fictício (formato internacional)
  "Street": "Avenida das Palmeiras",    // Rua fictícia
  "Number": "123",                      // Número da residência fictício
  "Neighborhood": "Jardim das Flores",  // Bairro fictício
  "City": "São Paulo",                  // Cidade fictícia
  "State": "SP",                        // Estado fictício
  "Latitude": "-23.550520",             // Latitude fictícia
  "Longitude": "-46.633308"             // Longitude fictícia
}
```

Também é possível excluir sua conta ou excluir seus próprios contatos.
Rota de Delete de Conta: http://localhost:5160/api/user/delete-account
Rota de Delete de Contato: https://localhost:5160/api/contact/ID (onde ID é o identificador do contato a ser excluído).

