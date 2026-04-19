import ActionButton from "../ActionButton";
import SectionTitle from "../SectionTitle";
import { useLanguage } from "../../context/LanguageContext";


const CTASection = () => {
  const { textos } = useLanguage();


  return (
      <section id="unete" className="bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white py-4 md:py-10 lg:py-12">
          <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-8 md:gap-10 lg:gap-12">
              <SectionTitle Title={textos.cta.titulo} />

              <h3 className="text-4xl text-center">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                      {textos.cta.titulo}
                  </span>{" "}
                  {textos.cta.subtitulo}
              </h3>

              <p className="text-center max-w-3xl mx-auto tracking-widest">
                  {textos.cta.descripcion}
              </p>

              <div className="flex justify-center">
                  <ActionButton Path={"/auth/register"} Text={textos.cta.boton} />
              </div>

              {/* <hr className="border border-neutral-900" /> */}
          </div>
      </section>
  );
};

export default CTASection;
