import ActionButton from "../ActionButton";
import SectionTitle from "../SectionTitle";
import { UsSectionItems } from "./UsSectionItems";

const UsSection = () => {
  return (
      <section id="nosotros" className="bg-zinc-950 text-white py-4 md:py-10 lg:py-12">
          <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-8 md:gap-10 lg:gap-12">
              <SectionTitle Title={"Nosotros"} />

              <h3 className="text-white text-4xl text-center">
                  ¿Por qué explorar con{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                      nosotros
                  </span>{" "}
                  ?
              </h3>

              <p className="text-center max-w-3xl mx-auto tracking-widest">
                En Manza<span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">Life</span> te ayudamos a descubrir lo mejor de Manzanillo. Compartimos recomendaciones reales, lugares imperdibles y experiencias para que disfrutes al máximo tu visita.
              </p>

              <div className="border border-neutral-800 shadow-2xl shadow-orange-600/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center rounded-md px-8 py-6 gap-12">
                    {
                        UsSectionItems.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div key={index} className="flex flex-col gap-4">
                                    <div className="flex justify-start">
                                        <div className="bg-neutral-800 px-3 py-2 rounded-full">
                                            <Icon className="text-xl text-orange-500"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h5 className="text-lg tracking-wider">{item.title}</h5>
                                        <p className="text-sm text-neutral-400 tracking-wide">{item.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
              </div>

              <div className="flex justify-center">
                  <ActionButton Path={"/blog"} Text={"Explorar lugares"}/>
              </div>

              {/* <hr className="border border-neutral-900" /> */}
          </div>
      </section>
  );
};

export default UsSection;
