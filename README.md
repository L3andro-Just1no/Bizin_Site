# Neomarca Website

Website oficial da Neomarca - Apoio a Fundos e Incentivos Europeus.

Este é o website da Fase 1, incluindo todas as páginas principais, formulários de contacto, SEO otimizado e sistema de analytics com consentimento de cookies.

## 🚀 Status do Projeto

✅ **Fase 1 Completa** - Website Foundation
- ✅ Next.js 14+ com TypeScript e Tailwind CSS
- ✅ Design system baseado no Figma
- ✅ Todas as páginas principais implementadas
- ✅ Formulários de captação de leads
- ✅ SEO otimizado (sitemap, robots.txt, metadata)
- ✅ Cookie consent banner e Google Analytics
- ✅ CTAs para e-commerce 2 Siglas
- ✅ Responsivo (desktop, tablet, mobile)

🔜 **Fase 2** - Agente de IA (planeado)

## 🛠 Tecnologias

- **Framework**: Next.js 14.2+ com App Router
- **Linguagem**: TypeScript
- **Estilos**: Tailwind CSS
- **Deploy**: Vercel (recomendado)
- **Analytics**: Google Analytics 4
- **Forms**: API Routes com validação

## 📦 Instalação e Desenvolvimento Local

### Pré-requisitos

- Node.js 18+ instalado
- npm (vem com Node.js)

### Passos

```bash
# 1. Clonar o repositório (se aplicável)
git clone <repository-url>
cd Bizin_Site

# 2. Instalar dependências
npm install

# 3. Copiar ficheiro de ambiente
cp .env.example .env.local

# 4. Editar .env.local com as suas configurações
# - Adicionar Google Analytics ID
# - Adicionar URL do 2 Siglas

# 5. Executar em modo de desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) no navegador.

### Comandos Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento (porta 3000)
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificar código
```

## 📁 Estrutura do Projeto

```
.
├── app/                        # Páginas e rotas (App Router)
│   ├── page.tsx               # Home page
│   ├── servicos/              # Página de serviços
│   ├── sobre-portugal/        # Sobre Portugal
│   ├── sobre-neomarca/        # Sobre a Neomarca
│   ├── blog/                  # Blog e insights
│   ├── contactos/             # Página de contactos
│   ├── politicas/             # Políticas (privacidade, cookies)
│   ├── api/leads/             # API para formulários
│   ├── layout.tsx             # Layout global
│   ├── globals.css            # Estilos globais
│   ├── sitemap.ts             # Geração de sitemap
│   └── robots.ts              # Geração de robots.txt
├── components/                 # Componentes React
│   ├── ui/                    # Componentes de UI base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Section.tsx
│   │   └── Container.tsx
│   ├── Header.tsx             # Cabeçalho
│   ├── Footer.tsx             # Rodapé
│   ├── ContactForm.tsx        # Formulário de contacto
│   ├── CookieBanner.tsx       # Banner de cookies
│   └── AnalyticsProvider.tsx  # Provider de analytics
├── lib/                       # Utilitários
│   ├── constants.ts           # Constantes globais
│   ├── utils.ts               # Funções auxiliares
│   └── analytics.ts           # Configuração de analytics
├── public/                    # Ficheiros estáticos
│   └── robots.txt            # robots.txt estático
├── .env.example               # Exemplo de variáveis de ambiente
├── CONTENT_TODO.md            # Checklist de conteúdo
├── DEPLOYMENT.md              # Guia de deploy
└── README.md                  # Este ficheiro
```

## ⚙️ Configuração

### Variáveis de Ambiente

Criar `.env.local` com:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 2 Siglas E-commerce
NEXT_PUBLIC_2SIGLAS_URL=https://example.com/2siglas
```

### Personalização de Conteúdo

**IMPORTANTE**: Este projeto contém conteúdo placeholder que deve ser substituído.

Consultar `CONTENT_TODO.md` para lista completa de:
- Textos das páginas
- Informações de contacto
- URLs e links
- Imagens e logótipos

Principais ficheiros a editar:
- `lib/constants.ts` - URLs, contactos, navegação
- Páginas em `app/` - Conteúdo específico de cada página

## 🚀 Deploy

### Deploy Rápido na Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Fazer push do código para GitHub/GitLab/Bitbucket
2. Importar projeto na Vercel
3. Configurar variáveis de ambiente
4. Deploy automático!

Para instruções detalhadas, consultar `DEPLOYMENT.md`.

### Outros Providers

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Self-hosted

## 📊 SEO e Performance

### Otimizações Implementadas

- ✅ Meta tags otimizadas em todas as páginas
- ✅ Open Graph tags para redes sociais
- ✅ Sitemap.xml gerado automaticamente
- ✅ Robots.txt configurado
- ✅ Estrutura semântica HTML5
- ✅ Imagens otimizadas (quando adicionadas)
- ✅ Lazy loading de componentes
- ✅ CSS otimizado com Tailwind

### Lighthouse Scores Esperados

- Performance: ≥ 85
- SEO: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90

## 🎨 Design System

O design visual segue o Figma como fonte de verdade:
- [Figma - Home](https://www.figma.com/design/7wfS3mlZbzi5XYcyFdX2VF/Bizin?node-id=67-66)

### Componentes UI Disponíveis

- `Button` - Botões com variantes (primary, secondary, outline, ghost)
- `Card` - Cards com variantes (default, bordered, elevated)
- `Input` - Campos de texto com validação
- `Textarea` - Áreas de texto
- `Select` - Dropdowns
- `Section` - Secções de página
- `Container` - Containers responsivos

### Cores (Tailwind)

```js
primary: {
  DEFAULT: "#0066CC",
  50-900: // tons de azul
}
secondary: {
  DEFAULT: "#00B8D4",
  50-900: // tons de ciano
}
```

## 📝 Formulários

### Formulário de Contacto

Localização: `/contactos`

**Campos:**
- Nome (obrigatório)
- Email (obrigatório)
- Empresa (opcional)
- Interesse (dropdown, obrigatório)
- Mensagem (obrigatório)
- Consentimento RGPD (obrigatório)

**Validação:**
- Client-side com feedback em tempo real
- Server-side na API route

**Integração:**
Atualmente logs para console. Para produção, integrar com:
- CRM (Salesforce, HubSpot, etc.)
- Email service (SendGrid, Resend, etc.)
- Base de dados

Editar `app/api/leads/route.ts` para adicionar integração.

## 🔒 RGPD e Privacidade

### Conformidade Implementada

- ✅ Cookie consent banner
- ✅ Política de Privacidade
- ✅ Política de Cookies
- ✅ Analytics apenas após consentimento
- ✅ Formulários com consentimento explícito

### Cookies Utilizados

- `cookie_consent` - Armazena preferência do utilizador
- `_ga`, `_ga_*` - Google Analytics (apenas se aceite)

## 📱 Responsividade

O website é totalmente responsivo com breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Testado em:
- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome

## 🔄 Próximas Fases

### Fase 2 - Agente de IA (Planeado)

Funcionalidades:
- Widget de chat conversacional
- Integração com OpenAI
- Modo freemium (5 mensagens grátis)
- Modo pago via Stripe
- Upload de documentos
- Geração de relatórios PDF

Ver `SPEC_NEOMARCA_WEBSITE_AGENT.md` para detalhes.

## 🐛 Troubleshooting

### Build Fails

```bash
# Limpar cache e reinstalar
rm -rf .next node_modules
npm install
npm run build
```

### Variáveis de Ambiente Não Carregam

- Verificar que ficheiro `.env.local` existe
- Variáveis públicas devem começar com `NEXT_PUBLIC_`
- Reiniciar servidor de desenvolvimento

### Analytics Não Funciona

- Verificar que `NEXT_PUBLIC_GA_ID` está configurado
- Aceitar cookies no banner
- Verificar console do browser para erros

## 📄 Licença

Propriedade da Neomarca. Todos os direitos reservados.

## 📞 Suporte

Para questões sobre este projeto:
- Consultar `DEPLOYMENT.md` para deploy
- Consultar `CONTENT_TODO.md` para conteúdo
- Ver código fonte para implementação

---

**Versão:** 1.0 (Fase 1)  
**Última atualização:** {new Date().toLocaleDateString("pt-PT")}  
**Status:** ✅ Produção Ready

