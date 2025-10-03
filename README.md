# 🔐 Formulário de Validação com Zod + TypeScript

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Projeto de estudo focado em **validação de formulários** utilizando a biblioteca **Zod** com **TypeScript**. Desenvolvido para praticar validações robustas de dados no frontend.

## 📋 Sobre o Projeto

Este projeto foi criado como parte de um exercício prático para aprender e implementar validações de formulário utilizando Zod. O objetivo é garantir que os dados inseridos pelo usuário sejam validados de forma segura e eficiente antes de serem processados.

### ✨ Funcionalidades

- ✅ Validação de **e-mail** com formato correto
- ✅ Validação de **senha** com mínimo de 6 caracteres
- ✅ Validação de **confirmação de senha** (deve coincidir)
- ✅ Validação de **telefone** brasileiro (10-11 dígitos, apenas números)
- ✅ Feedback visual de erros em tempo real
- ✅ Interface moderna e responsiva
- ✅ TypeScript para type-safety

## 🚀 Tecnologias Utilizadas

- **TypeScript** - Superset do JavaScript com tipagem estática
- **Zod** - Biblioteca de validação de schemas e parsing
- **Vite** - Build tool moderna e rápida
- **HTML5 & CSS3** - Estrutura e estilização

## 📦 Estrutura do Projeto

```
exercicio-zod/
├── src/
│   ├── index.ts          # Testes de validação Zod
│   └── form.ts           # Lógica do formulário web
├── public/
│   └── index.html        # Interface do formulário
├── dist/                 # Arquivos compilados (gerado após build)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Instalação e Uso

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para rodar o projeto

1. **Clone o repositório**
```bash
git clone https://github.com/DevAlex-full/exercicio-zod.git
cd exercicio-zod
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

### Outros comandos disponíveis

```bash
# Executar testes de validação no terminal
npm run test

# Compilar TypeScript
npm run build

# Visualizar build de produção
npm run preview
```

## 📝 Validações Implementadas

### E-mail
- Campo obrigatório
- Formato de e-mail válido (contém @ e domínio)

### Telefone
- Campo obrigatório
- Apenas números (sem caracteres especiais)
- Mínimo de 10 dígitos (fixo com DDD)
- Máximo de 11 dígitos (celular com DDD + 9)

### Senha
- Campo obrigatório
- Mínimo de 6 caracteres

### Confirmar Senha
- Campo obrigatório
- Deve ser idêntica à senha digitada

## 🎨 Preview

O formulário possui uma interface moderna com:
- Tema escuro com gradiente
- Campos com efeitos de foco
- Mensagens de erro contextuais
- Feedback visual de sucesso
- Design responsivo

## 💡 Exemplo de Uso do Schema

```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  
  telefone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .max(11, 'Telefone deve ter no máximo 11 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
  
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});
```

## 🧪 Testando as Validações

O projeto inclui casos de teste automatizados que podem ser executados com:

```bash
npm run test
```

### Casos de teste incluídos:
1. ✅ Dados totalmente válidos
2. ❌ Telefone com 9 dígitos (inválido)
3. ❌ Telefone com letras
4. ❌ Telefone com 12 dígitos (inválido)
5. ✅ Telefone com 10 dígitos (válido)
6. ❌ Múltiplos erros simultâneos

## 📚 Aprendizados

Este projeto me ajudou a compreender:
- Como implementar validações robustas com Zod
- Integração de TypeScript com bibliotecas de validação
- Manipulação de erros de validação no frontend
- Type-safety em formulários
- Feedback visual para melhor UX

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**DevAlex**

- GitHub: [@DevAlex-full](https://github.com/DevAlex-full)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

## 🔗 Links Úteis

- [Documentação do Zod](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

---

**Desenvolvido com 💜 durante estudos de validação de formulários**
