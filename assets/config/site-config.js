/**
 * ==========================================================================
 * CENTRAL DE DADOS E LINKS (site-config.js)
 * Aprov - Landing Page
 * 
 * ATENÇÃO DE SEGURANÇA:
 * Este arquivo é 100% público e executado diretamente no navegador do visitante.
 * NUNCA insira aqui senhas, chaves de API secretas ou tokens confidenciais.
 * ==========================================================================
 */
window.SITE_CONFIG = {
  // Dados de Identidade e Cadastro da Empresa
  brand: {
    name: "Aprov",                                       // Nome fantasia / comercial da marca
    legalName: "{RAZAO_SOCIAL}",                         // Razão social registrada (CNPJ)
    cnpj: "{CNPJ}",                                       // Número do CNPJ formatado (ex: 00.000.000/0001-00)
    tagline: "Diagnóstico de crédito PJ com clareza"      // Slogan ou frase institucional curta
  },

  // Canais de Contato e Suporte
  contact: {
    whatsappDigits: "5571982630575",                   // Apenas números: DDI + DDD + Telefone (ex: 5511999999999)
    email: "{EMAIL_CONTATO}",                            // E-mail oficial de atendimento ao cliente
    instagram: ""                                        // Perfil do Instagram (opcional, ex: "aprovcredito")
  },

  // Dados da Oferta Comercial
  offer: {
    productName: "Consultoria de Crédito PJ",             // Nome do serviço/produto
    price: "R$97",                                       // Preço promocional atual de venda
    oldPrice: "R$497",                                   // Preço original (riscado)
    discountLabel: "80% OFF"                             // Selo de desconto exibido na oferta
  },

  // Rótulos dos Botões Principais (Chamadas para Ação)
  cta: {
    primaryLabel: "Agendar consultoria",                 // Botão da barra de navegação e do topo (Hero)
    offerLabel: "Adquirir minha consultoria de crédito",                  // Botão do bloco de oferta/preço
    formSubmitLabel: "IR PARA O PAGAMENTO →"             // Botão de envio dentro do formulário de checkout
  },

  // Links de Navegação e Integração
  links: {
    checkout: "https://pay.cakto.com.br/c22hr93_983384",                          // URL da página de pagamento (ex: Kiwify, Hotmart, Eduzz)
    leadWebhook: "{WEBHOOK_URL}",                        // URL opcional de webhook (CRM, n8n, Make) para captura prévia
    terms: "/termos",                                    // Página de Termos de Uso
    privacy: "/privacidade",                             // Página de Política de Privacidade
    faq: "#faq",                                         // Âncora ou página de Perguntas Frequentes
    login: ""                                            // Link da área do cliente (se houver)
  },

  // Textos Jurídicos e Rodapé
  legal: {
    // {ANO} será substituído automaticamente pelo ano atual (ex: 2026)
    footerCopyright: "© {ANO} {RAZAO_SOCIAL} · CNPJ {CNPJ}"
  }
};
