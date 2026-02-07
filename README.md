# 🏆 Baldin Platform

> **A plataforma de encontro da comunidade de TI. Conectando talentos, compartilhando conhecimento, eventos, notícias e encontrando oportunidades.**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Kleyam/Baldin)
[![Node Version](https://img.shields.io/badge/node-LTS-brightgreen)](https://nodejs.org/)
[![Python Version](https://img.shields.io/badge/python-3.13+-blue)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/docker-ready-2496ED)](https://docker.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📑 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Guia de Instalação](#guia-de-instalação)
- [Verificação da Instalação](#verificação-da-instalação)
- [Desenvolvimento Diário](#desenvolvimento-diário)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Stack Tecnológico](#stack-tecnológico)
- [Contribuindo](#contribuindo)

---

## 🎯 Visão Geral

O **Baldin** é um ecossistema digital que funciona como um **monorepo**, onde o código backend (API Python) e frontend (SPA Next.js) vivem no mesmo repositório, permitindo sincronização perfeita entre as equipes.

### Características Principais

- 🚀 **Arquitetura Assíncrona**: FastAPI com async/await para máxima performance
- 🐘 **PostgreSQL com Pool Async**: Conexões otimizadas com asyncpg
- 🐳 **Docker Compose**: Ambiente padronizado e reproduzível
- 📦 **Monorepo**: Backend e Frontend sincronizados
- 🔐 **Segurança Enterprise**: Gerenciamento de secrets, validação de env vars
- 🔄 **Migrations Automáticas**: Alembic para versionamento de schema

---

## 🏗️ Arquitetura

```
Baldin (Monorepo)
├── backend/                 # API Python - FastAPI + PostgreSQL
│   ├── src/
│   │   ├── core/           # Configurações, database, settings
│   │   ├── models/         # ORM Models (SQLAlchemy)
│   │   ├── schemas/        # Pydantic Schemas (validação)
│   │   ├── api/            # Routers (endpoints)
│   │   └── main.py         # FastAPI app
│   ├── alembic/            # Migrations database
│   ├── Dockerfile          # Build image backend
│   ├── pyproject.toml      # Poetry dependencies
│   └── poetry.lock         # Lock file
│
├── frontend/               # SPA Next.js (futura implementação)
│
├── docker-compose.yml      # Orquestração de serviços
├── .env.example            # Template de variáveis
├── .gitignore              # Proteção de arquivos
└── README.md               # Este arquivo
```

### Componentes Principais

| Componente | Tecnologia | Responsabilidade |
|-----------|-----------|------------------|
| **API** | FastAPI 0.104+ | REST endpoints, lógica de negócio |
| **Database** | PostgreSQL 15 | Persistência de dados |
| **ORM** | SQLAlchemy 2.0+ | Mapping objeto-relacional |
| **Migrations** | Alembic | Versionamento de schema |
| **Auth** | JWT + bcrypt | Autenticação e autorização |
| **Orquestração** | Docker Compose | Ambiente local e CI/CD |

---

## ⚙️ Pré-requisitos

Antes de começar, **todas as ferramentas abaixo são obrigatórias**. Sem elas, a instalação não funcionará.

### Ferramentas Necessárias

| Ferramenta | Versão | Propósito | Download |
|-----------|---------|----------|----------|
| **Git** | 2.30+ | Versionamento de código | [git-scm.com](https://git-scm.com/) |
| **Docker Desktop** | 4.0+ | Containerização e orquestração | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Node.js** | 18+ (LTS) | Runtime para ferramentas frontend | [nodejs.org](https://nodejs.org/) |
| **Poetry** | 1.8+ | Gerenciador de pacotes Python | [python-poetry.org](https://python-poetry.org/docs/#installation) |

### Verificação Rápida

Após instalar as ferramentas, verifique se tudo está funcionando:

```bash
# Git
git --version
# Esperado: git version 2.30+

# Docker
docker --version
# Esperado: Docker version 24.0+

# Node.js
node --version
npm --version
# Esperado: v18+ e npm 9+

# Poetry
poetry --version
# Esperado: Poetry (version 1.8+)
```

---

## 🚀 Guia de Instalação

Siga **exatamente** esta sequência. Cada passo depende do anterior.

### Passo 1: Clonar o Repositório

Abra seu terminal (Git Bash, PowerShell, Terminal, etc.) e execute:

```bash
# Navegue até onde guarda seus projetos
cd ~/Projetos

# Clone o repositório
git clone https://github.com/Kleyam/Baldin.git

# Entre na pasta do projeto
cd Baldin
```

**O que foi feito:** Você baixou a versão mais recente do código do GitHub.

---

### Passo 2: Configurar Variáveis de Ambiente

A aplicação precisa de senhas e configurações que **não são salvas no Git** por segurança.

#### No Linux/Mac/Git Bash:

```bash
cp .env.example .env
```

#### No Windows PowerShell/CMD:

```powershell
copy .env.example .env
```

**O que foi feito:** Você criou um arquivo `.env` local baseado no template `.env.example`.

**Para desenvolvimento local:** Você **não precisa alterar** os valores do `.env` gerado. As credenciais padrão já estão configuradas.

---

### Passo 3: Iniciar o Docker Compose

Este é o comando mais importante. Ele vai ler o `docker-compose.yml`, construir as imagens e ligar todos os serviços.

```bash
# Garanta que Docker Desktop está aberto e rodando!

# Inicie os serviços
docker-compose up
```

**O que esperar:**

- ⏳ **Primeira vez pode demorar 5-10 minutos**: Docker está baixando as imagens base (Python 3.13, PostgreSQL 15) e compilando o ambiente do zero.

- 📜 **Muitas linhas de log aparecerão**: Isso é normal! É o Docker construindo tudo para você.

- 🟢 **Seu terminal fica "preso"**: Você verá logs em tempo real. Isso significa que está funcionando!

- 📍 **Sinais de sucesso:**
  ```
  backend-1  | INFO:     Application startup complete
  db-1       | 2024-02-07 10:30:45.000 UTC [1] LOG: database system is ready to accept connections
  ```

---

## ✅ Verificação da Instalação

Se o Docker Compose iniciou com sucesso, seu ambiente está no ar! Verifique com os testes abaixo:

### Teste 1: API do Backend

Abra seu navegador e acesse:

```
http://localhost:8000
```

**Você deve ver** (em formato JSON):

```json
{"message":"Bem-vindo(a) ao Software Baldin!"}
```

### Teste 2: Health Check

```
http://localhost:8000/health
```

**Você deve ver:**

```json
{"status":"ok","version":"0.1.0"}
```

### Teste 3: Documentação Interativa (Swagger)

```
http://localhost:8000/docs
```

Aqui você pode explorar todos os endpoints da API.

### Teste 4: Docker Desktop

1. Abra a interface gráfica do **Docker Desktop**
2. Na seção **Containers**, procure pelo grupo `baldin`
3. Você verá **2 contêineres**:
   - `baldin-backend-1` 🟢 (rodando)
   - `baldin-db-1` 🟢 (rodando)

Se todos os testes passaram, **PARABÉNS!** ✨ Você está pronto para começar.

---

## 💻 Desenvolvimento Diário

### Deixando os Serviços Rodando em Background

Se você não quer deixar seu terminal preso, execute:

```bash
docker-compose up -d
```

A flag `-d` significa "detached mode" (segundo plano).

### Parando os Serviços

```bash
docker-compose down
```

Isso encerra todos os contêineres **sem perder dados** (o banco de dados persiste no volume).

### Visualizar Logs em Tempo Real

```bash
# Todos os serviços
docker-compose logs -f

# Apenas o backend
docker-compose logs -f backend

# Apenas o banco de dados
docker-compose logs -f db
```

### Acessar o Terminal do Backend

Para executar comandos dentro do contêiner:

```bash
docker-compose exec backend sh
```

Dentro do contêiner, você pode rodar:

```bash
# Ver as migrations
alembic history

# Criar uma nova migration
alembic revision --autogenerate -m "descricao"

# Aplicar migrations
alembic upgrade head
```

### Acessar o PostgreSQL Diretamente

```bash
docker-compose exec db psql -U baldin_user -d baldin_db
```

Dentro do PostgreSQL:

```sql
-- Ver todas as tabelas
\dt

-- Ver dados da tabela users
SELECT * FROM users;

-- Sair
\q
```

---

## 📁 Estrutura do Projeto

### Backend (`/backend`)

```
backend/
├── src/
│   ├── core/
│   │   ├── settings.py          # Configurações (env vars, Pydantic)
│   │   └── database.py          # Engine async, sessions, Base
│   ├── models/
│   │   └── user.py              # ORM Model User
│   ├── schemas/                 # Pydantic Schemas (TODO)
│   ├── api/                     # Routers por módulo (TODO)
│   └── main.py                  # FastAPI app com lifespan
├── alembic/
│   ├── env.py                   # Config migrations async
│   ├── script.py.mako           # Template migrations
│   └── versions/                # Migration files
├── pyproject.toml               # Dependências Poetry
├── poetry.lock                  # Lock file
└── Dockerfile                   # Build image
```

**Próximos módulos a implementar:**
- [ ] **Identity**: Autenticação (JWT), registro, login
- [ ] **Jobs**: CRUD de vagas
- [ ] **Companies**: Perfil de empresas
- [ ] **Candidates**: Perfil de candidatos

---

## 🛠️ Stack Tecnológico

### Backend

```
FastAPI 0.104+          # Framework web assíncrono
SQLAlchemy 2.0+         # ORM para banco de dados
asyncpg                 # Driver PostgreSQL async
Pydantic 2.0+           # Validação de dados
Alembic 1.12+           # Migrations
python-jose            # JWT tokens
bcrypt                 # Hash de senhas
```

### Frontend

```
Next.js 14+             # Framework React Full-stack (App Router)
TypeScript 5.0+         # Tipagem estática rigorosa
Tailwind CSS 3.0+       # Motor de estilização utility-first
Shadcn/ui               # Componentes de UI reutilizáveis e acessíveis
React Hook Form         # Gerenciamento de estado de formulários
Zod                     # Validação de schemas (schema validation)
Lucide React            # Ícones vetoriais otimizados
Axios                   # Cliente HTTP para consumo da API                
```

### Database

```
PostgreSQL 15           # Banco de dados relacional
Docker Alpine           # Imagem leve
```

### DevOps

```
Docker 24+              # Containerização
Docker Compose 2.20+    # Orquestração local
Uvicorn                 # ASGI server
```

---

## 🔐 Segurança

### Variáveis de Ambiente

- `.env` é **ignorado no Git** (veja `.gitignore`)
- `.env.example` é **comitado** como template
- **Nunca commite** arquivos `.env` ou com secrets

### Proteção no Docker

- Backend roda com **usuário não-root**
- Secrets passados apenas via environment
- Health checks validam serviços antes de usar

### Database

- Conexões via **asyncpg** (seguro)
- Pool de conexões evita resource leaks
- Pre-ping valida conexões antes de usar

---

## 📚 Documentação Adicional

- **FastAPI Docs**: `http://localhost:8000/docs`
- **API Schema**: `http://localhost:8000/openapi.json`
- **PostgreSQL Docs**: [postgresql.org](https://www.postgresql.org/docs/)
- **SQLAlchemy Async**: [docs.sqlalchemy.org](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)

---

## 🤝 Contribuindo

### Fluxo de Desenvolvimento

1. **Crie uma branch** para sua feature:
   ```bash
   git checkout -b feat/descricao-feature
   ```

2. **Faça suas mudanças** nos arquivos

3. **Teste localmente** com Docker

4. **Commit com mensagem clara**:
   ```bash
   git commit -m "feat(modulo): descricao do que foi feito"
   ```

5. **Push para GitHub**:
   ```bash
   git push origin feat/descricao-feature
   ```

6. **Abra um Pull Request** no GitHub

### Padrão de Commits

Usamos Conventional Commits:

```
feat(modulo):     Nova funcionalidade
fix(modulo):      Correção de bug
docs:             Mudanças em documentação
refactor(modulo): Mudança sem alterar comportamento
test(modulo):     Adição/mudança de testes
chore:            Atualizações de dependências
```

---

## ⚠️ Troubleshooting

### Docker não inicia

```bash
# Reinicie o Docker Desktop e execute novamente
docker-compose down
docker-compose up --build
```

### Porta 8000 já está em uso

```bash
# Encontre o processo
lsof -i :8000

# Ou mude a porta no docker-compose.yml
# Mude "8000:8000" para "8001:8000"
```

### Banco de dados não conecta

```bash
# Verifique se o banco está pronto
docker-compose logs db

# Reinicie só o banco
docker-compose restart db
```

### Migrations com erro

```bash
# Entre no backend
docker-compose exec backend sh

# Verifique o histórico
alembic history

# Reverta se necessário
alembic downgrade -1
```

---

## 📞 Suporte

- 📧 **Issues**: Abra uma issue no GitHub
- 💬 **Discussões**: Use a aba Discussions do repositório
- 👥 **Time**: Entre em contato com a equipe de desenvolvimento

---

## 📄 License

Este projeto está sob a licença MIT. Veja `LICENSE` para mais detalhes.

---

**Feito com ❤️ pela comunidade de TI do Baldin**

*Última atualização: Fevereiro 2026*
