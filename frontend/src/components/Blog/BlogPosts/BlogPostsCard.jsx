import PostActionButton from "../../PostsSection/PostActionButton"
import DefaultAvatar from "../../../../imgs/DefaultAvatar.webp"
import { Link } from "react-router-dom";

const BlogPostsCard = ({Image, Category, Title, Description, Slug, AutorAvatar, AutorName, Date}) => {
  return (
    <Link
        to={`/blog/${Slug}`}
        className="bg-zinc-50 dark:bg-transparent group hover:-translate-y-0.5 hover:border-neutral-700 transition-all duration-200 ease-in-out w-full sm:h-56 border border-neutral-800 rounded-xl flex flex-col sm:flex-row overflow-hidden shadow-xl">
        <div className="relative h-56 w-full sm:h-full sm:w-1/3 shrink-0">
            <img
                src={Image}
                alt={Title}
                loading="lazy"
                className="w-full h-full object-cover"/>
            <div className="absolute inset-0 flex justify-start items-end py-3 px-5">
                <div className="bg-neutral-800 px-3 py-2 rounded-xl">
                    <span className="text-orange-500 line-clamp-1">{Category}</span>
                </div>
            </div>
        </div>
        <div className="flex-1 flex flex-col px-5 py-3 gap-2">
            <h3 className="text-lg font-bold tracking-wide truncate">
                {Title}
            </h3>

            <div className="h-24 sm:flex-1 overflow-hidden overflow-y-scroll no-scrollbar">
                <p className="text-neutral-500">
                    {Description}
                </p>
            </div>

            <div className="flex justify-end my-2">
                <PostActionButton/>
            </div>

            <hr className="border border-neutral-800 my-2" />

            <div className="flex justify-between items-center text-sm">
                <div className="flex gap-2 items-center">
                    <img
                        src={AutorAvatar || DefaultAvatar}
                        alt={AutorName}
                        className="size-10 rounded-full object-cover border border-neutral-800"/>
                    <p>{AutorName}</p>
                </div>
                <div className="flex gap-2 items-center">
                    {/* <MdOutlineDateRange /> */}
                    <p>{Date}</p>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default BlogPostsCard;