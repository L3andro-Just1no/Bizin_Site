// External URLs
export const EXTERNAL_URLS = {
  bookingInvestment: "https://outlook.office.com/bookwithme/user/a9514f096fe44f70a9798d6acc4a981c@neomarca.pt/meetingtype/3YxhDEIdNU-BKKmc6TrQ3Q2?anonymous&ismsaljsauthenabled&ep=mcard",
  bookingTraining: "https://outlook.office.com/bookwithme/user/804f265f249d412eb553e8a87093441b@neomarca.pt/meetingtype/BuRINTzW5kyiouDZuPWBCw2?anonymous&ismsaljsauthenabled&ep=mlink",
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

// Contact information
export const CONTACT_INFO = {
  email: "info@bizin.pt",
  phone: "+351 289 098 720",
  mobile: "+351 915 990 790",
  address: {
    street: "Rua Horta Machado Nº 02",
    city: "Faro",
    postalCode: "8000-362",
    country: "Portugal",
  },
  hours: "Segunda a Sexta: 9h00 - 18h00",
};

// Site configuration
export const SITE_CONFIG = {
  name: "Bizin Portugal",
  title: "Bizin Portugal - Apoio a Incentivos ao Investimento",
  description: "A Bizin Portugal apoia empresas e empreendedores no acesso a incentivos ao investimento e programas europeus.",
  url: "https://bizin.pt",
  locale: "pt_PT",
};

// Navigation items
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Parceiros", href: "/parceiros", hidden: true },
  { label: "Sobre Portugal", href: "/sobre-portugal" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Blog", href: "/blog" },
  { label: "Contactos", href: "/contactos" },
];

// Interest options for forms
export const INTEREST_OPTIONS = [
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

