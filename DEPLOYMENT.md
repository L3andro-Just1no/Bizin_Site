# Guia de Deploy - Neomarca Website

Este documento fornece instruções passo-a-passo para fazer deploy do website da Neomarca em produção.

## Pré-requisitos

Antes de começar, certifique-se de que tem:

- [ ] Conta criada na [Vercel](https://vercel.com)
- [ ] Conta criada na [OpenAI](https://platform.openai.com) (para fase 2)
- [ ] Conta criada na [Stripe](https://stripe.com) (para fase 2)
- [ ] Acesso ao Figma fornecido
- [ ] Repositório Git configurado (GitHub, GitLab, ou Bitbucket)

## 1. Preparação do Código

### 1.1 Variáveis de Ambiente

Criar o ficheiro `.env.local` com as seguintes variáveis:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 2 Siglas E-commerce URLs
NEXT_PUBLIC_2SIGLAS_URL=https://example.com/2siglas

# Para Fase 2 - Agente de IA
# OPENAI_API_KEY=sk-...
# STRIPE_SECRET_KEY=sk_live_...
# STRIPE_WEBHOOK_SECRET=whsec_...
```

### 1.2 Atualizar Conteúdo

Consultar `CONTENT_TODO.md` e substituir todo o conteúdo placeholder:

- Textos das páginas
- Informações de contacto em `lib/constants.ts`
- Logótipo e imagens
- URLs do e-commerce 2 Siglas

### 1.3 Google Analytics

1. Criar propriedade no [Google Analytics](https://analytics.google.com)
2. Obter o ID de medição (formato: G-XXXXXXXXXX)
3. Adicionar ao `.env.local` como `NEXT_PUBLIC_GA_ID`

## 2. Deploy na Vercel

### 2.1 Conectar Repositório

1. Aceder a [vercel.com](https://vercel.com) e fazer login
2. Clicar em "New Project"
3. Importar o repositório Git do projeto
4. Configurar o projeto:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2.2 Configurar Variáveis de Ambiente

Na página de configuração do projeto na Vercel:

1. Ir a **Settings** > **Environment Variables**
2. Adicionar as seguintes variáveis:
   - `NEXT_PUBLIC_GA_ID` (valor do Google Analytics)
   - `NEXT_PUBLIC_2SIGLAS_URL` (URL do e-commerce)
3. Selecionar ambientes: Production, Preview, Development

### 2.3 Deploy

1. Clicar em "Deploy"
2. Aguardar conclusão do build (2-3 minutos)
3. Verificar URL de produção gerado

## 3. Configurar Domínio Personalizado

### 3.1 Na Vercel

1. Ir a **Settings** > **Domains**
2. Adicionar domínio: `neomarca.pt`
3. Seguir instruções para configurar DNS

### 3.2 No Fornecedor de Domínio

Adicionar os seguintes registos DNS:

```
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

Aguardar propagação DNS (pode levar até 48h, mas normalmente 15-30 minutos).

## 4. Verificações Pós-Deploy

### 4.1 Checklist Funcional

- [ ] Todas as páginas carregam corretamente
- [ ] Navegação funciona (desktop e mobile)
- [ ] Formulário de contacto envia dados
- [ ] Links para 2 Siglas funcionam
- [ ] Cookie banner aparece na primeira visita
- [ ] Google Analytics está a registar visitas
- [ ] Sitemap acessível em `/sitemap.xml`
- [ ] Robots.txt acessível em `/robots.txt`
- [ ] Políticas de privacidade e cookies disponíveis

### 4.2 Testes de Performance

Executar testes em:

1. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Objetivo: Performance ≥ 85, SEO ≥ 90

2. **Google Search Console**
   - Adicionar propriedade
   - Submeter sitemap
   - Verificar indexação

3. **Teste Mobile**
   - Verificar responsividade
   - Testar em diferentes dispositivos

### 4.3 Testes de Compatibilidade

Testar em navegadores:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 5. Monitorização

### 5.1 Google Analytics

1. Aceder ao [Google Analytics](https://analytics.google.com)
2. Verificar que eventos estão a ser registados
3. Configurar alertas personalizados (opcional)

### 5.2 Vercel Analytics (Opcional)

1. Ativar Vercel Analytics no dashboard
2. Monitorizar métricas de performance

### 5.3 Logs

Aceder aos logs na Vercel:
- **Functions** > **Logs** para ver API calls
- Verificar erros de formulário de contacto

## 6. Manutenção

### 6.1 Atualizações de Conteúdo

Para atualizar conteúdo:

1. Editar ficheiros relevantes no repositório
2. Commit e push para o repositório
3. Vercel faz deploy automático

### 6.2 Atualizações de Dependências

Mensalmente, executar:

```bash
npm audit
npm update
npm run build
# Se tudo correr bem:
git add .
git commit -m "chore: update dependencies"
git push
```

### 6.3 Backups

A Vercel mantém histórico de deploys. Para rollback:

1. Ir a **Deployments**
2. Selecionar versão anterior
3. Clicar em "Promote to Production"

## 7. Próximos Passos (Fase 2)

Quando estiver pronto para implementar o agente de IA:

1. **OpenAI API**
   - Obter API key
   - Adicionar `OPENAI_API_KEY` às variáveis de ambiente

2. **Stripe**
   - Configurar conta
   - Obter API keys (test e production)
   - Configurar webhooks
   - Adicionar variáveis: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

3. **Base de Dados**
   - Vercel Postgres (recomendado)
   - Ou outro provider (Supabase, PlanetScale, etc.)

4. **Deploy Fase 2**
   - Seguir instruções do spec para tasks a1-a9

## 8. Suporte

### Recursos Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Vercel](https://vercel.com/docs)
- [Guias do Google Analytics](https://support.google.com/analytics)

### Contactos

Para questões técnicas relacionadas com este projeto:
- Consultar documentação no repositório
- Ver `README.md` para instruções de desenvolvimento
- Ver `CONTENT_TODO.md` para lista de conteúdo a substituir

## Checklist Final

Antes de considerar o deploy completo:

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Conteúdo placeholder substituído
- [ ] Domínio personalizado configurado
- [ ] Google Analytics funcional
- [ ] Formulário de contacto testado
- [ ] Todos os links verificados
- [ ] Performance satisfatória (Lighthouse)
- [ ] SEO verificado (Search Console)
- [ ] Testado em múltiplos navegadores
- [ ] Testado em mobile
- [ ] Cookie banner funcional
- [ ] Políticas de privacidade revistas

---

**Data de criação:** {new Date().toLocaleDateString("pt-PT")}
**Versão:** 1.0 (Fase 1 - Website Foundation)

