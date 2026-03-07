import { Link } from "react-router-dom";
import SideImage from "../../../imgs/HomeResources/CentroHisotrico.jpg";
import { BlogItems } from "./BlogItems";

const BlogSection = () => {
  return (
      <section
          id="blog"
          className="bg-zinc-950 text-white py-4 md:py-10 lg:py-12"
      >
          <div className="container mx-auto flex flex-col px-6 md:px-20 lg:px-32 gap-4 md:gap-10 lg:gap-12">
              <div className="flex justify-center">
                  <div className="bg-neutral-900 flex justify-center items-center py-2 px-3 rounded-full">
                      <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800 text-sm">
                          Blog
                      </span>
                  </div>
              </div>

              <h3 className="text-white text-4xl text-center">
                  El{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                      blog
                  </span>{" "}
                  más grande de Manzanillo
              </h3>

              <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center gap-6">
                  <div className="w-full flex flex-col gap-4">
                    {
                        BlogItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.id} className="flex items-center gap-4 text-lg">
                                    <div className="bg-neutral-800 py-2 px-3 rounded-xl flex justify-center items-center">
                                        <Icon className={`${item.color}`}/>
                                    </div>
                                    <p className="tracking-wide">{item.text}</p>
                                </div>
                            );
                        })
                    }
                  </div>
                  <div className="relative w-full">
                      <img
                          className="h-full object-cover rounded-2xl"
                          src={SideImage}
                          alt="Centro histórico"
                      />

                      <div className="absolute inset-0 bg-linear-to-r from-zinc-950/70 via-zinc-950/30 to-zinc-950/70" />
                  </div>
              </div>

              <div className="flex justify-center items-center">
                <Link className="bg-orange-600 w-1/2 lg:w-1/5 py-2 rounded-md hover:-translate-y-1 hover:text-zinc-950 transition-all duration-200 ease-in-out flex justify-center">
                    <span>Unete ahora</span>
                </Link>
              </div>

              <hr className="border border-neutral-900" />
          </div>
      </section>
  );
};

export default BlogSection;