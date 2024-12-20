# Sistema de Cadastro de Contatos
![image](https://github.com/user-attachments/assets/2c072745-5f11-4726-bc58-cde2094c111e)

## 📝 Descrição do Projeto

Este projeto é parte de um **teste técnico** para avaliação de habilidades de desenvolvimento utilizando **ASP.NET**. O sistema implementado é um gerenciador de contatos simples, com funcionalidades de cadastro, edição, exclusão e visualização de contatos, além de integração com as APIs **Via CEP** e **Google Maps**.

---
![image](https://github.com/user-attachments/assets/95f92b08-bca8-4b2e-bb89-600a0e1ae81d)
## 📋 Requisitos do Projeto

### Funcionalidades
- **Cadastro de Usuário**:
  - Registro único por e-mail.
  - Login e logout com autenticação segura.
  - Exclusão da conta do usuário, incluindo a remoção de todos os seus dados.

- **Gerenciamento de Contatos**:
  - Cadastro de contatos com:
    - Nome, CPF (validado e único), telefone, endereço completo com CEP e posição geográfica (latitude e longitude).
    - Validação automática do endereço com a API **Via CEP**.
    - Preenchimento automático de latitude e longitude utilizando a API **Google Maps**.
  - Listagem de contatos com:
    - Filtro por CPF ou nome.
    - Ordenação alfabética crescente.
    - Paginação configurada no frontend.
  - Edição e exclusão de contatos existentes.

- **Busca e Visualização**:
  - Pesquisa de contatos na lista.
  - Centralização e marcação no mapa (Google Maps) ao clicar em um contato.

---

![image](https://github.com/user-attachments/assets/9b9fabc0-8f8f-4a67-a42c-33a871409263)

## 🛠️ Tecnologias Utilizadas

- **Backend**:
  - Linguagem: C#.
  - Framework: ASP.NET.
  - Banco de Dados: Relacional (SQL Server, MySQL, ou outro).

- **Frontend**:
  - Framework ou Biblioteca: (React, Angular, ou similar).

- **Integrações**:
  - [Via CEP API](https://viacep.com.br/): Busca e validação de endereços.
  - [Google Maps API](https://developers.google.com/maps): Obtenção de latitude e longitude e visualização no mapa.

- **Outros**:
  - Controle de versão com GIT.
  - Documentação da API com Swagger ou Postman.

---
![image](https://github.com/user-attachments/assets/04877dda-8125-445a-991a-41bc2ca862c9)
## 🚀 Como Rodar o Projeto

### Pré-requisitos
1. **Ambiente de Desenvolvimento**:
   - .NET SDK instalado.
   - Banco de dados configurado.
   - API Key para Google Maps.

2. **Ferramentas**:
   - Git.
   - IDE (Visual Studio, Rider, ou outra de sua escolha).

### Passos
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>

![image](https://github.com/user-attachments/assets/2a46db8a-fbb8-4b7b-b795-6451e0377c79)
