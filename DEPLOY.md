# Deploy no Vercel - Calculadora de Rescisão

## Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Repositório Git (GitHub, GitLab, ou Bitbucket)

## Passos para Deploy

### 1. Preparar o Repositório
```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Preparar para deploy no Vercel"

# Conectar com repositório remoto
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

### 2. Deploy no Vercel

#### Opção A: Via Dashboard do Vercel
1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Importe seu repositório
4. Configure:
   - **Framework Preset**: Angular
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist/calculadora-rescisao`
5. Clique em "Deploy"

#### Opção B: Via CLI do Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

### 3. Configurações Automáticas
O projeto já está configurado com:
- ✅ `vercel.json` - Configurações de build e rotas
- ✅ `vercel-build` script no `package.json`
- ✅ `.vercelignore` - Arquivos a serem ignorados no upload
- ✅ Configuração de produção otimizada

### 4. Verificar Deploy
Após o deploy, a aplicação estará disponível em uma URL como:
`https://calculadora-rescisao-xxx.vercel.app`

## Funcionalidades da Aplicação
- ✅ Cálculo de rescisão trabalhista
- ✅ Interface responsiva
- ✅ Validação de formulários
- ✅ Resultados detalhados

## Suporte
Em caso de problemas no deploy, verifique:
1. Se todos os arquivos foram commitados
2. Se o build local funciona: `npm run build`
3. Logs do Vercel no dashboard