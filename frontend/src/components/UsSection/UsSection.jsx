import ActionButton from "../ActionButton";
import SectionTitle from "../SectionTitle";
import { UsSectionItems } from "./UsSectionItems";
import { useLanguage } from "../../context/LanguageContext";

const UsSection = () => {
  const { textos } = useLanguage();

  return (
      <section id="nosotros" className="bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white py-4 md:py-10 lg:py-12">
          <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-8 md:gap-10 lg:gap-12">
              <SectionTitle Title={textos.nosotros.titulo} />

              <h3 className="text-white text-4xl text-center">
                  {textos.nosotros.subtitulo}
              </h3>

              <p className="text-center max-w-3xl mx-auto tracking-widest">
                {textos.nosotros.descripcion}
              </p>

              <div className="border border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-zinc-950/40 dark:shadow-orange-600/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center rounded-md px-8 py-6 gap-12">
                    {
                        UsSectionItems.map((item, index) => {
                            const Icon = item.icon;
                            const data = textos.nosotros[item.key] || {};

                            return (
                                <div key={index} className="flex flex-col gap-4">
                                    <div className="flex justify-start">
                                        <div className="bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-full shadow-xl">
                                            <Icon className="text-xl text-orange-500"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h5 className="text-lg tracking-wider">{data.titulo}</h5>
                                        <p className="text-sm text-neutral-400 tracking-wide">{data.descripcion}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
              </div>

              <div className="flex justify-center">
                  <ActionButton Path={"/blog"} Text={textos.nosotros.boton}/>
              </div>

              {/* <hr className="border border-neutral-900" /> */}
          </div>
      </section>
  );
};

export default UsSection;