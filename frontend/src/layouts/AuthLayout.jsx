import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="relative text-white h-screen w-full bg-linear-to-br from-zinc-950 via-zinc-900 to-orange-950">

            <div className="size-52 bg-orange-500/30 absolute top-4 left-8 rounded-full blur-3xl animate-pulse duration-700 ease-in-out transition-all delay-150" />
            <div className="size-52 bg-amber-400/25 absolute bottom-4 left-8 rounded-full blur-3xl animate-pulse duration-700 ease-in-out transition-all delay-500" />
            <div className="size-52 bg-rose-500/20 absolute top-4 right-8 rounded-full blur-3xl animate-pulse duration-700 ease-in-out transition-all delay-300" />
            <div className="size-52 bg-orange-700/25 absolute bottom-4 right-8 rounded-full blur-3xl animate-pulse duration-700 ease-in-out transition-all delay-200" />

            <div className="w-full h-full flex justify-center items-center container mx-auto px-6 py-4 z-10 overflow-hidden">
                {
                    // Aquí se renderizarán los componentes de Login y Register dependiendo de la ruta
                    <Outlet />
                }
            </div>
        </div>
    );
};

export default AuthLayout;
