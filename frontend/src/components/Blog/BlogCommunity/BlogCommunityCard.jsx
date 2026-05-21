import { Link } from "react-router-dom";

const BlogCommunityCard = ({ Avatar, FirstName, LastName, Username, Bio, isEnglish }) => {
  return (
    <Link to={`/blog/profile/${Username}`} className="bg-[#fcfcfc] dark:bg-[#0d0d0f] group h-32 rounded-xl border border-neutral-300 dark:border-neutral-800 p-4 flex gap-6 w-full hover:border-neutral-400 dark:hover:border-neutral-700 hover:-translate-y-0.5 cursor-pointer transition-all duration-200 ease-in-out shadow-xl">
        <img
            className="shrink-0 size-16 object-cover rounded-full border border-zinc-950"
            src={Avatar}
            alt={Username} />

        <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="space-y-1">
                <p className="group-hover:text-orange-600 transition-all duration-200 ease-in-out font-medium truncate tracking-widest">@{Username}</p>
                <p className="font-light text-sm italic tracking-wide truncate">{FirstName} {LastName}</p>
            </div>
            <p className="text-neutral-500 line-clamp-1 whitespace-pre-line">{Bio ? Bio : isEnglish ? 'Exploring Manzalife 🌴' : 'Explorando Manzalife 🌴'}</p>
        </div>
    </Link>
  );
};

export default BlogCommunityCard;
