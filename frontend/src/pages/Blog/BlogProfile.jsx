import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BlogProfile = () => {
    const { user, logout } = useAuth();

    if (!user) return <Navigate to={"/auth/login"}/>;

    console.log(user)

  return (
    <div className="py-4 flex flex-col gap-4">
        <div className="border border-neutral-700 rounded-xl overflow-hidden">
            <img
                className="w-full h-56 sm:h-72 object-cover"
                src="https://mondoshop.com/cdn/shop/articles/silent_hill_banner.jpg?v=1589212688"
                alt="Banner" 
            />

            <div className="px-6 pb-6 space-y-4">
                <div className="flex justify-center sm:justify-between -mt-20">
                    <img
                        className="border-4 border-zinc-950 rounded-full size-32 sm:size-40 object-cover"
                        src={user.avatar}
                        alt={user.username}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="italic tracking-wide font-light">{user.first_name} {user.last_name}</h3>
                            <h2 className="text-2xl font-semibold tracking-widest">@{user.username}</h2>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                            <p className="text-neutral-400 whitespace-pre-line">{user.bio}</p>
                            <button className="shrink-0 border border-neutral-700 rounded-sm w-full sm:w-fit px-4 py-2 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer">Editar perfil</button>
                        </div>
                    </div>
                    
                    <p className="text-neutral-300"><span className="font-bold text-white">10</span> Posts</p>
                </div>
            </div>
        </div>

        <div className="border border-neutral-700 rounded-xl px-6 py-4">
            <div className="flex gap-4 border-b pb-2">
                <button className="font-semibold">Posts</button>
            </div>
        </div>

    </div>
  );
};

export default BlogProfile;
