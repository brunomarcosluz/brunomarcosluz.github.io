import React from "react";
import { I18nProvider, useI18n } from "./i18n.jsx";
import { PremiumCursor } from "./components/PremiumCursor";
import LanguageSwipeOverlay from "./components/LanguageSwipe.jsx";
import { motion, useReducedMotion } from "framer-motion";
import { navigateToHash } from "./hashRoute.js";

function BrazilFlag({ className = "h-4 w-[22px]" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 22 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="15" rx="1.5" fill="#009739" />
      <polygon points="11,1.5 18.5,7.5 11,13.5 3.5,7.5" fill="#FEDD00" />
      <circle cx="11" cy="7.5" r="3.5" fill="#012169" />
    </svg>
  );
}

function USFlag({ className = "h-4 w-[22px]" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 22 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="15" rx="1.5" fill="#B22234" />
      {Array.from({ length: 13 }).map((_, i) => (
        <rect fill="#FFFFFF" height="1" key={i} width="22" y={i * 1.15} />
      ))}
      <rect fill="#3C3B6E" height="7.5" width="10" />
    </svg>
  );
}

const caseData = [
  {
    name: "Tô de Trança",
    url: "https://todetranca.app.br/",
    typeKey: "typeMarketplace",
    year: "2026",
    sumKey: "sumTodetranca",
    preview: "/cases/todetranca.webp",
    altKey: "altTodetranca",
    palette: "from-[#f8d9ca] via-[#f7eee9] to-[#d4b6a4]",
    size: "md:col-span-8",
    ratio: "aspect-[16/9]",
    labelKeys: ["labelApp", "labelBeautyTech", "labelConversion"],
  },
  {
    name: "Atitude Som e Luz",
    url: "https://www.atitudesomeluz.com.br/",
    typeKey: "typeCorporate",
    year: "2025",
    sumKey: "sumAtitude",
    preview: "/cases/atitude.webp",
    altKey: "altAtitude",
    palette: "from-[#071615] via-[#123330] to-[#63d4d0]",
    size: "md:col-span-4",
    ratio: "aspect-square md:aspect-[3/4]",
    labelKeys: ["labelInstitutional", "labelEvents", "labelB2B"],
  },
  {
    name: "Ny Julia Braids",
    url: "https://www.nyjuliabraids.com.br/",
    typeKey: "typeBrand",
    year: "2025",
    sumKey: "sumNyJulia",
    preview: "/cases/nyjulia.webp",
    altKey: "altNyJulia",
    palette: "from-[#2b211d] via-[#a56d56] to-[#f1cdbf]",
    size: "md:col-span-5",
    ratio: "aspect-square md:aspect-[4/5]",
    labelKeys: ["labelBeauty", "labelBrand", "labelLocal"],
  },
  {
    name: "Letícia Borges",
    url: "https://portifolio-leticia-eta.vercel.app/",
    typeKey: "typeEditorial",
    year: "2026",
    sumKey: "sumLeticia",
    preview: "/cases/leticia.webp",
    altKey: "altLeticia",
    palette: "from-[#f6f0e7] via-[#e3dfd6] to-[#b3aaa0]",
    size: "md:col-span-7",
    ratio: "aspect-[16/10]",
    labelKeys: ["labelJournalism", "labelEditorial", "labelAuthority"],
  },
  {
    name: "Grão de Mostarda Clips",
    url: "https://www.graodemostardaclips.com.br/",
    typeKey: "typeLanding",
    year: "2025",
    sumKey: "sumGrao",
    preview: "/cases/graomostarda.webp",
    altKey: "altGrao",
    palette: "from-[#f4c542] via-[#f7ecb7] to-[#14110a]",
    size: "md:col-span-12",
    ratio: "aspect-[16/9] md:aspect-[21/8]",
    labelKeys: ["labelLanding", "labelOffer", "labelVideo"],
  },
];

const serviceKeys = [
  {
    titleKey: "sDesignTitle",
    textKey: "sDesignText",
    icon: <path d="M4 5h16v14H4zM8 9h8M8 13h5M15 13h1" />,
  },
  {
    titleKey: "sTechTitle",
    textKey: "sTechText",
    icon: <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" />,
  },
  {
    titleKey: "sClarityTitle",
    textKey: "sClarityText",
    icon: <path d="m4 16 5-5 4 4 7-7M15 8h5v5" />,
  },
];

function ArrowIcon({ className = "size-4" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function MiniIcon({ children }) {
  return (
    <svg
      aria-hidden="true"
      className="mb-8 size-8 text-ink"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

function ProjectPreview({ item, t }) {
  return (
    <div
      className={`spotlight-exclude group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.palette} ${item.ratio} shadow-ambient`}
    >
      <img
        alt={t(item.altKey)}
        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.035]"
        decoding="async"
        height="1080"
        loading="eager"
        src={item.preview}
        width="1440"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/0 to-white/10 opacity-80 transition duration-300 group-hover:opacity-55" />
      <div className="absolute inset-x-4 top-4 flex items-center gap-2 rounded-full border border-white/35 bg-white/70 px-4 py-3 shadow-ambient backdrop-blur-md md:inset-x-6 md:top-6">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#ffbd2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          {new URL(item.url).hostname.replace("www.", "")}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/45 bg-white/82 p-5 shadow-ambient backdrop-blur-md transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/92 md:bottom-6 md:left-6 md:right-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
            {t(item.typeKey)}
          </span>
          <span className="font-mono text-[10px] text-ink-soft">{item.year}</span>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/40 transition duration-300 group-hover:ring-ink/20" />
    </div>
  );
}

function CaseCard({ item, t }) {
  return (
    <article className={`${item.size} animate-rise`}>
      <a
        data-cursor="primary"
        className="group block rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-blue/35"
        href={item.url}
        rel="noreferrer"
        target="_blank"
        aria-label={`Abrir case ${item.name}`}
      >
        <ProjectPreview item={item} t={t} />
        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {item.labelKeys.map((key) => (
                <span
                  className="rounded-full border border-line/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
                  key={key}
                >
                  {t(key)}
                </span>
              ))}
            </div>
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">
              {item.name}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft md:text-base">
              {t(item.sumKey)}
            </p>
          </div>
          <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-blue">
            <ArrowIcon />
          </span>
        </div>
      </a>
    </article>
  );
}

function AllCaseRow({ item, index, t }) {
  return (
    <article className="group border-t border-line py-8 last:border-b md:py-10">
      <a
        data-cursor="primary"
        aria-label={`Abrir trabalho ${item.name}`}
        className="grid gap-6 outline-none focus-visible:ring-4 focus-visible:ring-blue/25 md:grid-cols-12 md:items-center"
        href={item.url}
        rel="noreferrer"
        target="_blank"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft md:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="spotlight-exclude relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper-mid shadow-ambient md:col-span-3">
          <img
            alt={t(item.altKey)}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
            decoding="async"
            height="1080"
            loading="lazy"
            src={item.preview}
            width="1440"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
        </div>
        <div className="md:col-span-3">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
            {t(item.typeKey)} / {item.year}
          </p>
          <h3 className="font-display text-3xl font-bold leading-none tracking-[-0.05em] text-ink md:text-4xl">
            {item.name}
          </h3>
        </div>
        <p className="text-sm leading-6 text-ink-soft md:col-span-3 md:text-base">
          {t(item.sumKey)}
        </p>
        <div className="flex items-center justify-between gap-4 md:col-span-2">
          <div className="hidden flex-wrap gap-2 xl:flex">
            {item.labelKeys.slice(0, 2).map((key) => (
              <span
                className="rounded-full border border-line/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft"
                key={key}
              >
                {t(key)}
              </span>
            ))}
          </div>
          <span className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition duration-300 group-hover:translate-x-1 group-hover:bg-blue">
            <ArrowIcon />
          </span>
        </div>
      </a>
    </article>
  );
}

function LangToggle({ lang, toggleLanguage }) {
  return (
    <button
      aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
      className="flex items-center gap-1.5 rounded-full border border-line/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft transition hover:border-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/30"
      onClick={toggleLanguage}
      type="button"
    >
      {lang === "pt" ? (
        <>
          <BrazilFlag />
          <span className="font-semibold">PT</span>
          <span className="text-line">/</span>
          <USFlag className="h-4 w-[22px] opacity-50" />
          <span className="opacity-50">EN</span>
        </>
      ) : (
        <>
          <BrazilFlag className="h-4 w-[22px] opacity-50" />
          <span className="opacity-50">PT</span>
          <span className="text-line">/</span>
          <USFlag />
          <span className="font-semibold">EN</span>
        </>
      )}
    </button>
  );
}

function AppContent() {
  const { t, toggleLanguage, lang, swiping } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  const whatsappBudgetUrl =
    "https://wa.me/5519996234059?text=Ol%C3%A1%2C%20vim%20pelo%20site%20gostaria%20de%20solicitar%20um%20or%C3%A7amento";

  const heroStagger = {
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.07,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const heroFadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-surface font-body text-ink selection:bg-[#111111] selection:text-white [&::-moz-selection]:bg-[#111111] [&::-moz-selection]:text-white">
      <PremiumCursor />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/35 bg-surface/78 backdrop-blur-2xl">
        <nav className="mx-auto flex h-20 max-w-frame items-center justify-between px-6 md:px-16">
          <a
            className="font-display text-lg font-bold tracking-[-0.05em] text-ink outline-none transition hover:text-blue focus-visible:ring-4 focus-visible:ring-blue/30"
            href="#top"
          >
            Bruno Luz
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {[
              { label: t("navCases"), href: "#page/cases" },
              { label: t("navServices"), href: "#servicos" },
              { label: t("navAbout"), href: "#sobre" },
            ].map(({ label, href }) => (
              <a
                key={href}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/30"
                href={href}
                onClick={(e) => {
                  if (href === "#page/cases") {
                    e.preventDefault();
                    navigateToHash(href);
                  }
                }}
              >
                {label}
              </a>
            ))}
            <LangToggle lang={lang} toggleLanguage={toggleLanguage} />
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <LangToggle lang={lang} toggleLanguage={toggleLanguage} />
          </div>
          <a
            className="hidden min-h-11 items-center rounded-full bg-ink px-6 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/30 md:inline-flex"
            href={whatsappBudgetUrl}
            rel="noreferrer"
            target="_blank"
          >
            {t("navQuote")}
          </a>
        </nav>
      </header>

      <main id="top" className="pt-24">
        <section className="relative mx-auto grid min-h-[calc(100dvh-96px)] max-w-frame grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-12 md:px-16 md:py-20">
          <div className="absolute left-1/2 top-20 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-blue/10 blur-3xl animate-drift motion-reduce:animate-none" />
          <motion.div
            className="md:col-span-7"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="max-w-4xl font-display text-5xl font-bold leading-[0.94] tracking-[-0.065em] text-ink sm:text-6xl md:text-7xl lg:text-[92px]"
              variants={heroFadeUp}
            >
              {t("heroTitle")}
            </motion.h1>
            <motion.p
              className="mt-8 max-w-2xl text-lg leading-8 text-ink-soft md:text-xl"
              variants={heroFadeUp}
            >
              {t("heroSubtitle")}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row"
              variants={heroFadeUp}
            >
              <a
                data-cursor="primary"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-7 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 ease-out hover:bg-blue hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/35"
                href="#contato"
              >
                {t("heroCTA")}
                <ArrowIcon />
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-7 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition-all duration-300 ease-out hover:border-ink hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/25"
                href="#cases"
              >
                {t("heroCases")}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative md:col-span-5"
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
          >
            <a
              aria-label="Solicitar orçamento pelo WhatsApp"
              className="spotlight-exclude group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-paper-mid via-paper to-[#c9cacd] shadow-ambient outline-none transition-all duration-[280ms] ease-out hover:-translate-y-1 hover:shadow-[0_34px_100px_-42px_rgba(26,28,29,0.46)] focus-visible:ring-4 focus-visible:ring-blue/30"
              href={whatsappBudgetUrl}
              rel="noreferrer"
              target="_blank"
            >
              <picture>
                <source srcSet="/bruno-perfil.webp" type="image/webp" />
                <img
                  alt="Retrato de Bruno Luz"
                  className="h-full w-full object-cover object-center transition-all duration-[350ms] ease-out group-hover:scale-[1.04]"
                  decoding="async"
                  fetchPriority="high"
                  height="1100"
                  src="/bruno-perfil.jpg"
                  width="1100"
                />
              </picture>
            </a>
            <motion.div
              className="absolute bottom-5 left-5 z-10 rounded-2xl border border-line/45 bg-white/95 p-6 shadow-ambient md:-bottom-6 md:-left-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                Especialidade
              </p>
              <p className="mt-2 font-display text-2xl font-bold tracking-[-0.04em]">
                Design & Engenharia
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section className="border-y border-line/35 bg-paper-soft py-7">
          <div className="mx-auto flex max-w-frame flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:px-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
              {t("marqueeLabel")}
            </span>
            <strong className="font-display text-xl tracking-[-0.04em] md:text-2xl">
              +6 de anos de experiência
            </strong>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft md:block">
              {t("marqueeTag")}
            </span>
          </div>
        </section>

        <section className="mx-auto max-w-frame px-6 py-24 md:px-16 md:py-36" id="cases">
          <div className="mb-16 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
                {t("casesTag")}
              </p>
              <h2 className="font-display text-5xl font-bold leading-none tracking-[-0.06em] md:text-7xl">
                {t("casesTitle")}
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-ink-soft md:col-span-5 md:pt-12">
              {t("casesDesc")}
            </p>
            <div className="md:col-span-12">
              <a
                data-cursor="primary"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-line px-7 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition hover:border-ink hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/25"
                href="#page/cases"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHash("#page/cases");
                }}
              >
                {t("casesViewAll")}
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-7 gap-y-20 md:grid-cols-12">
            {caseData.slice(0, 4).map((item) => (
              <CaseCard item={item} key={item.name} t={t} />
            ))}
          </div>
        </section>

        <section className="border-y border-line/30 bg-paper-soft py-24 md:py-32" id="servicos">
          <div className="mx-auto max-w-frame px-6 md:px-16">
            <div className="mb-14 grid gap-8 md:grid-cols-12">
              <h2 className="font-display text-4xl font-bold tracking-[-0.055em] md:col-span-4 md:text-5xl">
                {t("servicesTag")}
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-ink-soft md:col-span-8">
                {t("servicesDesc")}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {serviceKeys.map((service) => (
                <article
                  className="rounded-2xl border border-line/35 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-ambient"
                  key={service.titleKey}
                >
                  <MiniIcon>{service.icon}</MiniIcon>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.04em]">
                    {t(service.titleKey)}
                  </h3>
                  <p className="mt-4 leading-7 text-ink-soft">
                    {t(service.textKey)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-frame gap-10 px-6 py-24 md:grid-cols-12 md:px-16 md:py-36" id="sobre">
          <div className="md:col-span-5">
            <h2 className="font-display text-5xl font-bold leading-none tracking-[-0.06em] md:text-7xl">
              {t("aboutTitle")}
            </h2>
          </div>
          <div className="md:col-span-7">
            <div className="border-t border-line pt-7">
              <p className="max-w-3xl text-lg leading-8 text-ink-soft md:text-xl">
                {t("aboutDescription")}
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 text-center md:px-16 md:py-36" id="contato">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
            {t("contactTag")}
          </p>
          <h2 className="mx-auto max-w-4xl font-display text-5xl font-bold leading-none tracking-[-0.06em] md:text-7xl">
            {t("contactTitle")}
          </h2>
          <a
            data-cursor="primary"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/35"
            href={whatsappBudgetUrl}
            rel="noreferrer"
            target="_blank"
          >
            {t("contactCTA")}
            <ArrowIcon />
          </a>
        </section>
      </main>

      <footer className="border-t border-line/35 py-12">
        <div className="mx-auto flex max-w-frame flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-16">
          <strong className="font-display text-2xl tracking-[-0.05em]">Bruno Luz</strong>
          <div className="flex flex-wrap gap-5">
            {[t("footerInsta"), t("footerLinkedin"), t("footerWhats"), t("footerGit")].map((item) => (
              <a
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft transition hover:text-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/25"
                href={item === t("footerWhats") ? whatsappBudgetUrl : "#"}
                key={item}
                rel="noreferrer"
                target={item === t("footerWhats") ? "_blank" : undefined}
              >
                {item}
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {t("footerCopy")}
          </p>
        </div>
      </footer>
      <LanguageSwipeOverlay direction={swiping} />
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export { AppContent, caseData, AllCaseRow, ArrowIcon, LangToggle, BrazilFlag, USFlag };
export default App;
