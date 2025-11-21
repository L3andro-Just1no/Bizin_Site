// External URLs
export const EXTERNAL_URLS = {
  twoSiglas: {
    main: process.env.NEXT_PUBLIC_2SIGLAS_URL || "https://example.com/2siglas",
    services: process.env.NEXT_PUBLIC_2SIGLAS_URL + "/servicos" || "https://example.com/2siglas/servicos",
    products: process.env.NEXT_PUBLIC_2SIGLAS_URL + "/produtos" || "https://example.com/2siglas/produtos",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/neomarca",
    facebook: "https://www.facebook.com/neomarca",
    instagram: "https://www.instagram.com/neomarca",
    twitter: "https://www.twitter.com/neomarca",
  },
};

// Contact information
export const CONTACT_INFO = {
  email: "info@neomarca.pt",
  phone: "+351 XXX XXX XXX",
  address: {
    street: "Rua Exemplo, 123",
    city: "Lisboa",
    postalCode: "1000-000",
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
  { value: "outro", label: "Outro" },
];

// Freemium limits (for future AI agent)
export const FREEMIUM_LIMITS = {
  messagesPerSession: 5,
  maxSessionsPerDay: 3,
};

