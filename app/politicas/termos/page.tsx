import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termos e Condições - Neomarca",
  description: "Termos e condições de utilização dos serviços da Neomarca.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermosPage() {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1>Termos e Condições</h1>
        <p className="text-gray-600">
          <em>Última atualização: {new Date().toLocaleDateString("pt-PT")}</em>
        </p>

        <h2>1. Objeto</h2>
        <p>
          Os presentes Termos e Condições regulam a utilização do website da
          Neomarca e a prestação de serviços de consultoria, apoio ao
          financiamento, fundos comunitários e benefícios fiscais. Ao utilizar
          o nosso website ou contratar os nossos serviços, o utilizador aceita
          integralmente estes Termos e Condições.
        </p>

        <h2>2. Identificação da Entidade</h2>
        <p>
          <strong>Neomarca</strong>
          <br />
          Morada: {CONTACT_INFO.address.street}, {CONTACT_INFO.address.postalCode}{" "}
          {CONTACT_INFO.address.city}
          <br />
          Email: {CONTACT_INFO.email}
          <br />
          Telefone: {CONTACT_INFO.phone}
          {CONTACT_INFO.mobile ? ` / ${CONTACT_INFO.mobile}` : ""}
        </p>

        <h2>3. Serviços Prestados</h2>
        <p>A Neomarca presta os seguintes serviços:</p>
        <ul>
          <li>
            <strong>Consultoria de Gestão:</strong> apoio estratégico e
            operacional a empresas e empreendedores
          </li>
          <li>
            <strong>Fundos Comunitários:</strong> apoio na candidatura e gestão
            de fundos europeus (PRR, Portugal 2030, Horizonte Europa, MAR 2030)
          </li>
          <li>
            <strong>Benefícios Fiscais:</strong> apoio na candidatura a
            benefícios fiscais, incluindo SIFIDE
          </li>
          <li>
            <strong>Consultoria de Marketing e Vendas:</strong> estratégias de
            crescimento e desenvolvimento comercial
          </li>
          <li>
            <strong>Apoio à Internacionalização:</strong> expansão para novos
            mercados e desenvolvimento de parcerias internacionais
          </li>
        </ul>

        <h2>4. Utilização do Website</h2>
        <p>
          Ao utilizar este website, o utilizador compromete-se a:
        </p>
        <ul>
          <li>Fornecer informações verdadeiras e atualizadas</li>
          <li>Não utilizar o website para fins ilegais ou não autorizados</li>
          <li>
            Não tentar aceder a áreas restritas do website sem autorização
          </li>
          <li>
            Não transmitir vírus, malware ou qualquer código malicioso
          </li>
          <li>
            Respeitar os direitos de propriedade intelectual da Neomarca e de
            terceiros
          </li>
        </ul>

        <h2>5. Propriedade Intelectual</h2>
        <p>
          Todos os conteúdos do website, incluindo textos, imagens, logotipos,
          gráficos, vídeos e software, são propriedade da Neomarca ou dos seus
          licenciadores e estão protegidos pelas leis de propriedade
          intelectual aplicáveis.
        </p>
        <p>
          É proibida a reprodução, distribuição, modificação ou utilização
          comercial de qualquer conteúdo sem autorização prévia por escrito da
          Neomarca.
        </p>

        <h2>6. Contratação de Serviços</h2>
        <p>
          A contratação de serviços da Neomarca está sujeita à celebração de um
          contrato específico que define:
        </p>
        <ul>
          <li>Âmbito e descrição dos serviços</li>
          <li>Condições de pagamento e valores</li>
          <li>Prazos de execução</li>
          <li>Obrigações de ambas as partes</li>
          <li>Condições de rescisão</li>
        </ul>

        <h2>7. Preços e Pagamento</h2>
        <p>
          Os preços dos serviços são estabelecidos individualmente em função da
          complexidade do projeto. Os valores apresentados em propostas
          comerciais são válidos pelo período nelas indicado.
        </p>
        <p>As condições de pagamento incluem normalmente:</p>
        <ul>
          <li>Pagamento inicial (sinal) à assinatura do contrato</li>
          <li>Pagamentos intercalares conforme faseamento do projeto</li>
          <li>Pagamento final após entrega e aprovação</li>
        </ul>
        <p>
          O não cumprimento dos prazos de pagamento pode resultar na suspensão
          dos serviços e cobrança de juros de mora.
        </p>

        <h2>8. Obrigações do Cliente</h2>
        <p>O cliente compromete-se a:</p>
        <ul>
          <li>
            Fornecer toda a informação e documentação necessária de forma
            completa e atempada
          </li>
          <li>Colaborar ativamente no desenvolvimento do projeto</li>
          <li>Responder a solicitações da Neomarca dentro dos prazos acordados</li>
          <li>Efetuar os pagamentos nos prazos estabelecidos</li>
          <li>
            Informar imediatamente sobre qualquer alteração relevante ao projeto
          </li>
        </ul>

        <h2>9. Responsabilidade</h2>
        <p>
          A Neomarca compromete-se a prestar os seus serviços com diligência,
          competência e profissionalismo, de acordo com as melhores práticas do
          setor.
        </p>
        <p>A responsabilidade da Neomarca está limitada a:</p>
        <ul>
          <li>Danos diretos comprovadamente causados por negligência</li>
          <li>
            Valor máximo correspondente aos honorários pagos pelo projeto em
            questão
          </li>
        </ul>
        <p>A Neomarca não é responsável por:</p>
        <ul>
          <li>
            Decisões de aprovação ou recusa de candidaturas por entidades
            financiadoras
          </li>
          <li>
            Atrasos causados por falta de colaboração ou informação do cliente
          </li>
          <li>Alterações legislativas ou regulamentares</li>
          <li>
            Danos indiretos, perda de lucros ou oportunidades de negócio
          </li>
        </ul>

        <h2>10. Confidencialidade</h2>
        <p>
          A Neomarca compromete-se a manter confidencial toda a informação
          recebida dos clientes, não a divulgando a terceiros sem autorização
          prévia, exceto quando legalmente obrigada.
        </p>
        <p>
          O cliente autoriza a Neomarca a mencionar o projeto nos seus
          materiais de divulgação, salvo se expressamente indicado em contrário.
        </p>

        <h2>11. Proteção de Dados Pessoais</h2>
        <p>
          O tratamento de dados pessoais é efetuado em conformidade com o RGPD
          e a legislação aplicável. Para mais informações, consulte a nossa{" "}
          <a href="/politicas/privacidade">Política de Privacidade</a>.
        </p>

        <h2>12. Rescisão</h2>
        <p>
          Qualquer das partes pode rescindir o contrato de prestação de
          serviços mediante notificação escrita, com antecedência mínima de 30
          dias, salvo acordo diferente.
        </p>
        <p>Em caso de rescisão:</p>
        <ul>
          <li>
            Os serviços prestados até à data serão faturados proporcionalmente
          </li>
          <li>
            O cliente é responsável pelo pagamento de trabalhos já executados
          </li>
          <li>
            A Neomarca entregará todos os documentos e trabalhos realizados até
            à data
          </li>
        </ul>

        <h2>13. Força Maior</h2>
        <p>
          Nenhuma das partes será responsável pelo não cumprimento das suas
          obrigações em caso de força maior, incluindo catástrofes naturais,
          guerras, greves, alterações legislativas ou outras circunstâncias
          imprevisíveis e inevitáveis.
        </p>

        <h2>14. Modificação dos Termos</h2>
        <p>
          A Neomarca reserva-se o direito de modificar estes Termos e Condições
          a qualquer momento. As alterações entrarão em vigor imediatamente após
          a sua publicação no website. A continuação da utilização do website
          após as alterações constitui aceitação dos novos termos.
        </p>

        <h2>15. Resolução de Litígios</h2>
        <p>
          Para a resolução de qualquer litígio emergente destes Termos e
          Condições, as partes acordam em primeiro lugar tentar uma resolução
          amigável através de negociação.
        </p>
        <p>
          Na impossibilidade de acordo, será competente o foro da comarca de
          Faro, com expressa renúncia a qualquer outro.
        </p>

        <h2>16. Legislação Aplicável</h2>
        <p>
          Estes Termos e Condições são regidos pela legislação portuguesa.
        </p>

        <h2>17. Disposições Gerais</h2>
        <ul>
          <li>
            Se alguma disposição destes Termos for considerada inválida, as
            restantes disposições mantêm-se em vigor
          </li>
          <li>
            A tolerância de qualquer das partes ao incumprimento não constitui
            renúncia aos seus direitos
          </li>
          <li>
            Quaisquer aditamentos ou alterações devem ser formalizados por
            escrito
          </li>
        </ul>

        <h2>18. Contactos</h2>
        <p>
          Para questões relacionadas com estes Termos e Condições, contacte-nos:
        </p>
        <p>
          Email: {CONTACT_INFO.email}
          <br />
          Telefone: {CONTACT_INFO.phone}
          {CONTACT_INFO.mobile ? ` / ${CONTACT_INFO.mobile}` : ""}
          <br />
          Morada: {CONTACT_INFO.address.street}, {CONTACT_INFO.address.postalCode}{" "}
          {CONTACT_INFO.address.city}
        </p>

        <h2>19. Livro de Reclamações</h2>
        <p>
          Em caso de reclamação, o cliente pode recorrer ao Livro de Reclamações
          Online disponível em{" "}
          <a
            href="https://www.livroreclamacoes.pt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.livroreclamacoes.pt
          </a>
          .
        </p>
      </div>
    </Section>
  );
}

