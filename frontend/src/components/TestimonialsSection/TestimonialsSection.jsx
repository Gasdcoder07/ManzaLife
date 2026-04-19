import SectionTitle from "../SectionTitle";
import TestimonialsGrid from "./TestimonialsGrid";
import { useLanguage } from "../../context/LanguageContext";

const TestimonialsSection = () => {
  const { textos } = useLanguage();

  return (
    <section
        id="testimonios"
        className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-4 md:py-10 lg:py-12">
          <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-8 md:gap-10 lg:gap-12">
                <SectionTitle Title={textos.testimonials.titulo}/>

                <h3 className="text-zinc-950 dark:text-white text-4xl text-center">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                        {textos.testimonials.titulo}{" "}
                    </span>
                    {textos.testimonials.subtitulo}
                </h3>

                <TestimonialsGrid/>

                {/* <hr className="border border-neutral-900"/> */}

          </div>
    </section>
  )
};

export default TestimonialsSection;