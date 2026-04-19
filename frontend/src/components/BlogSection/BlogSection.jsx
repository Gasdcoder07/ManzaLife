import SideImage from "../../../imgs/HomeResources/CentroHisotrico.jpg";
import { BlogItems } from "./BlogItems";
import BlogItem from "./BlogItem";
import HowItWorksGrid from "./HowItWorksGrid";
import ActionButton from "../ActionButton";
import SectionTitle from "../SectionTitle";

import { useLanguage } from "../../context/LanguageContext";

const BlogSection = () => {
  return (
      <section
          id="blog"
          className="bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white py-4 md:py-10 lg:py-12"
      >
          <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-4 md:gap-10 lg:gap-12">
              <SectionTitle Title={"Blog"}/>

              <h3 className="text-4xl text-center">
                  El{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                      blog
                  </span>{" "}
                  más grande de Manzanillo
              </h3>

        <h3 className="text-white text-4xl text-center">
          {textos.blog.titulo_principal}
        </h3>

                          return (
                            <BlogItem
                                key={item.id}
                                Icon={Icon}
                                color={item.color}
                                text={item.text}/>
                          );
                      })}
                  </div>
                  <div className="relative w-full">
                      <img
                          className="h-full object-cover rounded-2xl shadow-xl shadow-zinc-950/40"
                          src={SideImage}
                          alt="Centro histórico"
                      />

                      <div className="absolute inset-0 dark:bg-linear-to-r from-zinc-950/70 via-zinc-950/30 to-zinc-950/70" />
                  </div>
              </div>

          <div className="relative w-full">
            <img
              className="h-full object-cover rounded-2xl"
              src={SideImage}
              alt={textos.blog.categoria}
            />
            <div className="absolute inset-0 bg-linear-to-r from-zinc-950/70 via-zinc-950/30 to-zinc-950/70" />
          </div>
        </div>

        <div className="flex justify-center items-center my-6">
          <ActionButton Path={"/blog"} Text={textos.blog.boton} />
        </div>

        <h3 className="text-2xl text-center tracking-wider">
          {textos.blog.como_funciona}
        </h3>

        <HowItWorksGrid />
      </div>
    </section>
  );
};

export default BlogSection;