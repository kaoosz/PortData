# PortData
## ⚙️ Clonar o Repositório

```
git clone https://github.com/kaoosz/Ozmap.git
```
🔧 Configuração do Ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```
PORT=3001
DATABASE_URL="mysql://example:example@localhost:3306/portdata?schema=public"
```
📦 Instalar Dependências
```
npm install
```
🚀 Rodar a Aplicação
Via Docker Compose
```
docker-compose up -d
```
```
npm run dev
```
 

📄 Endpoints  
Contatos Endpoints  
(POST) Criar Contato

Rota: /contatos
http://localhost:3001/contatos

Exemplo de Request:
```
{
    "nome": "ala ros",
    "telefone": "(12)98845-8657"
}
```

(PATCH) Atualizar Contato

Rota: /contatos/id
http://localhost:3001/contatos/4

Exemplo de Request:
```
{
    "nome": "Mudei x",
    "telefone": "1288458457"
}
```

(DELETE) Contatos

Rota: /contatos/2  
http://localhost:3001/contatos/20  
Descrição: Deleta um Contato pelo ID.

Exemplo de URL Completa:
```
http://localhost:3001/contatos/20
```

(GET) Contato

Rota: /contatos  
http://localhost:3001/contatos?page=1&limit=6  
Descrição: Usa page e limit para paginação ordenada Alfabeticamente.  

Exemplo de URL Completa:
```
http://localhost:3001/contatos?page=0&limit=4
```

(POST) Criar Grupos

Rota: /contatos
http://localhost:3001/grupos

Exemplo de Request:
```
{
    "nome": "foccasxxx"
}
```
(PATCH) Atualizar Grupo

Rota: /grupos/4
http://localhost:3001/grupos/4

Exemplo de Request:
```
{
    "nome": "Mudei Nomdxwde"
}
```
(DELETE) Grupos

Rota: /grupos/4    
http://localhost:3001/grupos/4  
Descrição: Deleta um Grupo pelo ID.

Exemplo de URL Completa:
```
http://localhost:3001/grupos/4
```

(POST) Criar Contatos-Grupos relação.

Rota: /contatos-grupos
http://localhost:3001/contatos-grupos

Exemplo de Request:
```
{
    "id_grupo": 5,
    "id_contato": 16
}
```

(GET) Grupos Contatos

Rota: /grupos/4/contatos  
http://localhost:3001/grupos/4/contatos  
Descrição: Retorna o grupo e seus contatos cadastrados.

Exemplo de URL Completa:
```
http://localhost:3001/grupos/5/contatos
```

(GET) Relatório

Rota: /relatorio/contatos-grupos   
http://localhost:3001/relatorio/contatos-grupos  
Descrição: Retorna um relatório entre contatos e grupos.

Exemplo de URL Completa:
```
http://localhost:3001/relatorio/contatos-grupos
```
