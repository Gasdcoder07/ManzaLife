import ActionButton from "../ActionButton";
import SectionTitle from "../SectionTitle";

const CTASection = () => {
  return (
      <section id="unete" className="bg-zinc-950 text-white py-4 md:py-10 lg:py-12">
          <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-8 md:gap-10 lg:gap-12">
              <SectionTitle Title={"Únete"} />

              <h3 className="text-white text-4xl text-center">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                      Únete
                  </span>{" "}
                  a la comunidad
              </h3>

              <p className="text-center max-w-3xl mx-auto tracking-widest">
                  Descubre nuevos lugares, comparte experiencias y mantente al
                  día con las mejores recomendaciones para disfrutar Manzanillo.
              </p>

              <div className="flex justify-center">
                  <ActionButton Path={"/auth/register"} Text={"Crea tu cuenta"} />
              </div>

              <hr className="border border-neutral-900" />
          </div>
      </section>
  );
};

export default CTASection;
