// External URLs
export const EXTERNAL_URLS = {
  twoSiglas: {
    main: process.env.NEXT_PUBLIC_2SIGLAS_URL || "https://example.com/2siglas",
    services:
      process.env.NEXT_PUBLIC_2SIGLAS_URL + "/servicos" ||
      "https://example.com/2siglas/servicos",
    products:
      process.env.NEXT_PUBLIC_2SIGLAS_URL + "/produtos" ||
      "https://example.com/2siglas/produtos",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/neomarca",
    facebook: "https://www.facebook.com/neomarca",
    instagram: "https://www.instagram.com/neomarca",
    // Official X (Twitter) profile
    twitter: "https://x.com/neomarca",
  },
};

// Contact information (aligned with official Neomarca site: https://neomarca.pt/pt/)
export const CONTACT_INFO = {
  email: "geral@neomarca.pt",
  phone: "+351 289 098 720",
  mobile: "+351 915 990 790",
  address: {
    street: "Rua do Município, Lote 6, Loja 1",
    city: "Faro",
    postalCode: "8005-525",
    country: "Portugal",
  },
  hours: "Segunda a Sexta: 9h00 - 18h00",
};

// Site configuration
export const SITE_CONFIG = {
  name: "Neomarca",
  title: "Neomarca - Apoio a Fundos e Incentivos Europeus",
  description: "A Neomarca apoia empresas e empreendedores no acesso a fundos, incentivos e programas europeus.",
  url: "https://neomarca.pt",
  locale: "pt_PT",
};

// Navigation items
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Sobre Portugal", href: "/sobre-portugal" },
  { label: "Sobre Nós", href: "/sobre-neomarca" },
  { label: "Blog", href: "/blog" },
  { label: "Contactos", href: "/contactos" },
];

// Interest options for forms
export const INTEREST_OPTIONS = [
  { value: "fundos-europeus", label: "Fundos Europeus" },
  { value: "incentivos-investimento", label: "Incentivos ao Investimento" },
  { value: "apoio-exportacao", label: "Apoio à Exportação" },
  { value: "inovacao-id", label: "Inovação e I&D" },
  { value: "contratacao", label: "Apoio à Contratação" },
  { value: "consultoria", label: "Consultoria Geral" },
  { value: "evento", label: "Eventos e Workshops" },
  { value: "formacao", label: "Formações e Cursos" },
  { value: "outro", label: "Outro" },
];

// Freemium limits (for future AI agent)
export const FREEMIUM_LIMITS = {
  messagesPerSession: 5,
  maxSessionsPerDay: 3,
};

