import { Link } from "react-router-dom";

const BlogCommunityCard = ({ Avatar, FirstName, LastName, Username, Bio }) => {
  return (
    <Link to={`/blog/profile/${Username}`} className="group h-32 rounded-xl border border-neutral-800 p-4 flex gap-6 w-full hover:border-neutral-700 hover:-translate-y-0.5 cursor-pointer transition-all duration-200 ease-in-out">
        <img
            className="shrink-0 size-16 object-cover rounded-full"
            src={Avatar}
            alt={Username} />

        <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="space-y-1">
                <p className="group-hover:text-orange-600 transition-all duration-200 ease-in-out font-medium truncate tracking-widest">@{Username}</p>
                <p className="font-light text-sm italic tracking-wide truncate">{FirstName} {LastName}</p>
            </div>
            <p className="text-neutral-500 line-clamp-1 whitespace-pre-line">{Bio ? Bio : 'En ManzaLife Papus'}</p>
        </div>
    </Link>
  );
};

export default BlogCommunityCard;
