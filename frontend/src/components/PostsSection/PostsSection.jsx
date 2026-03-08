import SectionTitle from "../SectionTitle";
import PostsGrid from "./PostsGrid";

const PostsSection = () => {
  return (
      <section
        id="posts"
        className="bg-zinc-950 text-white py-4 md:py-10 lg:py-12">

        <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-4 md:gap-10 lg:gap-12">
            <SectionTitle Title={"Publicaciones"}/>

            <h3 className="text-white text-4xl text-center">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                    Publicaciones {" "}
                </span>
                recientes
            </h3>

            <PostsGrid/>

            <hr className="border border-neutral-900"/>
        </div>

      </section>
  );
};

export default PostsSection;
