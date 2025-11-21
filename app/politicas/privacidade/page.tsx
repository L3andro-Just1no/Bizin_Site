import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade - Neomarca",
  description: "Política de privacidade e proteção de dados da Neomarca.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacidadePage() {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Política de Privacidade</h1>
        <p className="text-gray-600">
          <em>Última atualização: {new Date().toLocaleDateString("pt-PT")}</em>
        </p>

        <h2>1. Introdução</h2>
        <p>
          A Neomarca está comprometida com a proteção da sua privacidade e dos
          seus dados pessoais. Esta Política de Privacidade descreve como
          recolhemos, utilizamos, armazenamos e protegemos as suas informações
          pessoais em conformidade com o Regulamento Geral de Proteção de Dados
          (RGPD) e demais legislação aplicável.
        </p>

        <h2>2. Responsável pelo Tratamento de Dados</h2>
        <p>
          <strong>Neomarca</strong>
          <br />
          Morada: {CONTACT_INFO.address.street}, {CONTACT_INFO.address.postalCode}{" "}
          {CONTACT_INFO.address.city}
          <br />
          Email: {CONTACT_INFO.email}
          <br />
          Telefone: {CONTACT_INFO.phone}
        </p>

        <h2>3. Dados Recolhidos</h2>
        <p>Podemos recolher os seguintes tipos de dados pessoais:</p>
        <ul>
          <li>
            <strong>Dados de identificação:</strong> nome, email, telefone
          </li>
          <li>
            <strong>Dados empresariais:</strong> nome da empresa, cargo, setor de
            atividade
          </li>
          <li>
            <strong>Dados de navegação:</strong> endereço IP, cookies, páginas
            visitadas
          </li>
          <li>
            <strong>Dados de comunicação:</strong> mensagens enviadas através dos
            formulários de contacto
          </li>
        </ul>

        <h2>4. Finalidade do Tratamento</h2>
        <p>Os seus dados pessoais são tratados para as seguintes finalidades:</p>
        <ul>
          <li>Responder às suas solicitações e pedidos de informação</li>
          <li>Prestar serviços de consultoria e apoio</li>
          <li>Enviar comunicações de marketing (apenas com o seu consentimento)</li>
          <li>Melhorar a experiência do utilizador no nosso website</li>
          <li>Cumprir obrigações legais e regulamentares</li>
        </ul>

        <h2>5. Base Legal do Tratamento</h2>
        <p>O tratamento dos seus dados pessoais é fundamentado em:</p>
        <ul>
          <li>Consentimento explícito do titular dos dados</li>
          <li>Execução de medidas pré-contratuais ou contratuais</li>
          <li>Cumprimento de obrigações legais</li>
          <li>Interesses legítimos da Neomarca</li>
        </ul>

        <h2>6. Partilha de Dados</h2>
        <p>
          Os seus dados pessoais não serão vendidos, alugados ou partilhados com
          terceiros, exceto nas seguintes situações:
        </p>
        <ul>
          <li>Com o seu consentimento expresso</li>
          <li>
            Com prestadores de serviços que nos auxiliam (ex: serviços de hosting,
            email marketing)
          </li>
          <li>Por obrigação legal ou ordem judicial</li>
          <li>Para proteção dos nossos direitos legais</li>
        </ul>

        <h2>7. Segurança dos Dados</h2>
        <p>
          Implementamos medidas técnicas e organizativas adequadas para proteger
          os seus dados pessoais contra acesso não autorizado, perda, destruição
          ou alteração. Estas medidas incluem:
        </p>
        <ul>
          <li>Encriptação de dados em trânsito (HTTPS)</li>
          <li>Controlo de acesso restrito</li>
          <li>Backups regulares</li>
          <li>Formação de colaboradores em proteção de dados</li>
        </ul>

        <h2>8. Conservação de Dados</h2>
        <p>
          Os seus dados pessoais serão conservados apenas pelo período necessário
          para cumprir as finalidades para as quais foram recolhidos, ou conforme
          exigido por lei. Em geral:
        </p>
        <ul>
          <li>
            Dados de contacto: até 3 anos após o último contacto, salvo se houver
            uma relação contratual
          </li>
          <li>Dados contratuais: pelo período legalmente exigido (10 anos)</li>
          <li>
            Dados de marketing: até revogação do consentimento ou 2 anos sem
            interação
          </li>
        </ul>

        <h2>9. Os Seus Direitos</h2>
        <p>
          Nos termos do RGPD, tem os seguintes direitos relativamente aos seus
          dados pessoais:
        </p>
        <ul>
          <li>
            <strong>Direito de acesso:</strong> obter confirmação sobre o
            tratamento dos seus dados
          </li>
          <li>
            <strong>Direito de retificação:</strong> corrigir dados inexatos ou
            incompletos
          </li>
          <li>
            <strong>Direito ao apagamento:</strong> solicitar a eliminação dos
            seus dados
          </li>
          <li>
            <strong>Direito de limitação:</strong> restringir o tratamento dos
            seus dados
          </li>
          <li>
            <strong>Direito de portabilidade:</strong> receber os seus dados num
            formato estruturado
          </li>
          <li>
            <strong>Direito de oposição:</strong> opor-se ao tratamento dos seus
            dados
          </li>
          <li>
            <strong>Direito de revogação:</strong> retirar o consentimento a
            qualquer momento
          </li>
        </ul>
        <p>
          Para exercer qualquer destes direitos, contacte-nos através de{" "}
          {CONTACT_INFO.email}.
        </p>

        <h2>10. Cookies</h2>
        <p>
          O nosso website utiliza cookies. Para mais informações, consulte a nossa{" "}
          <a href="/politicas/cookies">Política de Cookies</a>.
        </p>

        <h2>11. Alterações a Esta Política</h2>
        <p>
          Reservamo-nos o direito de atualizar esta Política de Privacidade
          periodicamente. A data da última atualização será sempre indicada no
          topo desta página. Recomendamos que consulte regularmente esta página.
        </p>

        <h2>12. Contacto e Reclamações</h2>
        <p>
          Para questões relacionadas com a proteção dos seus dados pessoais ou
          para exercer os seus direitos, contacte-nos:
        </p>
        <p>
          Email: {CONTACT_INFO.email}
          <br />
          Telefone: {CONTACT_INFO.phone}
        </p>
        <p>
          Tem também o direito de apresentar reclamação junto da Comissão Nacional
          de Proteção de Dados (CNPD):
          <br />
          Website:{" "}
          <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">
            www.cnpd.pt
          </a>
        </p>
      </div>
    </Section>
  );
}

