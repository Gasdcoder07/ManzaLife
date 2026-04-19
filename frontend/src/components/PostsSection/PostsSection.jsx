import SectionTitle from "../SectionTitle";
import PostsGrid from "./PostsGrid";
import { useLanguage } from "../../context/LanguageContext";

const PostsSection = () => {
  const { textos } = useLanguage();

  return (
      <section
        id="posts"
        className="bg-zinc-50 dark:bg-zinc-950 text-white py-4 md:py-10 lg:py-12">

        <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-4 md:gap-10 lg:gap-12">
            <SectionTitle Title={textos.posts.titulo}/>

            <h3 className="text-black dark:text-white text-4xl text-center">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                    {textos.posts.titulo}{" "}
                </span>
                {textos.posts.subtitulo.split(" ").slice(1).join(" ")}
            </h3>

            <PostsGrid/>

            {/* <hr className="border border-neutral-900"/> */}
        </div>

      </section>
  );
};

export default PostsSection;