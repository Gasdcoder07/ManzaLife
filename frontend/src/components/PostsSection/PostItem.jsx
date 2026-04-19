import { Link } from 'react-router-dom'
import PostActionButton from "./PostActionButton";
import { MdOutlineDateRange } from "react-icons/md";
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp"

const PostItem = ({Image, Category, Title, Description, Slug, AutorAvatar, AutorName, Date}) => {
    return (
        <Link to={`/blog/${Slug}`} className="bg-linear-to-b w-sm from-orange-500 via-orange-600 to-orange-700 rounded-xl overflow-hidden max-w-sm hover:-translate-y-1 transition-all duration-200 ease-in-out shadow-md shadow-zinc-950/60">
            <div className="relative">
                <img
                    src={Image}
                    alt={Title}
                    className="w-full object-cover h-54"
                />
                <div className="absolute inset-0 flex justify-start items-end py-3 px-5">
                    <div className="bg-neutral-800 px-3 py-2 rounded-xl">
                        <p className="text-orange-500">{Category}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-8 py-3 gap-2">
                <h3 className="text-xl font-bold tracking-wide truncate">
                    {Title}
                </h3>

                <div className="h-24 overflow-hidden overflow-y-scroll no-scrollbar">
                    <p className="text-neutral-900">
                        {Description}
                    </p>
                </div>

                <div className="flex justify-end my-2">
                    <PostActionButton Slug={Slug}/>
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
                        <MdOutlineDateRange />
                        <p>{Date}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostItem;
