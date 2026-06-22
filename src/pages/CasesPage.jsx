import React from "react";
import { useI18n } from "../i18n.jsx";
import { PremiumCursor } from "../components/PremiumCursor";
import { motion, useReducedMotion } from "framer-motion";
import { caseData, AllCaseRow, ArrowIcon, LangToggle, BrazilFlag, USFlag } from "../App";
import { navigateToHash } from "../hashRoute.js";

function CasesPage() {
  const { t, toggleLanguage, lang, swiping } = useI18n();
  const prefersReducedMotion = useReducedMotion();

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

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/35 bg-surface/78 backdrop-blur-2xl">
        <nav className="mx-auto flex h-20 max-w-frame items-center justify-between px-6 md:px-16">
          <a
            className="font-display text-lg font-bold tracking-[-0.05em] text-ink outline-none transition hover:text-blue focus-visible:ring-4 focus-visible:ring-blue/30"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToHash("");
            }}
          >
            Bruno Luz
          </a>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} toggleLanguage={toggleLanguage} />
          </div>
        </nav>
      </header>

      <main className="pt-24">
        {/* Hero */}
        <section className="mx-auto max-w-frame px-6 py-24 md:px-16 md:py-36">
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft"
              variants={heroFadeUp}
            >
              {t("allCasesTag")}
            </motion.p>
            <motion.h1
              className="font-display text-5xl font-bold leading-none tracking-[-0.06em] md:text-7xl"
              variants={heroFadeUp}
            >
              {t("allCasesTitle")}
            </motion.h1>
            <motion.p
              className="mt-8 max-w-xl text-lg leading-8 text-ink-soft"
              variants={heroFadeUp}
            >
              {t("allCasesDesc")}
            </motion.p>
            <motion.div variants={heroFadeUp}>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                {t("allCasesCount", caseData.length)}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* All Cases List */}
        <section className="border-y border-line/30 bg-paper-soft">
          <div className="mx-auto max-w-frame">
            {caseData.map((item, index) => (
              <AllCaseRow index={index} item={item} key={item.name} t={t} />
            ))}
          </div>
        </section>

        {/* Back to Home */}
        <section className="mx-auto max-w-frame px-6 py-24 md:px-16 md:py-36 text-center">
          <h2 className="font-display text-4xl font-bold tracking-[-0.055em] md:text-5xl">
            {t("contactTitle")}
          </h2>
          <a
            data-cursor="primary"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/35"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToHash("");
              setTimeout(() => {
                navigateToHash("#contato");
              }, 50);
            }}
          >
            {t("contactCTA")}
            <ArrowIcon />
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-line/35 py-12">
        <div className="mx-auto flex max-w-frame flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-16">
          <strong className="font-display text-2xl tracking-[-0.05em]">Bruno Luz</strong>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {t("footerCopy")}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CasesPage;
