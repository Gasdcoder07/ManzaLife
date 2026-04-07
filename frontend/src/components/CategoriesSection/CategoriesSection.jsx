import CategoriesGrid from "./CategoriesGrid";
import ActionButton from "../ActionButton";
import SectionTitle from "../SectionTitle";

const CategoriesSection = () => {
  return (
      <section id="categorias" className="min-h-screen bg-zinc-950 py-4 md:py-10 lg:py-12">
          <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-8 md:gap-10 lg:gap-12">

            <SectionTitle Title={"Categorías"}/>

              <h3 className="text-white text-4xl text-center">
                  Nuestras{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                      categorías
                  </span>
              </h3>

                <CategoriesGrid/>

                <div className="flex justify-center items-center">
                    <ActionButton Path={"/blog/categories"} Text={"Explorar categorías"}/>
                </div>

              {/* <hr className="border border-neutral-900"/> */}

          </div>
      </section>
  );
};

export default CategoriesSection;