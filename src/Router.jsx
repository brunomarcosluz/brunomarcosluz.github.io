import React from "react";

import { AppContent } from "./App.jsx";
import { I18nProvider } from "./i18n.jsx";
import CasesPage from "./pages/CasesPage.jsx";

function Router() {
  const [page, setPage] = React.useState(() => {
    const hash = window.location.hash;
    return hash === "#page/cases" ? "cases" : "home";
  });

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setPage(hash === "#page/cases" ? "cases" : "home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <React.StrictMode>
      <I18nProvider>{page === "cases" ? <CasesPage /> : <AppContent />}</I18nProvider>
    </React.StrictMode>
  );
}

export default Router;
