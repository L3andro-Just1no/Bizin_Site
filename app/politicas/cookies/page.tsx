import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Política de cookies - Neomarca",
  description: "Política de utilização de cookies do website da Neomarca.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CookiesPage() {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Política de cookies</h1>
        <p className="text-gray-600">
          <em>Última atualização: {new Date().toLocaleDateString("pt-PT")}</em>
        </p>

        <h2>1. O que são cookies?</h2>
        <p>
          Cookies são pequenos ficheiros de texto que são armazenados no seu
          dispositivo (computador, tablet ou telemóvel) quando visita um website.
          Os cookies permitem que o website reconheça o seu dispositivo e
          armazene algumas informações sobre as suas preferências ou ações
          passadas.
        </p>

        <h2>2. Como utilizamos cookies</h2>
        <p>
          O website da Neomarca utiliza cookies para melhorar a sua experiência
          de navegação e para nos ajudar a entender como o site é utilizado.
          Utilizamos cookies para:
        </p>
        <ul>
          <li>Manter as suas preferências e definições</li>
          <li>Analisar o tráfego e comportamento no website</li>
          <li>Melhorar o desempenho do site</li>
          <li>Personalizar conteúdo e anúncios</li>
        </ul>

        <h2>3. Tipos de cookies utilizados</h2>

        <h3>3.1 Cookies essenciais</h3>
        <p>
          Estes cookies são necessários para o funcionamento básico do website e
          não podem ser desativados. Incluem cookies que permitem:
        </p>
        <ul>
          <li>Navegação básica no site</li>
          <li>Acesso a áreas seguras</li>
          <li>Memorização de escolhas de cookies</li>
        </ul>

        <h3>3.2 Cookies analíticos</h3>
        <p>
          Estes cookies permitem-nos analisar como os visitantes utilizam o
          website, para que possamos melhorar a experiência do utilizador. Os
          dados recolhidos são anónimos e agregados. Utilizamos:
        </p>
        <ul>
          <li>
            <strong>Google Analytics:</strong> para análise de tráfego e
            comportamento dos utilizadores
          </li>
        </ul>

        <h3>3.3 Cookies de marketing (opcional)</h3>
        <p>
          Estes cookies podem ser utilizados para apresentar anúncios relevantes
          e medir a eficácia das campanhas de marketing. Apenas são ativados com
          o seu consentimento explícito.
        </p>

        <h2>4. Cookies de terceiros</h2>
        <p>
          Alguns cookies são colocados por serviços de terceiros que aparecem nas
          nossas páginas. Não temos controlo sobre estes cookies. Estes serviços
          incluem:
        </p>
        <ul>
          <li>Google Analytics (análise de tráfego)</li>
          <li>Google Fonts (tipografia)</li>
        </ul>
        <p>
          Estes serviços têm as suas próprias políticas de privacidade e cookies.
        </p>

        <h2>5. Gestão de cookies</h2>
        <p>
          Pode gerir as suas preferências de cookies através do banner de
          consentimento que aparece quando visita o nosso website pela primeira
          vez. Pode também gerir ou eliminar cookies através das definições do
          seu navegador.
        </p>

        <h3>Como desativar cookies no seu navegador:</h3>
        <ul>
          <li>
            <strong>Chrome:</strong> Definições {"> "}Privacidade e segurança {"> "}
            Cookies
          </li>
          <li>
            <strong>Firefox:</strong> Opções {"> "}Privacidade e segurança {"> "}
            Cookies
          </li>
          <li>
            <strong>Safari:</strong> Preferências {"> "}Privacidade
          </li>
          <li>
            <strong>Edge:</strong> Definições {"> "}Cookies e permissões do site
          </li>
        </ul>

        <p>
          <strong>Nota:</strong> A desativação de alguns cookies pode afetar a
          funcionalidade do website.
        </p>

        <h2>6. Duração dos cookies</h2>
        <p>Os cookies que utilizamos têm diferentes durações:</p>
        <ul>
          <li>
            <strong>Cookies de Sessão:</strong> temporários, eliminados quando
            fecha o navegador
          </li>
          <li>
            <strong>Cookies Persistentes:</strong> permanecem no seu dispositivo
            por um período definido (normalmente até 24 meses)
          </li>
        </ul>

        <h2>7. Tabela de cookies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Nome
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Tipo
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Finalidade
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Duração
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  cookie_consent
                </td>
                <td className="border border-gray-300 px-4 py-2">Essencial</td>
                <td className="border border-gray-300 px-4 py-2">
                  Armazena a sua preferência de cookies
                </td>
                <td className="border border-gray-300 px-4 py-2">12 meses</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">_ga</td>
                <td className="border border-gray-300 px-4 py-2">Analítico</td>
                <td className="border border-gray-300 px-4 py-2">
                  Google Analytics - Distinção de utilizadores
                </td>
                <td className="border border-gray-300 px-4 py-2">24 meses</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">_ga_*</td>
                <td className="border border-gray-300 px-4 py-2">Analítico</td>
                <td className="border border-gray-300 px-4 py-2">
                  Google Analytics - Estado da sessão
                </td>
                <td className="border border-gray-300 px-4 py-2">24 meses</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>8. Atualização desta política</h2>
        <p>
          Podemos atualizar esta Política de Cookies periodicamente. Quaisquer
          alterações serão publicadas nesta página com uma data de atualização
          revista.
        </p>

        <h2>9. Contacto</h2>
        <p>
          Se tiver questões sobre a nossa utilização de cookies, contacte-nos
          através da nossa{" "}
          <a href="/contactos">página de contactos</a> ou por email.
        </p>
      </div>
    </Section>
  );
}

