# 💼 Calculadora de Rescisão Trabalhista - MyJob

Uma aplicação web moderna e intuitiva para calcular rescisões trabalhistas de acordo com a legislação brasileira.

## 🚀 Funcionalidades

- ✅ **Cálculo Completo de Rescisão**: Saldo de salário, férias, 13º salário, FGTS e multa
- ✅ **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- ✅ **Validação Inteligente**: Campos obrigatórios e validação de datas
- ✅ **Resultados Detalhados**: Breakdown completo de todos os valores
- ✅ **Tipos de Rescisão**: Suporte para demissão sem justa causa, pedido de demissão, etc.
- ✅ **Aviso Prévio**: Cálculo automático baseado no tipo de rescisão

## 🛠️ Tecnologias Utilizadas

- **Angular 20.2.0** - Framework principal
- **TypeScript** - Linguagem de programação
- **CSS3** - Estilização responsiva
- **Angular Forms** - Gerenciamento de formulários

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd calculadora-rescisao
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento
```bash
npm start
# ou
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`

## 📁 Estrutura do Projeto

```
calculadora-rescisao/
├── src/
│   ├── app/
│   │   ├── app.component.ts    # Componente principal
│   │   ├── app.component.html  # Template da aplicação
│   │   └── app.component.css   # Estilos da aplicação
│   ├── index.html              # Página principal
│   ├── main.ts                 # Ponto de entrada
│   └── styles.css              # Estilos globais
├── public/
│   └── favicon.ico             # Ícone da aplicação
├── vercel.json                 # Configuração do Vercel
├── DEPLOY.md                   # Guia de deploy
└── package.json                # Dependências e scripts
```

## 🎯 Como Usar

1. **Preencha os dados do funcionário**:
   - Salário mensal
   - Data de admissão
   - Data de demissão
   - Tipo de rescisão

2. **Configure opções adicionais** (se aplicável):
   - Aviso prévio (trabalhado/indenizado)
   - Dias de férias vencidas
   - Saldo do FGTS

3. **Clique em "Calcular Rescisão"**

4. **Visualize os resultados detalhados**:
   - Valores a receber
   - Descontos aplicáveis
   - Total líquido

## 🧮 Cálculos Incluídos

- **Saldo de Salário**: Proporcional aos dias trabalhados
- **Férias Vencidas**: Férias não gozadas + 1/3 constitucional
- **Férias Proporcionais**: Baseado no tempo trabalhado
- **13º Salário**: Proporcional aos meses trabalhados
- **FGTS**: 8% sobre remunerações + multa (quando aplicável)
- **Aviso Prévio**: Indenizado quando aplicável

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. Faça push do código para GitHub/GitLab
2. Conecte seu repositório no [Vercel](https://vercel.com)
3. Configure:
   - Framework: **Angular**
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/calculadora-rescisao`
4. Deploy automático!

Para mais detalhes, consulte o arquivo [DEPLOY.md](./DEPLOY.md)

## 📜 Scripts Disponíveis

```bash
npm start          # Inicia servidor de desenvolvimento
npm run build      # Build para produção
npm run vercel-build # Build otimizado para Vercel
npm test           # Executa testes
npm run watch      # Build em modo watch
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvido por

**MyJob** - Soluções em Recursos Humanos

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
