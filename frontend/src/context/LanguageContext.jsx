import { createContext, useContext, useEffect, useState } from "react";
import es from "../locales/es.json";
import en from "../locales/en.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [idioma, setIdioma] = useState(() => {
    const saved = localStorage.getItem("language");
    return saved ? saved : "es"; 
  });

  const textos = idioma === "es" ? es : en;

  useEffect(() => {
    localStorage.setItem("language", idioma);
  }, [idioma]);

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma, textos }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);