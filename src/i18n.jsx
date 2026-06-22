import React, { createContext, useCallback, useContext, useRef, useState } from "react";

const pt = {
  navCases: "Cases",
  navServices: "Serviços",
  navAbout: "Sobre",
  navQuote: "Solicitar orçamento",

  heroTitle:
    "Transformo sua presença digital em uma máquina de autoridade e vendas.",
  heroSubtitle:
    "Construo sites, apps e landing pages com rigor visual, performance e clareza comercial para negócios que não podem parecer improvisados.",
  heroCTA: "Iniciar projeto",
  heroCases: "Ver cases",

  marqueeLabel: "Tecnologia testada em campo",
  marqueeTag: "Rigor técnico absoluto",

  casesTag: "Portfolio selecionado",
  casesTitle: "Casos Selecionados",
  casesDesc:
    "Cada projeto combina posicionamento, interface e implementação para resolver um objetivo de negócio específico: vender, agendar, posicionar autoridade ou simplificar uma operação.",
  casesViewAll: "Ver todos os cases",

  allCasesTag: "Arquivo completo",
  allCasesTitle: "Todos os cases",
  allCasesDesc:
    "Uma visão completa dos trabalhos publicados, organizada como um índice editorial: direto, escaneável e com preview real de cada entrega.",
  allCasesCount(n) {
    return `${String(n).padStart(2, "0")} trabalhos publicados`;
  },

  servicesTag: "Proposta de valor",
  servicesDesc:
    "Não apenas criamos sites. Desenvolvemos ativos digitais projetados para escalar operações e solidificar a percepção de valor da sua marca.",
  sDesignTitle: "Design que vende",
  sDesignText:
    "Interfaces meticulosamente desenhadas para converter. Aplicamos princípios de psicologia visual e hierarquia tipográfica suíça para guiar a atenção do usuário.",
  sTechTitle: "Robustez Técnica",
  sTechText:
    "Código limpo, performance otimizada e arquitetura escalável. Experiência comprovada em sistemas críticos para garantir estabilidade absoluta.",
  sClarityTitle: "Clareza comercial",
  sClarityText:
    "Eliminamos o jargão técnico. Entregamos soluções focadas em métricas reais de negócios, alinhando o produto digital aos seus objetivos financeiros.",

  aboutTitle: "Sobre mim",
  aboutDescription:
    "Muitas empresas possuem sites que funcionam apenas como 'cartões de visita' caros e ineficientes. Como fundador da Ambitie, meu trabalho é mudar esse cenário. Aos 24 anos, aplico minha expertise no desenvolvimento de sistemas hospitalares de alta complexidade para criar soluções digitais que realmente movem o ponteiro do seu faturamento. Acredito que a tecnologia deve trabalhar para você, e não o contrário. Por isso, foco em desenvolver ferramentas que transmitem confiança imediata e facilitam a jornada de compra do seu cliente, do primeiro clique ao agendamento final.",

  contactTag: "Próximo projeto",
  contactTitle: "Pronto para elevar o nível do seu negócio?",
  contactCTA: "Falar no WhatsApp",

  footerCopy: "© 2026 Bruno Luz. Built with precision.",
  footerInsta: "Instagram",
  footerLinkedin: "LinkedIn",
  footerWhats: "WhatsApp",
  footerGit: "GitHub",

  typeMarketplace: "Marketplace App",
  typeCorporate: "Corporate Site",
  typeBrand: "Brand Website",
  typeEditorial: "Editorial Portfolio",
  typeLanding: "Landing Page",

  labelApp: "App",
  labelBeautyTech: "Beauty Tech",
  labelConversion: "Conversão",
  labelInstitutional: "Institucional",
  labelEvents: "Eventos",
  labelB2B: "B2B",
  labelBeauty: "Beleza",
  labelBrand: "Marca",
  labelLocal: "Local",
  labelJournalism: "Jornalismo",
  labelEditorial: "Editorial",
  labelAuthority: "Autoridade",
  labelLanding: "Landing",
  labelOffer: "Oferta",
  labelVideo: "Vídeo",

  sumTodetranca:
    "Produto digital para o ecossistema de tranças, com experiência pensada para descoberta, confiança e conversão.",
  sumAtitude:
    "Site institucional para uma operação audiovisual que precisa transmitir estrutura, precisão e capacidade técnica.",
  sumNyJulia:
    "Presença digital para salão de tranças em Campinas, combinando estética premium e clareza para agendamento.",
  sumLeticia:
    "Portfólio jornalístico para posicionar atuação em reportagem de campo, segurança pública e cobertura ao vivo.",
  sumGrao:
    "Landing page de campanha para cortes de pregação, com planos, prova de resultado e CTA direto para compra.",

  altTodetranca: "Preview do site Tô de Trança",
  altAtitude: "Preview do site Atitude Som e Luz",
  altNyJulia: "Preview do site Ny Julia Braids",
  altLeticia: "Preview do site Letícia Borges",
  altGrao: "Preview do site Grão de Mostarda Clips",
};

const en = {
  navCases: "Cases",
  navServices: "Services",
  navAbout: "About",
  navQuote: "Get a quote",

  heroTitle:
    "Turning your digital presence into an authority and sales machine.",
  heroSubtitle:
    "I build websites, apps and landing pages with visual rigor, performance and commercial clarity for businesses that can't afford to look improvised.",
  heroCTA: "Start project",
  heroCases: "View cases",

  marqueeLabel: "Field-tested technology",
  marqueeTag: "Absolute technical rigor",

  casesTag: "Selected portfolio",
  casesTitle: "Selected Cases",
  casesDesc:
    "Each project combines positioning, interface, and implementation to solve a specific business goal: sell, book, position authority, or streamline an operation.",
  casesViewAll: "View all cases",

  allCasesTag: "Full archive",
  allCasesTitle: "All cases",
  allCasesDesc:
    "A complete view of published work, organized as an editorial index: direct, scannable, with a real preview of each deliverable.",
  allCasesCount(n) {
    return `${String(n).padStart(2, "0")} published works`;
  },

  servicesTag: "Value proposition",
  servicesDesc:
    "We don't just create websites. We develop digital assets designed to scale operations and solidify your brand's perceived value.",
  sDesignTitle: "Design that sells",
  sDesignText:
    "Interfaces meticulously designed to convert. We apply visual psychology principles and Swiss typographic hierarchy to guide user attention.",
  sTechTitle: "Technical Robustness",
  sTechText:
    "Clean code, optimized performance, and scalable architecture. Proven experience in critical systems to guarantee absolute stability.",
  sClarityTitle: "Commercial clarity",
  sClarityText:
    "We eliminate technical jargon. We deliver solutions focused on real business metrics, aligning the digital product with your financial objectives.",

  aboutTitle: "About me",
  aboutDescription:
    "Many companies have websites that function only as expensive, inefficient digital business cards. As the founder of Ambitie, my work is to change that. At 24, I apply my expertise in developing highly complex hospital systems to create digital solutions that genuinely move your revenue needle. I believe technology should work for you, not the other way around. That is why I focus on building tools that communicate immediate trust and make your customer's buying journey easier, from the first click to the final booking.",

  contactTag: "Next project",
  contactTitle: "Ready to level up your business?",
  contactCTA: "Talk on WhatsApp",

  footerCopy: "© 2026 Bruno Luz. Built with precision.",
  footerInsta: "Instagram",
  footerLinkedin: "LinkedIn",
  footerWhats: "WhatsApp",
  footerGit: "GitHub",

  typeMarketplace: "Marketplace App",
  typeCorporate: "Corporate Site",
  typeBrand: "Brand Website",
  typeEditorial: "Editorial Portfolio",
  typeLanding: "Landing Page",

  labelApp: "App",
  labelBeautyTech: "Beauty Tech",
  labelConversion: "Conversion",
  labelInstitutional: "Corporate",
  labelEvents: "Events",
  labelB2B: "B2B",
  labelBeauty: "Beauty",
  labelBrand: "Brand",
  labelLocal: "Local",
  labelJournalism: "Journalism",
  labelEditorial: "Editorial",
  labelAuthority: "Authority",
  labelLanding: "Landing",
  labelOffer: "Offer",
  labelVideo: "Video",

  sumTodetranca:
    "Digital product for the braid ecosystem, with an experience designed for discovery, trust, and conversion.",
  sumAtitude:
    "Corporate site for an audiovisual operation that needs to convey structure, precision, and technical capability.",
  sumNyJulia:
    "Digital presence for a braid salon in Campinas, combining premium aesthetics and clear scheduling.",
  sumLeticia:
    "Journalistic portfolio to position expertise in field reporting, public safety, and live coverage.",
  sumGrao:
    "Campaign landing page for sermon clips, with plans, proof of results, and a direct CTA to purchase.",

  altTodetranca: "Preview of Tô de Trança website",
  altAtitude: "Preview of Atitude Som e Luz website",
  altNyJulia: "Preview of Ny Julia Braids website",
  altLeticia: "Preview of Letícia Borges website",
  altGrao: "Preview of Grão de Mostarda Clips website",
};

const translations = { pt, en };

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("pt");
  const [swiping, setSwiping] = useState(null); // 'pt' | 'en' | null
  const langTimer = useRef(null);
  const swipeTimer = useRef(null);

  const t = useCallback(
    (key, ...args) => {
      const dict = translations[lang];
      const val = dict[key];
      return typeof val === "function" ? val(...args) : val ?? key;
    },
    [lang],
  );

  const toggleLanguage = useCallback(() => {
    if (swiping) return;

    const nextLang = lang === "pt" ? "en" : "pt";
    setSwiping(nextLang);

    langTimer.current = setTimeout(() => {
      setLang(nextLang);
    }, 500);

    swipeTimer.current = setTimeout(() => {
      setSwiping(null);
    }, 4000);
  }, [lang, swiping]);

  return (
    <I18nContext.Provider value={{ t, toggleLanguage, lang, swiping }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
