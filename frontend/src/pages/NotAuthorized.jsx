import { useLanguage } from "../context/LanguageContext";

const NotAuthorized = () => {
    const { idioma } = useLanguage();

  return (
    <div className="h-full w-full py-4 flex justify-center items-center">
        <div className="text-center flex flex-col gap-4">
            <span className="text-3xl font-semibold">403</span>
            <h3 className="text-2xl">{idioma === "en" ? "Access Denied" : "Acceso Denegado"}</h3>
            <p className="text-xl">{idioma === "en" ? "You do not have permission to access this page." : "No tienes permiso para acceder a esta página."}</p>
        </div>
    </div>
  );
};

export default NotAuthorized;
