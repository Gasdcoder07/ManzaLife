import { Link } from "react-router-dom";

const Reply = ({ AuthorUsername, AuthorAvatar, Content, CreatedDate }) => {
  return (
    <div className=" w-full">
        <div className="w-full flex gap-4">
            <img
                className="shrink-0 size-10 rounded-full object-cover"
                src={AuthorAvatar}
                alt={AuthorUsername} />

            <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div className="flex items-center gap-4">
                    <Link
                        to={`/blog/profile/${AuthorUsername}`}
                        className="truncate font-bold text-zinc-950 dark:text-white text-sm hover:text-orange-500 transition-all duration-200 ease-in-out cursor-pointer tracking-wider">
                        <span>
                            @{AuthorUsername}
                        </span>
                    </Link>
                    <span
                        className="shrink-0 text-zinc-950 dark:text-zinc-50 text-xs">
                        {new Date(CreatedDate).toLocaleDateString()}
                    </span>
                </div>

                <div className="w-full max-h-32 overflow-y-auto custom-scrollbar">
                    <p className="text-zinc-900 dark:text-zinc-100 text-sm leading-relaxed whitespace-pre-line wrap-break-word">
                        {Content}
                    </p>
                </div>

            </div>

        </div>
    </div>
  );
};

export default Reply;
