# spec kit – neomarca: website + agente de ia

## 1. specify

### 1.1 contexto

A Neomarca apoia empresas e empreendedores no acesso a fundos, incentivos e programas europeus.  
O objectivo deste projecto é criar:

1. Um **website novo** em Typescript + Tailwind, inspirado na estrutura e no briefing do **Bizin Portugal**, mas adaptado à realidade da Neomarca, com chamadas claras para o **e-commerce 2 Siglas** (sem recriar o e-commerce).  
2. Um **agente conversacional de IA** integrado no website, em modo freemium e pago, que ajuda utilizadores a perceber que apoios existem, a colocar questões sobre programas específicos e, no modo pago, a carregar documentos e obter um relatório em PDF.

O design visual será guiado pela **Home** existente em Figma:

- Figma source of truth (Home):  
  `https://www.figma.com/design/7wfS3mlZbzi5XYcyFdX2VF/Bizin?node-id=67-66&t=HMYPAWmQY7gHRzZq-1`

O Figma deve ser utilizado via **MCP do Figma** pelo Cursor AI Agent como referência visual e de marca para todas as páginas secundárias.

---

### 1.2 problema a resolver

- O site actual da Neomarca não comunica de forma clara a proposta de valor nem está optimizado para captação de leads em incentivos e fundos.
- Não existe um ponto único onde um potencial cliente possa:
  - perceber rapidamente se a Neomarca o pode ajudar  
  - explorar serviços  
  - deixar contacto qualificado  
  - interagir com um agente de IA sobre apoios e programas
- A equipa gasta tempo em respostas repetitivas e pouco estruturadas a questões sobre elegibilidade e fundos.

---

### 1.3 objectivos

**Website**

- Criar um website com estrutura clara, focado em conversão, inspirado no Bizin Portugal, mas com identidade textual da Neomarca.
- Aumentar o número de leads qualificadas por mês através de formulários e CTAs bem posicionados.
- Garantir boas práticas de SEO técnico e de conteúdo, preparando o site para escalar.

**Agente de IA**

- Permitir a qualquer utilizador colocar perguntas sobre apoios e fundos em linguagem natural, em texto e voz.
- Criar um modelo freemium que gere confiança e convide o utilizador a passar para modo pago.
- No modo pago, permitir upload de documentos e gerar um relatório PDF com recomendações e esclarecimentos.

---

### 1.4 fora de âmbito

- Não recriar o e-commerce 2 Siglas, apenas apontar para ele com CTAs e ligações.
- Não implementar backoffice complexo de gestão de conteúdos, para já um fluxo simples é suficiente.
- Não construir integração profunda com bases de dados externas de fundos, nesta fase o agente poderá operar com conhecimento inicial e regras simples.
- Não desenvolver aplicação mobile nativa.

---

### 1.5 utilizadores alvo e cenários

**Perfis principais**

- Empreendedor que procura incentivos, mas não sabe por onde começar.  
- Empresa estabelecida que quer perceber se tem apoios para investimento, exportação ou contratação.  
- Futuros parceiros que querem entender rapidamente a actuação da Neomarca.

**Cenários chave**

1. Visitante chega à Home, percebe em poucos segundos o que a Neomarca faz, vê exemplos de apoios, preenche formulário de contacto e passa a lead qualificada.  
2. Utilizador abre o agente de IA, faz 2 ou 3 perguntas básicas no modo gratuito, recebe respostas claras.  
3. Utilizador quer aprofundar, aceita fazer uma sessão paga, é encaminhado para Stripe, conclui pagamento, volta ao chat com modo pago activo, faz upload de um documento e no fim descarrega um relatório PDF.  
4. Neomarca utiliza o site em apresentações, envia links específicos de páginas de serviço e o site reforça credibilidade.

---

### 1.6 critérios de sucesso

- Website com **Lighthouse ≥ 90** em SEO e performance nas principais páginas.
- Pelo menos **2 formulários** bem definidos, com leads a entrarem no CRM ou em canal definido.
- Agente de IA com:
  - tempo médio de resposta inferior a 2,5 segundos em condições normais  
  - limite freemium funcional  
  - fluxo de pagamento Stripe testado de ponta a ponta  
  - relatório PDF funcional com dados da sessão
- Possibilidade de o cliente operar com contas próprias de Vercel e OpenAI sem dependência estrutural do dev.

---

### 1.7 dependências

- A Neomarca deve:
  - criar conta no **Vercel** com método de pagamento activo  
  - criar conta na **OpenAI API** com método de pagamento activo  
  - criar conta na **Stripe** (ou fornecer acesso)  
  - fornecer acesso ao Figma indicado  
  - aprovar textos base e estrutura de navegação

---

## 2. plan

### 2.1 arquitectura geral

**Frontend**

- Framework: **Next.js** (App Router), Typescript, Tailwind CSS.
- Deploy: **Vercel**, com ambientes de preview e produção.
- Website e widget de chat partilham o mesmo repositório.

**Backend**

- API Routes ou Vercel Functions para:
  - gestão de sessões de chat  
  - chamadas a OpenAI  
  - uploads de ficheiros  
  - geração de PDFs  
  - webhooks Stripe  

**Serviços externos**

- OpenAI: LLM e, se aplicável, voz.  
- Stripe: pagamentos por sessão e subscrições.  
- Vercel: hosting e edge.  
- Armazenamento para uploads e relatórios (Vercel Blob ou S3 compatível).  

---

### 2.2 dados e modelos

Modelos principais (conceito):

- `User` – opcional, pode haver utilização anónima.  
- `Session` – representa uma sessão de chat, com modo freemium ou pago.  
- `Message` – mensagens trocadas na sessão.  
- `Payment` – registos de pagamento via Stripe.  
- `Document` – ficheiros carregados.  
- `Report` – relatório PDF gerado.  
- `SiteConfig` – configurações básicas por site.

Não é obrigatório implementar um backoffice completo agora, mas a estrutura deve suportar isso no futuro.

---

### 2.3 integrações

**Stripe**

- Stripe Checkout para sessão única.  
- Stripe Billing para subscrições, se for activado.  
- Webhooks para confirmar `payment_succeeded` e activar modo pago na sessão.

**OpenAI**

- Endpoint de chat para respostas do agente.  
- Eventual uso de STT e TTS, se activado.

**Vercel**

- Funções serverless para APIs.  
- Gestão de env vars e previews.

---

### 2.4 ux, figma e design system

- O Figma indicado é a **fonte de verdade visual**.
- O Cursor AI Agent deve usar o **MCP do Figma** para:
  - ler a estrutura da Home (grid, tipografia, cores, componentes)  
  - criar um pequeno design system em código (componentes React + Tailwind)  
  - replicar a lógica de layout nas páginas secundárias  
- O dev não deve inventar estilos de raiz, deve seguir o Figma como referência.

Páginas mínimas:

- Home  
- Serviços  
- Sobre Portugal ou visão de contexto  
- Sobre a Neomarca  
- Blog ou Insights  
- Contactos  
- Políticas (privacidade, cookies)

---

### 2.5 segurança e conformidade

- Respeitar RGPD, minimizar dados pessoais, não guardar mais do que o necessário.
- Encriptar dados sensíveis em trânsito (HTTPS) e, quando aplicável, em repouso.
- Não guardar dados de cartão, tudo tratado pelo Stripe.
- Implementar política de cookies com consentimento para analytics.

---

### 2.6 testes e qualidade

- Testes unitários para funções de negócio mais críticas.
- Testes E2E mínimos:
  - fluxo de navegação básico no site  
  - fluxo freemium do chat  
  - fluxo de pagamento Stripe  
  - fluxo de upload e geração de PDF  
- Verificação de acessibilidade básica (pelo menos com uma ferramenta tipo axe ou Lighthouse).

---

### 2.7 rollout e rollback

- Deploy inicial para ambiente de staging/preview, testes com o cliente.
- Depois de validado, promover para produção em Vercel.
- Sempre que possível, manter facilidade de rollback para versão anterior do deploy se for detectado problema grave.

---

## 3. tasks para cursor ai agent

### 3.1 visão geral

As tasks estão em formato YAML, para poderes colar directamente no Cursor AI Agent.  

Separação em duas áreas:

- `website` – estrutura, navegação, SEO, formulários, CTAs para 2 Siglas.  
- `agent` – widget, API, OpenAI, Stripe, uploads e PDF.

### 3.2 tasks em yaml

```yaml
spec_kit: "Neomarca – Website + Agente IA"

website:
  - id: w1_scaffold_next_tailwind
    title: "Criar projecto Next.js com Typescript e Tailwind"
    description: >
      Criar uma aplicação Next.js com App Router, Typescript e Tailwind configurados.
      Preparar estrutura base de pastas, layout principal e tema Tailwind.
    dod:
      - "Aplicação compila sem erros"
      - "Tailwind aplicado correctamente ao layout base"
      - "Existe um layout global com header e footer"
      - "README com instruções básicas de desenvolvimento"

  - id: w2_figma_sync_home
    title: "Sincronizar Home com Figma via MCP"
    description: >
      Usar o MCP do Figma para ler a Home no ficheiro fornecido,
      extrair grid, cores, tipografia e componentes,
      e implementar a Home em React + Tailwind seguindo o design.
    figma:
      url: "https://www.figma.com/design/7wfS3mlZbzi5XYcyFdX2VF/Bizin?node-id=67-66&t=HMYPAWmQY7gHRzZq-1"
    dod:
      - "Layout da Home segue estrutura e hierarquia visual do Figma"
      - "Componentes principais (botões, cards, secções) estão isolados em ficheiros próprios"
      - "Não há estilos inline desnecessários"

  - id: w3_navigation_structure
    title: "Criar navegação e páginas principais"
    description: >
      Criar páginas Home, Serviços, Sobre, Blog/Insights, Contactos e Políticas.
      A navegação deve seguir a lógica conceptual do briefing do Bizin Portugal,
      mas com conteúdo adaptado à Neomarca.
    dod:
      - "Menu principal funcional em desktop e mobile"
      - "Cada página tem H1 claro e estrutura semântica correcta"
      - "Links internos entre páginas principais testados"

  - id: w4_ctas_to_2siglas
    title: "Implementar CTAs para o e-commerce 2 Siglas"
    description: >
      Adicionar chamadas para acção (botões, secções) que apontem para o e-commerce 2 Siglas,
      sem recriar o e-commerce, apenas redireccionando para URLs fornecidas.
    inputs:
      - "Lista de URLs relevantes do 2 Siglas"
    dod:
      - "CTAs visíveis em pontos estratégicos da Home e páginas de serviços"
      - "Todos os links para 2 Siglas funcionam e abrem em nova aba"

  - id: w5_forms_leads
    title: "Implementar formulários de captação de leads"
    description: >
      Implementar formulário principal de contacto e, se aplicável, uma variante (versão A e B)
      com campos alinhados com o briefing (nome, email, empresa, interesse, mensagem).
      Preparar integração simples com endpoint (mock ou real) e envio de email.
    dod:
      - "Formulários com validação básica de campos obrigatórios"
      - "Mensagens de confirmação e erro claras"
      - "Endpoint de recepção implementado ou facilmente substituível"

  - id: w6_seo_acessibilidade
    title: "Aplicar SEO técnico e acessibilidade base"
    description: >
      Adicionar meta tags, título descritivo por página, Open Graph, sitemap.xml, robots.txt.
      Garantir estrutura semântica correcta e acessibilidade mínima (navegação por teclado, contrastes).
    dod:
      - "Lighthouse SEO >= 90 nas principais páginas"
      - "Sitemap e robots disponibilizados"
      - "Nenhum erro crítico de acessibilidade em análise básica"

  - id: w7_analytics_consent
    title: "Configurar analytics com banner de consentimento"
    description: >
      Configurar ferramenta de analytics (ex. Google Analytics) com banner de consentimento de cookies.
      Apenas disparar tracking depois de aceitação explícita.
    dod:
      - "Banner de cookies visível na primeira visita"
      - "Eventos de page_view apenas após consentimento"
      - "Código de tracking configurado via env var"

agent:
  - id: a1_widget_frontend
    title: "Criar widget de chat do agente IA"
    description: >
      Implementar um widget de chat React que possa ser embutido no website via script.
      Deve incluir botão flutuante, modal de chat, histórico de mensagens e opções de texto/voz.
    dod:
      - "Botão de chat visível em todas as páginas"
      - "Modal abre e fecha correctamente"
      - "Interface de chat funcional com mensagens simuladas localmente"

  - id: a2_session_api_skeleton
    title: "Criar API de sessão do chat (skeleton)"
    description: >
      Implementar endpoints base para iniciar sessão, enviar mensagem e receber resposta mock.
      Preparar estrutura para integração posterior com OpenAI.
    dod:
      - "POST /api/session/start devolve um sessionId"
      - "POST /api/session/message responde com texto mock"
      - "Erros são devolvidos em JSON com código e mensagem"

  - id: a3_openai_integration
    title: "Integrar OpenAI para respostas do agente"
    description: >
      Ligar a API de mensagens ao OpenAI para obter respostas reais.
      Configurar prompts base para o contexto de incentivos e apoio a empresas.
    env:
      - "OPENAI_API_KEY"
    dod:
      - "Respostas do chat passam a ser geradas pelo modelo da OpenAI"
      - "Timeouts e erros são tratados e comunicados ao utilizador"
      - "Nenhuma chave ou segredo é exposto no frontend"

  - id: a4_freemium_rules
    title: "Implementar regras de modo freemium"
    description: >
      Definir limites para número de mensagens no modo gratuito e bloquear funcionalidades
      de upload e relatório nos utilizadores freemium. Mostrar mensagens claras a convidar a upgrade.
    dod:
      - "Limite de mensagens freemium por sessão aplicado"
      - "Upload e relatório apenas disponíveis em modo pago"
      - "Respostas HTTP 402 para tentativas fora de plano"

  - id: a5_stripe_checkout
    title: "Integrar Stripe Checkout para sessão paga"
    description: >
      Implementar endpoint que cria sessões de checkout Stripe para uma sessão de consultoria paga.
      Processar webhooks para marcar sessão como paga.
    env:
      - "STRIPE_SECRET_KEY"
      - "STRIPE_WEBHOOK_SECRET"
    dod:
      - "Fluxo completo testado em modo test da Stripe"
      - "Sessão de chat muda para modo pago após payment_succeeded"
      - "Logs claros em caso de erro de webhook"

  - id: a6_upload_documents
    title: "Adicionar upload de documentos no modo pago"
    description: >
      Permitir upload de ficheiros (PDF, DOCX) em sessões pagas, guardar em storage
      e extrair texto para o contexto de chat.
    dod:
      - "Uploads limitados em tamanho e tipo"
      - "Ficheiros armazenados em local seguro"
      - "Texto extraído disponível para o agente na mesma sessão"

  - id: a7_pdf_report
    title: "Gerar relatório PDF no fim da sessão paga"
    description: >
      Criar rotina que compila resumo da sessão, principais respostas e recomendações
      em PDF, disponibilizando link de download ao utilizador.
    dod:
      - "PDF gerado com identificação da sessão e timestamp"
      - "Ligação de download funcional"
      - "Estilo simples, com logótipo e identidade da Neomarca se disponível"

  - id: a8_telemetry_logs
    title: "Implementar logs e métricas principais"
    description: >
      Adicionar logging estruturado para erros e métricas de uso do agente.
      Registar latência média e número de mensagens por sessão.
    dod:
      - "Logs de erro disponíveis com contexto suficiente"
      - "Métrica de latência agregada por endpoint"
      - "Não são registados dados sensíveis em logs"

  - id: a9_env_docs
    title: "Documentar variáveis de ambiente e deploy"
    description: >
      Criar README com lista de variáveis de ambiente, passos para correr o projecto
      localmente e fazer deploy em Vercel com contas do cliente.
    dod:
      - "README inclui secção de configuração de env vars"
      - ".env.example presente"
      - "Passos para deploy descritos claramente"

```

---

## 4. guardrails

1. **não quebrar o que já funciona**  
   Sempre que existirem componentes ou fluxos já estáveis, não os alterar sem motivo justificado e sem alinhar primeiro.

2. **sem hardcodes de segredos ou URLs sensíveis**  
   Chaves de API, IDs de conta, URLs de webhooks, tudo deve viver em variáveis de ambiente. Nunca no código público.

3. **sem fallbacks silenciosos**  
   Não esconder erros nem enganar o utilizador. Se algo falhar, deve haver:
   - log útil para debugging  
   - mensagem clara para o utilizador, sem detalhes técnicos desnecessários

4. **respeitar o Figma como fonte de verdade visual**  
   - Não inventar novos componentes fora do design sem decisão consciente.  
   - Reutilizar padrões da Home para páginas secundárias.  
   - Qualquer desvio relevante de layout deve ter motivo e ser documentado.

5. **respeitar RGPD e privacidade**  
   - Minimizar dados pessoais recolhidos.  
   - Não guardar dados de cartões (Stripe trata disso).  
   - Permitir apagar dados de sessões se for implementado mais tarde.

6. **código legível e tipado**  
   - Typescript com tipos explícitos onde faz sentido.  
   - Nomes de funções e variáveis claros.  
   - Comentários apenas onde necessários, não comentar o óbvio.

7. **testes e validação mínima obrigatória**  
   - Nenhuma funcionalidade crítica de pagamento ou geração de PDF deve ser considerada concluída sem teste manual do fluxo completo.  
   - Erros frequentes detectados em logs devem originar correcção.

8. **alinhamento com o spec**  
   - Se durante o desenvolvimento for detectada uma incoerência ou uma oportunidade de simplificação, deve ser indicada e registada antes de a implementar.  
   - Não expandir o escopo além do descrito sem nova decisão explícita.
