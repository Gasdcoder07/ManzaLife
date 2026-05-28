import PostActionButton from "../../PostsSection/PostActionButton"
import DefaultAvatar from "../../../../imgs/DefaultAvatar.webp"
import { Link } from "react-router-dom";

const BlogPostsCard = ({Image, Category, Title, Description, Slug, AutorAvatar, AutorName, Date, isEnglish}) => {
  return (
    <article
        className="bg-[#fcfcfc] dark:bg-[#0d0d0f] hover:-translate-y-0.5 dark:hover:border-neutral-700 transition-all duration-200 ease-in-out w-full sm:h-56 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-800 rounded-xl flex flex-col sm:flex-row overflow-hidden shadow-xl relative">

        <Link to={`/blog/${Slug}`} className="absolute inset-0 z-10"/>
        
        <div className="relative h-56 w-full sm:h-full sm:w-1/3 shrink-0">
            <img
                src={Image}
                alt={Title}
                loading="lazy"
                className="w-full h-full object-cover"/>
            <div className="absolute inset-0 flex justify-start items-end py-3 px-5">
                <div className="bg-[#fcfcfc] dark:bg-neutral-800 px-3 py-2 rounded-xl">
                    <span className="text-orange-500 line-clamp-1">{Category}</span>
                </div>
            </div>
        </div>

        <div className="min-w-0 h-full flex-1 flex flex-col px-5 py-3 gap-2">
            <div className="min-w-0 w-full flex flex-col gap-2">
                <h3 className="text-lg font-bold tracking-wide truncate">{Title}</h3>

                <p className="h-20 text-neutral-500 line-clamp-3 wrap-break-word">{Description}</p>
            </div>

            <hr className="border border-neutral-300 dark:border-neutral-800 my-2"/>

            <div className="flex justify-between items-center text-sm">
                <div className="flex gap-2 items-center">
                    <img
                        src={AutorAvatar || DefaultAvatar}
                        alt={AutorName}
                        className="size-10 rounded-full object-cover border border-neutral-800"/>
                    <Link to={`/blog/profile/${AutorName}`} className="relative z-20 hover:text-orange-600 transition-colors duration-200 ease-in-out">{AutorName}</Link>
                </div>
                <div className="flex gap-2 items-center">
                    <p>{Date}</p>
                </div>
            </div>
        </div>
    </article>
  );
};

export default BlogPostsCard;